module.exports = {
  entry: {
      //vendor: './src/vendor.ts',
      app: "./src/main.ts"      
  },
  output: {
      filename: "app/bundle.js"
  },
  devtool: 'source-map',
  resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.ts',  '.js']
  },
  module: {
      loaders: [
        { test: /\.ts$/, loader: 'ts-loader' }
      ]
  }
};