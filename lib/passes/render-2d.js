/**
 * @author Will Shown / http://willshown.com/
 */

(function() {

  var THREE = require('three');

  var CopyShader = require('../shaders/copy');

  function Render2DPass( EffectComposer, map ) {
    if (!(this instanceof Render2DPass)) return new Render2DPass(EffectComposer, map);

    this.composer = EffectComposer;

    this.textureID = "tDiffuse";

    this.uniforms = THREE.UniformsUtils.clone( CopyShader.uniforms );

    this.uniforms['tDiffuse'].value = map;

    this.material = new THREE.ShaderMaterial({

      uniforms: this.uniforms,
      vertexShader: CopyShader.vertexShader,
      fragmentShader: CopyShader.fragmentShader

    });

    this.renderToScreen = false;
    this.enabled = true;
    this.needsSwap = true;
    this.clear = false;

  }

  Render2DPass.prototype = {

    render: function ( renderer, writeBuffer, readBuffer, delta ) {

      this.composer.quad.material = this.material;

      if ( this.renderToScreen ) {
        renderer.render( this.composer.scene, this.composer.camera );
      } else {
        renderer.render( this.composer.scene, this.composer.camera, writeBuffer, this.clear );
      }

    }

  };

  module.exports = Render2DPass;

})();