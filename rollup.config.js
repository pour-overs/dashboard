import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';
import alias from '@rollup/plugin-alias';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) =>
  (warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)) ||
  (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) ||
  onwarn(warning);


// the locations we can import from
const entries = [
  { find: "@routes", replacement: `${__dirname}/src/routes`},
  { find: "@components", replacement: `${__dirname}/src/components`},
  { find: "@icons", replacement: `${__dirname}/src/icons`},
  { find: "@services", replacement: `${__dirname}/src/services`},
  { find: "@stores", replacement: `${__dirname}/src/stores`},
  { find: "@providers", replacement: `${__dirname}/src/providers`},
  { find: "@utils", replacement: `${__dirname}/src/utils.js`},
  { find: "@config", replacement: `${__dirname}/src/config`},
  { find: "@css", replacement: `${__dirname}/src/css`},
];


export default {
  client: {
    input: config.client.input(),
    output: config.client.output(),
    plugins: [
      alias({ entries, }),
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode)
      }),
      svelte({
        compilerOptions: {
          dev,
          hydratable: true,
        }
      }),
      resolve({
        browser: true,
        dedupe: ['svelte']
      }),
      commonjs(),

      legacy && babel({
        extensions: ['.js', '.mjs', '.html', '.svelte'],
        runtimeHelpers: true,
        exclude: ['node_modules/@babel/**'],
        presets: [
          ['@babel/preset-env', {
            targets: '> 0.25%, not dead'
          }]
        ],
        plugins: [
          "@babel/plugin-syntax-import-meta",
          '@babel/plugin-syntax-dynamic-import',
          ['@babel/plugin-transform-runtime', {
            useESModules: true
          }]
        ]
      }),

      !dev && terser({
        module: true
      })
    ],

    preserveEntrySignatures: false,

    onwarn,
  },

  server: {
    input: config.server.input(),
    output: config.server.output(),
    plugins: [
      alias({ entries, }),
      replace({
        'process.browser': false,
        'process.env.NODE_ENV': JSON.stringify(mode)
      }),
      svelte({
        compilerOptions: {
          dev,
          generate: 'ssr',
          hydratable: true
        },
        emitCss: false
      }),
      resolve({
        dedupe: ['svelte']
      }),
      commonjs()
    ],
    external: Object.keys(pkg.dependencies).concat(
      require('module').builtinModules || Object.keys(process.binding('natives'))
    ),
    preserveEntrySignatures: 'strict',

    onwarn,
  },

  serviceworker: {
    input: config.serviceworker.input(),
    output: config.serviceworker.output(),
    plugins: [
      resolve(),
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode)
      }),
      commonjs(),
      !dev && terser()
    ],

    preserveEntrySignatures: false,

    onwarn,
  }
};
