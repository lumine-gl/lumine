/**
 * @author alteredq / http://alteredqualia.com/
 */

(function(){

  var THREE = require('three');

  function RenderPass( scene, camera, overrideMaterial, clearColor, clearAlpha ) {
    if (!(this instanceof RenderPass)) return new RenderPass(scene, camera, overrideMaterial, clearColor, clearAlpha);

    this.scene = scene;
    this.camera = camera;

    this.overrideMaterial = overrideMaterial;

    this.clearColor = clearColor;
    this.clearAlpha = ( clearAlpha !== undefined ) ? clearAlpha : 1;

    this.oldClearColor = new THREE.Color();
    this.oldClearAlpha = 1;

    this.enabled = true;
    this.clear = true;
    this.needsSwap = false;

  }

  RenderPass.prototype = {

    render: function ( renderer, writeBuffer, readBuffer, delta ) {

      this.scene.overrideMaterial = this.overrideMaterial;

      if ( this.clearColor ) {

        this.oldClearColor.copy( renderer.getClearColor() );
        this.oldClearAlpha = renderer.getClearAlpha();

        renderer.setClearColor( this.clearColor, this.clearAlpha );

      }

      if ( this.renderToScreen ) {
        renderer.render( this.scene, this.camera );
      } else {
        renderer.render( this.scene, this.camera, writeBuffer, this.clear );
      }

      if ( this.clearColor ) {

        renderer.setClearColor( this.oldClearColor, this.oldClearAlpha );

      }

      this.scene.overrideMaterial = null;

    }

  };

  module.exports = RenderPass;

})();
