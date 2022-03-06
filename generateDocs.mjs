import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { writeFileSync } from 'fs';
import TypeDoc, { ReflectionKind } from 'typedoc';
import { pipe, map, pick } from './dist/index.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const entrypoint = join(__dirname, 'src', 'index.ts');
const outputPath = join(__dirname, 'rhax.api.json');

const logNoParent = (t) => {
  const { parent, ...others } = t;
  console.log(others);
};

/**
 * 
 * @param {TypeDoc.DeclarationReflection} ns
 */
const parseNamespace = (ns) => {
  const name = ns.name;
  return ns.getChildrenByKind(ReflectionKind.Variable).flatMap(v => parseVariable(v, name));
};

/**
 * 
 * @param {TypeDoc.DeclarationReflection} v 
 * @param {string} [namespace]
 * @returns {string[]}
 */
const parseVariable = (v, namespace) => {
  const prefix = namespace && (namespace + '.');

  const types = parseType(v.type);

  return types.map(t => `${prefix}${v.name}${t}`);
};

/**
 * 
 * @param {TypeDoc.Type} t
 */
const parseType = (t) => {

  switch (t.type) {
    case 'array': {
      return [`${parseType(t.elementType)}[]`];
    }
    case 'reflection': {
      /** @type {TypeDoc.DeclarationReflection} */
      const declaration = t.declaration;
      return declaration.signatures.map(sig => parseSignature(sig).signature);
    }
    default: return [t.toString()];
  }
};

/**
 * 
 * @param {TypeDoc.SignatureReflection} signature
 */
const parseSignature = (signature) => {
  const { typeParameters, parameters, comment, sources } = signature;

  const name = signature.name !== '__type' ? signature.name : undefined;

  const generics = typeParameters &&
    pipe(typeParameters)
      (map(({ name, type }) => type ? `${name} extends ${parseType(type)}` : name))
      (gens => `<${gens.join(', ')}>`)
      .go();

  const params = parameters &&
    pipe(parameters)
      (map(({ name, type }) => `${name}: ${type ? parseType(type) : ''}`))
      (params => params.join(', '))
      .go();

  const type = signature.type && ` => ${parseType(signature.type)}`;

  const signatureString = `${name ?? ''}${generics ?? ''}(${params ?? ''})${type ?? ''}`;

  const source = sources?.[0]?.fileName;

  const commentString = comment ? `${comment.shortText}\n\n${comment.text}`.trim() : undefined;

  return {
    signature: signatureString,
    comment: commentString,
    source
  };
};

/**
 * 
 * @param {TypeDoc.DeclarationReflection} fn 
 */
const parseFunction = (fn) => {

  const signatures = fn.signatures.map(parseSignature);
  const source = signatures[0].source;
  if (!signatures.every(s => s.source === source)) {
    throw new Error('encountered a function with multiple sources');
  }

  const variants = signatures.map(pick('signature', 'comment'));

  return {
    name: fn.name,
    variants,
    source
  };
};

async function main() {
  const app = new TypeDoc.Application();

  // If you want TypeDoc to load tsconfig.json / typedoc.json files
  app.options.addReader(new TypeDoc.TSConfigReader());
  app.options.addReader(new TypeDoc.TypeDocReader());

  app.bootstrap({
    // typedoc options here
    entryPoints: [entrypoint],
  });

  const project = app.convert();

  const parsed = project.children.flatMap(c => {
    switch (c.kind) {
      case ReflectionKind.Namespace: return parseNamespace(c);
      case ReflectionKind.Function: return parseFunction(c);
      default: return [c.toString()];
    }
  }).filter(c => typeof c === 'object')
    .sort();

  writeFileSync(outputPath, JSON.stringify(parsed, null, 2), { encoding: 'utf-8' });
}

main().catch(console.error);