module.exports = {
  entry: __dirname+'/app/app.tsx',
  output: {
    path: __dirname+'/dist',
    filename: 'app.bundle.js'
  },
  devtool: "source-map", // Enable sourcemaps for debugging webpack's output.
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      { test: /\.(ts|tsx)$/, loader: 'awesome-typescript-loader' },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  }
};
