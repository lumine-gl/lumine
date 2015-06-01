(function(){

  module.exports = {
    'ClearMaskPass': require('./clear-mask'),
    'MaskPass': require('./mask'),
    'RenderPass': require('./render'),
    'ShaderPass': require('./shader'),
    'ShaderRenderPass': require('./shader-render')
  };

})();