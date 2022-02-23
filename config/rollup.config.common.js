import { resolve } from 'path';
import typescriptEngine from 'typescript';
import typescript from 'rollup-plugin-typescript2';

import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import replace from '@rollup/plugin-replace';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';

import external from 'rollup-plugin-peer-deps-external';
import del from 'rollup-plugin-delete';
import copy from 'rollup-plugin-copy';

import pkg from '../package.json';

export const OUTPUT_FOLDER = 'dist';
export const MODULE_NAME = 'app';
export const EXTENSIONS = ['.js', '.ts', '.jsx', '.tsx', '.json', '.scss'];
export const INPUT_JS_PATH = resolve(__dirname, '../src/index.ts');
export const OUPUT_JS_PATH = resolve(__dirname, `../dist/js/${MODULE_NAME}.js`);
export const OUPUT_CSS_PATH = resolve(__dirname, `../dist/css/${MODULE_NAME}.css`);
export const BANNER_COMMENTS = `${pkg.name} v${pkg.version} (c) ${pkg.author} - ${pkg.license}`;

const IS_SERVE = process.env.SERVE;

export const ROLLUP_COMMON_CONFIG = {
  input: INPUT_JS_PATH,
  plugins: [
    !IS_SERVE && del({ targets: `${OUTPUT_FOLDER}/*` }),
    alias({
      entries: {
        '@': resolve(__dirname, '../src')
      },
      resolve: EXTENSIONS,
    }),
    external({
      includeDependencies: true,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV === 'production' ? 'production' : 'development'),
    }),
    url(),
    svgr(),
    commonjs({
      include: 'node_modules/**',
    }),
    nodeResolve({
      browser: true,
      extensions: EXTENSIONS,
    }),
    typescript({
      typescript: typescriptEngine,
      rollupCommonJSResolveHack: true,
      clean: true,
      include: ['./src/**/*.ts+(|x)'],
      exclude: [OUTPUT_FOLDER, 'coverage', 'config', 'node_modules/**', '*.test.{js+(|x), ts+(|x)}', '**/*.test.{js+(|x), ts+(|x)}'],
    }),
    copy({
      targets: [
        { src: 'public/index.html', dest: `${OUTPUT_FOLDER}` },
        { src: 'src/assets/fonts/**/*', dest: `${OUTPUT_FOLDER}/fonts` },
        { src: 'src/assets/images/**/*', dest: `${OUTPUT_FOLDER}/images` }
      ]
    })
  ],
};