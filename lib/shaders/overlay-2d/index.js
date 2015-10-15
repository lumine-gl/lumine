(function(){

  module.exports = {
    uniforms: {
      t0: { type: 't', value: null },
      t1: { type: 't', value: null },
      cUv0: { type: 'v2', value: null },
      cUv1: { type: 'v2', value: null },
      oUv0: { type: 'v2', value: null },
      oUv1: { type: 'v2', value: null }
    },
    vertexShader: require('../copy/copy.vertex.glsl'),
    fragmentShader: require('./overlay-2d.fragment.glsl')
  };

})();