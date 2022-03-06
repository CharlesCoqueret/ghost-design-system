import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

import packageJson from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ exclude: ['**/__tests__', '**/*.test.ts'], useTsconfigDeclarationDir: true }),
    copy({
      targets: [
        { src: 'src/assets/_*.scss', dest: 'dist/assets' },
        { src: ['src/assets/fonts/Montserrat-Regular.ttf'], dest: 'dist/assets/fonts' },
      ],
    }),
  ],
};
