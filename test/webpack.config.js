var webpack = require('webpack');

module.exports = {
  module: {
    loaders: [
      { test: /\.glsl$/,  loader: "shader-loader" }
    ]
  },
  glsl: {
    chunkPath: ""
  }
};