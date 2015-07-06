(function(){

  module.exports = {
    uniforms: {
      t0: { type: 't', value: null },
      t1: { type: 't', value: null },
      uv0: { type: 'v2', value: null },
      uv1: { type: 'v2', value: null }
    },
    vertexShader: require('../copy/copy.vertex.glsl'),
    fragmentShader: require('./add-2d.fragment.glsl')
  };

})();