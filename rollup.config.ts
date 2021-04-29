import dts from 'rollup-plugin-dts';
import typescript from '@rollup/plugin-typescript';
import esbuild from 'rollup-plugin-esbuild';

/**
 * Based on config at
 * https://gist.github.com/aleclarson/9900ed2a9a3119d865286b218e14d226
 * 
 * @todo research mjs format output (configured in the link above) - advantages, popularity, etc.
 */

export default [
  {
    input: 'src/index.ts',
    plugins: [esbuild({
      target: 'es6',
      minify: true,
      experimentalBundling: true
    })],
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: false,
    },
  },
  {
    input: 'src/index.ts',
    plugins: [typescript({ tsconfig: './tsconfig.build.json' })],
    output: {
      dir: '.temp',
      format: 'cjs'
    }
  },
  {
    input: '.temp/dts/index.d.ts',
    plugins: [dts()],
    output: {
      file: 'dist/index.d.ts',
      format: 'es',
    },
  },
];