import { ROLLUP_COMMON_CONFIG, OUTPUT_FOLDER, OUPUT_JS_PATH, OUPUT_CSS_PATH, BANNER_COMMENTS } from './rollup.config.common';

import scss from 'rollup-plugin-scss';
import postcss from 'postcss';
import postcssPresetEnv from 'postcss-preset-env';
import browsersync from 'rollup-plugin-browsersync';

const BANNER = `/* [DEVELOPMENT] ${BANNER_COMMENTS} */`;

const IS_SERVE = process.env.SERVE;
const COMMON_CONFIG = { ...ROLLUP_COMMON_CONFIG };

const config = {
  input: COMMON_CONFIG.input,
  output: {
    file: OUPUT_JS_PATH,
    format: 'es',
    sourcemap: true,
    exports: 'named',
    banner: BANNER
  },
  plugins: [
    ...COMMON_CONFIG.plugins,
    scss({
      output: OUPUT_CSS_PATH,
      sourceMap: true,
      processor: () => postcss([postcssPresetEnv()]),
    }),
    IS_SERVE && browsersync({ server: OUTPUT_FOLDER }),
  ]
};

export default config;
