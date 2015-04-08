var THREE = require('THREE');

var LayoutGeometry = require('./LayoutGeometry');

function Layout(Canvas, LDoc){

  var lg = new LayoutGeometry(Canvas, LDoc);

  Canvas.add( 'boxes', lg.toCG(), {
    vertexColors: THREE.VertexColors
  });

}

module.exports = Layout;