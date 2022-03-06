import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'rollup';
import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';
import { terser } from 'rollup-plugin-terser';
import del from 'rollup-plugin-delete';
import eslint from '@rollup/plugin-eslint';

const __dirname = dirname(fileURLToPath(import.meta.url));

const src = join(__dirname, 'src');
const dist = join(__dirname, 'dist');
const temp = join(__dirname, '.temp');

export default defineConfig([
  {
    input: join(src, 'index.ts'),
    plugins: [
      eslint(),
      del({ targets: dist }),
      typescript({
        useTsconfigDeclarationDir: true,
        tsconfig: './tsconfig.build.json'
      }),
      terser()
    ],
    output: [{
      file: join(dist, 'index.js'),
      format: 'umd',
      name: 'rhax',
    }, {
      file: join(dist, 'index.mjs'),
      format: 'es',
    }]
  },
  {
    input: join(temp, 'index.d.ts'),
    output: {
      file: join(dist, 'index.d.ts')
    },
    plugins: [
      dts(),
    ]
  }
]);