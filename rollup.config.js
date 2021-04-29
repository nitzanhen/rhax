import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

import pkg from './package.json';

/**
 * Based on config at
 * https://gist.github.com/aleclarson/9900ed2a9a3119d865286b218e14d226
 * 
 * @todo research mjs format output (configured in the link above) - advantages, popularity, etc.
 */

const name = pkg.main.replace(/\.js$/, '');

const bundle = config => ({
  ...config,
  input: 'src/index.ts',
  //external: id => !/^[./]/.test(id),
});

export default [
  bundle({
    plugins: [esbuild({
      target: 'es6',
      minify: true,
      experimentalBundling: true
    })],
    output: {
      file: `${name}.js`,
      format: 'cjs',
      sourcemap: false,
    },
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: `${name}.d.ts`,
      format: 'es',
    },
  }),
];