import path from 'path'
import webpack from 'webpack'

export default {
  entry: {
    react: [
      'es6-promise',
      'isomorphic-fetch',
      'react',
      'react-dom',
      'react-router',
    ],
  },

  output: {
    filename: 'vendor-[name].js',
    path: path.join(process.cwd(), 'static', 'build'),
    library: '[name]_lib',
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(process.cwd(), 'static', 'build', '[name]-manifest.json'),
      name: '[name]_lib',
    }),
  ],
}
