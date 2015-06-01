/**
 * @author alteredq / http://alteredqualia.com/
 */

(function() {

  function ClearMaskPass() {
    if (!(this instanceof ClearMaskPass)) return new ClearMaskPass();
    this.enabled = true;
  }

  ClearMaskPass.prototype = {
    render: function ( renderer, writeBuffer, readBuffer, delta ) {
      var context = renderer.context;
      context.disable( context.STENCIL_TEST );
    }
  };

  module.exports = ClearMaskPass;

})();