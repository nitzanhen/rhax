import { map, pipe } from '../dist';
import type { RhaxExport, RhaxExportVariant } from './makedocsUtils';

const srcUrl = 'https://github.com/NitzanHen/rhax/tree/main/src';

export const generateMarkdown = (parsed: RhaxExport[]) => parsed.map(generateExportBlock).join('\n\n\n');

const generateExportBlock = ({ name, variants, source }: RhaxExport) => {
  const header = `## ${name}`;
  const sourceBlock = source && `> source: [${source}](${srcUrl}/${source})`;

  const variantsBlock = variants.map(generateVariantBlock).join('\n<br/><br/>\n');

  return `${header}\n${sourceBlock}\n\n${variantsBlock}`;
};

const generateVariantBlock = ({ signature, params, comment, example }: RhaxExportVariant) => {
  const signatureBlock = `\`\`\`ts\nfunction ${signature}\n\`\`\``;

  const documentedParams = params
    .filter(([, desc]) => !!desc)
    .map(([name, desc]) => [`\`${name}\``, desc]);
  const paramsBlock = documentedParams.length ? generateTable(['Param', 'Description'], documentedParams as string[][]) : null;

  const exampleBlock = example && `\`\`\`ts\n${example}\n\`\`\``;

  return [
    signatureBlock,
    comment,
    paramsBlock,
    exampleBlock
  ]
    .filter(Boolean)
    .join('\n\n');
};

const generateTable = (headers: [...string[]], cells: string[][]) => pipe()
  (() => [
    headers,
    ['---', '---'],
    ...cells
  ])
  (map(row => `| ${row.join(' | ')} |`))
  (rows => rows.join('\n'))
  .go();