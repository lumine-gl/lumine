(function(){

  module.exports = {
    uniforms: {
      "tDiffuse": { type: "t", value: null },
      "opacity":  { type: "f", value: 1.0 }
    },
    vertexShader: require('./copy.vertex.glsl'),
    fragmentShader: require('./copy.fragment.glsl')
  };


})();