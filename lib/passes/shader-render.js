/**
 * @author Will Shown / http://willshown.com/
 * @author alteredq / http://alteredqualia.com/
 */

(function(){

  var THREE = require('three'),
      _ = require('lodash');

  function ShaderRenderPass( scene, camera, uniforms, textureID, overrideMaterial, clearColor, clearAlpha ) {
    if (!(this instanceof ShaderRenderPass)) return new ShaderRenderPass(scene, camera, overrideMaterial, clearColor, clearAlpha);

    this.scene = scene;
    this.camera = camera;

    this.overrideMaterial = overrideMaterial;

    this.textureID = _.isArray(textureID) ? textureID : ["tDiffuse"];

    this.uniforms = _.isArray(uniforms) ? uniforms : [uniforms];

    this.clearColor = clearColor;
    this.clearAlpha = ( clearAlpha !== undefined ) ? clearAlpha : 1;

    this.oldClearColor = new THREE.Color();
    this.oldClearAlpha = 1;

    this.enabled = true;
    this.clear = true;
    this.needsSwap = false;

  }

  ShaderRenderPass.prototype = {

    applyTexture: function(i, readBuffer){
      this.uniforms[i][this.textureID[i]          ].value = readBuffer;
      this.uniforms[i][this.textureID[i] + 'Size' ].value = new THREE.Vector2(readBuffer.width, readBuffer.height);
    },

    render: function ( renderer, writeBuffer, readBuffer, delta ) {
      var self = this;

      this.uniforms.forEach(function(u, i){
        self.applyTexture(i, readBuffer);
      });

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

  module.exports = ShaderRenderPass;

})();
