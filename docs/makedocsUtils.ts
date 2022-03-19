import { ReflectionKind, ReflectionType } from 'typedoc';
import type { DeclarationReflection, SignatureReflection, Comment, Type } from 'typedoc';
import { pipe, map, tuple } from 'rhax';

// const logNoParent = (t) => {
//   const { parent, ...others } = t;
//   console.log(others);
// };

export interface RhaxExportVariant {
  signature: string;
  params: [name: string, description?: string][];
  comment?: string;
  example?: string;
}

export interface RhaxExport {
  name: string;
  source?: string;
  variants: RhaxExportVariant[];
}

export const parse = (ref: DeclarationReflection) => {
  switch (ref.kind) {
    case ReflectionKind.Function: return parseFunction(ref);
    case ReflectionKind.Namespace: return parseNamespace(ref);
    default: {
      console.error(ref.kindString);
    }
  }
};

const parseNamespace = (ref: DeclarationReflection): RhaxExport => {
  const nsName = ref.name;

  if (ref.children!.length !== 1) {
    console.error('none or more than 1 children!!!!!', ref.children);
  }

  const child = ref.children![0];
  const { name: childName } = child;
  const name = `${nsName}.${childName}`;

  const declaration = (child.type as ReflectionType).declaration;
  const { signatures } = declaration;

  const source = signatures?.[0]?.sources?.[0]?.fileName;
  if (source && !signatures?.every(s => s.sources![0].fileName === source)) {
    console.error('MULTIPLE SOURCES');
  }

  const variants = signatures!.map(sig => ({
    id: sig.id,
    signature: `${name}${parseSignatureString(sig)}`,
    comment: parseCommentString(sig.comment),
    params: parseSignatureParams(sig),
  }));

  return {
    name,
    source,
    variants
  };
};

const parseFunction = (ref: DeclarationReflection): RhaxExport => {
  const { signatures, name } = ref;

  const source = signatures?.[0]?.sources?.[0]?.fileName;
  if (source && !signatures?.every(s => s.sources![0].fileName === source)) {
    console.error('MULTIPLE SOURCES');
  }

  const variants = signatures!.map(sig => ({
    id: sig.id,
    signature: parseSignatureString(sig),
    comment: parseCommentString(sig.comment),
    params: parseSignatureParams(sig),
  }));

  return {
    name,
    source,
    variants
  };
};

/**
 * Parses the signature as a string, e.g.
 * `function map(arr: any[], mapper: Function): any[]`
 */
const parseSignatureString = (signature: SignatureReflection): string => {
  const { typeParameters, parameters, type } = signature;

  const name = signature.name !== '__type' ? signature.name : undefined;

  const generics = typeParameters &&
    pipe(typeParameters)
      (map(({ name, type }) => type ? `${name} extends ${parseTypeString(type)}` : name))
      (gens => `<${gens.join(', ')}>`)
      .go();

  const params = parameters &&
    pipe(parameters)
      (map(({ name, type }) => `${name}: ${type ? parseTypeString(type) : ''}`))
      (params => params.join(', '))
      .go();

  const returnType = type && ` => ${parseTypeString(type)}`;

  return `${name ?? ''}${generics ?? ''}(${params ?? ''})${returnType ?? ''}`;
};

const parseSignatureParams = (sig: SignatureReflection) => sig.parameters!.map((p) => tuple(p.name, parseCommentString(p.comment)));


const parseCommentString = (comment?: Comment) => comment && `${comment.shortText}\n\n${comment.text}`.trim();


/**
 * Parses the type as a string, e.g. `Record<string, number>`.
 */
const parseTypeString = (t: Type) => {
  switch (t.type) {
    case 'reflection': {
      const signatures = (t as ReflectionType).declaration.signatures!;
      if (signatures.length !== 1) {
        console.error('none or more than 1 signatures!!!!!', t.toString());
      }
      return parseSignatureString(signatures[0]);
    }
    case 'intrinsic': {
      return t.toString();
    }
    default: {
      return t.toString();
    }
  }
};