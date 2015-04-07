var THREE = require('THREE');

var Geometry = require('./Geometry');

function Layout(Canvas, LDoc){

  this.geometry = new Geometry(Canvas, LDoc);

  Canvas.add( 'plane', this.geometry.geometry, {
    color: 0x252321
  });

}

module.exports = Layout;