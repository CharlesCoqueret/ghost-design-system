import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import scss from 'rollup-plugin-scss';

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
  onwarn: (warning) => {
    throw new Error(warning.message);
  },
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    scss({ output: false }),
    typescript({ exclude: ['**/__tests__', '**/*.test.ts'], useTsconfigDeclarationDir: true }),
    copy({
      targets: [
        { src: 'src/assets/_*.scss', dest: 'dist/assets' },
        { src: ['src/assets/fonts/Montserrat-Regular.ttf'], dest: 'dist/assets/fonts' },
        { src: 'package.json', dest: 'dist/' },
        { src: 'LICENSE', dest: 'dist/' },
      ],
    }),
  ],
};
