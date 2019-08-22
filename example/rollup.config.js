import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import typescript from 'rollup-plugin-typescript';
import postcss from 'rollup-plugin-postcss';

const env = process.env.NODE_ENV;

const config = {
  input: 'example/src/index.tsx',
  output: {
    file: 'example/dist/bundle.js',
    format: 'umd',
    sourcemap: true,
  },
  plugins: [
    postcss({
      plugins: []
    }),
    nodeResolve({
      jsnext: true
    }),
    typescript({
      typescript: require("typescript"),
      target: 'es5',
      jsx: "react",
      //noEmit: true,                        /* Do not emit outputs. */
      //importHelpers: true
    }),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    })
  ],
};

export default config;