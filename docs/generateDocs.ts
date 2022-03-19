import { writeFile } from 'fs/promises';
import { resolve, join } from 'path';
import * as TypeDoc from 'typedoc';
import { generateMarkdown } from './generateMarkdown';
import { parse, RhaxExport } from './makedocsUtils';

const rootdir = resolve(__dirname, '..');
const entrypoint = join(rootdir, 'src', 'index.ts');
const jsonOutputPath = join(__dirname, 'rhax.api.json');
const mdOutputPath = join(__dirname, 'rhax.api.md');

async function main() {
  const app = new TypeDoc.Application();

  // If you want TypeDoc to load tsconfig.json / typedoc.json files
  app.options.addReader(new TypeDoc.TypeDocReader());
  app.options.addReader(new TypeDoc.TSConfigReader());

  app.bootstrap({
    // typedoc options here
    entryPoints: [entrypoint],
  });


  const project = app.convert();

  const parsed = project!.children!
    .map(parse)
    .filter(Boolean) as RhaxExport[];

  writeFile(jsonOutputPath, JSON.stringify(parsed, null, 2), { encoding: 'utf-8' });
  writeFile(mdOutputPath, generateMarkdown(parsed), { encoding: 'utf-8' });

  //console.log(inspect(parsed, false, 12, true));
}

main().catch(console.error);

