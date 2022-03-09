import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { writeFileSync } from 'fs';
import TypeDoc, { ReflectionKind } from 'typedoc';
import { pipe, map, pick } from '../dist/index.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootdir = resolve(__dirname, '..');
const entrypoint = join(rootdir, 'src', 'index.ts');
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
  /** @todo support for non-variable children */
  const parsedVariables = ns
    .getChildrenByKind(ReflectionKind.Variable)
    .flatMap(v => parseVariable(v, name));

  return;
};

/**
 * 
 * @param {TypeDoc.DeclarationReflection} v 
 * @param {string} [namespace]
 * @returns {string[]}
 */
const parseVariable = (v, namespace) => {
  const prefix = namespace && (namespace + '.');

  const types = parseVariantsByType(v.type);
  console.log(types);
  //logNoParent(v);

  return types.map(t => `${prefix}${v.name}${t.signature}`);
};

/**
 * 
 * @param {TypeDoc.Type} t
 */
const parseVariantsByType = (t) => {

  switch (t.type) {
    case 'array': {
      const elementVariants = parseVariantsByType(t.elementType);
      return elementVariants.map(v => ({ ...v, signature: `${v.signature}[]` }));
    }
    case 'reflection': {
      /** @type {TypeDoc.DeclarationReflection} */
      const declaration = t.declaration;
      return declaration.signatures.map(parseVariant);
    }
    case 'intrinsic': {
      return {
        name: t.name,
        signature: t.toString(),
      };
    }
    default: {
      console.log(t.type);
      return [t.toString()];
    }
  }
};

/**
 * 
 * @param {TypeDoc.SignatureReflection} signature
 */
const parseVariant = (signature) => {
  const { typeParameters, parameters, comment, sources } = signature;

  const name = signature.name !== '__type' ? signature.name : undefined;

  const generics = typeParameters &&
    pipe(typeParameters)
      (map(({ name, type }) => type ? `${name} extends ${parseVariantsByType(type)}` : name))
      (gens => `<${gens.join(', ')}>`)
      .go();

  const params = parameters &&
    pipe(parameters)
      (map(({ name, type }) => `${name}: ${type ? parseVariantsByType(type) : ''}`))
      (params => params.join(', '))
      .go();

  const type = signature.type && ` => ${parseVariantsByType(signature.type)}`;

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

  const signatures = fn.signatures.map(parseVariant);
  const source = signatures[0].source;
  if (!signatures.every(s => s.source === source)) {
    throw new Error('encountered a function with multiple sources');
  }

  const variants = signatures.map(pick('signature', 'comment'));

  return {
    name: fn.name,
    source,
    variants,
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

  const parsed = project.getChildrenByKind(ReflectionKind.Namespace).flatMap(c => {
    switch (c.kind) {
      case ReflectionKind.Namespace: return parseNamespace(c);
      case ReflectionKind.Function: return parseFunction(c);
      default: return [c.toString()];
    }
  });
  //.sort();

  console.log(parsed);

  //writeFileSync(outputPath, JSON.stringify(parsed, null, 2), { encoding: 'utf-8' });
}

main().catch(console.error);