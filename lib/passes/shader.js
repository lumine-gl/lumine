/**
 * @author alteredq / http://alteredqualia.com/
 */

(function() {

  var THREE = require('three');

  function ShaderPass( EffectComposer, shader, textureID ) {
    if (!(this instanceof ShaderPass)) return new ShaderPass(EffectComposer, shader, textureID);

    this.composer = EffectComposer;

    this.textureID = ( textureID !== undefined ) ? textureID : "tDiffuse";

    this.uniforms = THREE.UniformsUtils.clone( shader.uniforms );

    this.material = new THREE.ShaderMaterial( {

      uniforms: this.uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader

    } );

    this.renderToScreen = false;
    this.enabled = true;
    this.needsSwap = true;
    this.clear = false;

  }

  ShaderPass.prototype = {

    render: function ( renderer, writeBuffer, readBuffer, delta ) {

      if ( this.uniforms[ this.textureID ] ) {
        this.uniforms[ this.textureID ].value = readBuffer;
      }

      this.composer.quad.material = this.material;

      if ( this.renderToScreen ) {
        renderer.render( this.composer.scene, this.composer.camera );
      } else {
        renderer.render( this.composer.scene, this.composer.camera, writeBuffer, this.clear );
      }

    }

  };

  module.exports = ShaderPass;

})();