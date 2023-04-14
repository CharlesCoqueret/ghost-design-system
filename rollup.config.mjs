import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

import packageJson from './package.json' assert { type: 'json' };

export default {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.module,
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: packageJson.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      plugins: [terser()],
    },
  ],
  onwarn: (warning) => {
    if (warning.code === 'CIRCULAR_DEPENDENCY') {
      console.error(warning.message);
      return;
    }
    throw new Error(warning);
  },
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    postcss({
      extract: false,
      autoModules: true,
      use: ['sass'],
    }),
    typescript({ exclude: ['**/__mocks__/**', '**/__tests__/**', '**/Fake*'] }),
  ],
};
