module.exports = {
  entry: __dirname+'/app/app.tsx',
  output: {
    path: __dirname+'/dist',
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      { test: /\.(ts|tsx)$/, loader: 'awesome-typescript-loader' }
    ]
  }
};
