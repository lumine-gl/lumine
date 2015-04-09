var THREE = require('three');

var LayoutGeometry = require('./LayoutGeometry');

function Layout(Canvas, LDoc){

  var lg = new LayoutGeometry(LDoc);

  Canvas.add( 'modules', lg.toCG(Canvas), {
    vertexColors: THREE.VertexColors
  });

  Canvas.on('resize', function(Canvas, e){
    lg.toCG(Canvas, Canvas.meshes['modules'].geometry);
  });

}

module.exports = Layout;