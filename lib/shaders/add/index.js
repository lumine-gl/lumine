(function(){

  module.exports = {
    uniforms: {
      t0: { type: 't', value: null },
      t1: { type: 't', value: null }
    },
    vertexShader: require('../copy/copy.vertex.glsl'),
    fragmentShader: require('./add.fragment.glsl')
  };

})();