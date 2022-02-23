import { ROLLUP_COMMON_CONFIG, OUPUT_JS_PATH, OUPUT_CSS_PATH, BANNER_COMMENTS } from './rollup.config.common';

import { terser } from 'rollup-plugin-terser';
import scss from 'rollup-plugin-scss';
import postcss from 'postcss';
import postcssPresetEnv from 'postcss-preset-env';

const BANNER = `/* [PRODUCTION] ${BANNER_COMMENTS} */`;

const COMMON_CONFIG = { ...ROLLUP_COMMON_CONFIG };

const config = {
  input: COMMON_CONFIG.input,
  output: {
    file: OUPUT_JS_PATH,
    format: 'es',
    sourcemap: false,
    exports: 'named',
    banner: BANNER
  },
  plugins: [
    ...COMMON_CONFIG.plugins,
    scss({
      output: OUPUT_CSS_PATH,
      sourceMap: false,
      outputStyle: 'compressed',
      processor: () => postcss([postcssPresetEnv()]),
    }),
    terser({
      compress: true
    })
  ]
};

export default config;
