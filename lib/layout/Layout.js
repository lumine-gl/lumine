var THREE = require('THREE');

var Geometry = require('./Geometry');

function Layout(Canvas, LDoc){

  this.material = new THREE.MeshBasicMaterial({
    color: 0x000000,
    side: THREE.DoubleSide
  });

  this.geometry = new Geometry(Canvas, LDoc);

  Canvas.add( this.geometry.geometry, this.material );

}

module.exports = Layout;