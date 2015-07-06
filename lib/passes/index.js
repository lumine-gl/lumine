(function(){

  module.exports = {
    'ClearMaskPass': require('./clear-mask'),
    'MaskPass': require('./mask'),
    'RenderPass': require('./render'),
    'Render2DPass': require('./render-2d'),
    'ShaderPass': require('./shader'),
    'ShaderRenderPass': require('./shader-render')
  };

})();