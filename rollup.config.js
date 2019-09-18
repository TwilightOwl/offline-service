import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import typescript from 'rollup-plugin-typescript';
import postcss from 'rollup-plugin-postcss';

const env = process.env.NODE_ENV;

const config = {
  input: 'src/index.ts',
  output: {
    file: 'dist/offline-service.js',
    format: 'esm',
    sourcemap: true,
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    },
  },
  external: ['react', 'react-dom', 'asynchronous-tools'], 
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
      strict: true
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