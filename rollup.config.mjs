import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js', // package.json > module: 'dist/index.js'
      format: 'esm',
      exports: 'named',
      sourcemap: true,
    },
  ],
  onwarn: (warning) => {
    if (warning.code === 'CIRCULAR_DEPENDENCY') {
      console.error(warning.message);
      return;
    }
    throw new Error(warning.message);
  },
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    postcss({
      extract: false,
      modules: true,
      use: ['sass'],
    }),
    typescript({ exclude: ['**/__tests__', '**/*.test.ts'], sourceMap: true }),
    copy({
      targets: [{ src: ['src/assets/fonts/Montserrat-Regular.ttf'], dest: 'dist/fonts' }],
    }),
  ],
};
