/**
 * Based upon the EffectComposer object written by alteredq (http://alteredqualia.com/)
 */

(function(){

  var THREE = require('three'),
      _ = require('lodash');

  var CopyShader = require('./shaders/copy'),
      ShaderPass = require('./passes/shader'),
      MaskPass = require('./passes/mask'),
      ClearMaskPass = require('./passes/clear-mask');

  function EffectComposer( renderer, targetOptions ) {

    this.renderer = renderer;

    var opts = targetOptions || {};

    var renderTarget = new THREE.WebGLRenderTarget(
      (opts.width * (opts.density || 1) || renderer.domElement.width),
      (opts.height * (opts.density || 1) || renderer.domElement.height),
      _.extend({
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBFormat,
        stencilBuffer: false
      }, opts)
    );

    this.renderTarget1 = renderTarget;
    this.renderTarget2 = renderTarget.clone();

    this.writeBuffer = this.renderTarget1;
    this.readBuffer = this.renderTarget2;

    this.passes = [];

    this.copyPass = new ShaderPass( this, CopyShader );

    // shared constructions

    this.camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0, 1 );
    this.quad = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), null );
    this.scene = new THREE.Scene();
    this.scene.add( this.quad );

  }

  EffectComposer.prototype = {
    swapBuffers: function() {

      var tmp = this.readBuffer;
      this.readBuffer = this.writeBuffer;
      this.writeBuffer = tmp;

    },

    addPass: function ( pass ) {

      this.passes.push( pass );

    },

    insertPass: function ( pass, index ) {

      this.passes.splice( index, 0, pass );

    },

    render: function ( delta ) {

      this.writeBuffer = this.renderTarget1;
      this.readBuffer = this.renderTarget2;

      var maskActive = false;

      var pass, i, il = this.passes.length;

      for ( i = 0; i < il; i ++ ) {

        pass = this.passes[ i ];

        if ( !pass.enabled ) continue;

        this.renderPass(pass, delta, maskActive);

        if ( pass instanceof MaskPass ) {

          maskActive = true;

        } else if ( pass instanceof ClearMaskPass ) {

          maskActive = false;

        }

      }

    },

    renderPass: function(pass, delta, maskActive){

      pass.render( this.renderer, this.writeBuffer, this.readBuffer, delta, maskActive );

      if ( pass.needsSwap ) {

        if ( maskActive ) {

          var context = this.renderer.context;

          context.stencilFunc( context.NOTEQUAL, 1, 0xffffffff );

          this.copyPass.render( this.renderer, this.writeBuffer, this.readBuffer, delta );

          context.stencilFunc( context.EQUAL, 1, 0xffffffff );

        }

        this.swapBuffers();

      }

    },

    reset: function ( renderTarget ) {

      this.renderTarget1 = renderTarget;
      this.renderTarget2 = renderTarget.clone();

      this.writeBuffer = this.renderTarget1;
      this.readBuffer = this.renderTarget2;

    },

    setSize: function ( width, height ) {

      var renderTarget = this.renderTarget1.clone();

      renderTarget.width = width;
      renderTarget.height = height;

      this.reset( renderTarget );

    }

  };

  module.exports = EffectComposer;

})();