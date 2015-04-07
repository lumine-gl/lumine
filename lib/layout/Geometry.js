var THREE = require('THREE'),
    us = require('lodash');

function Geometry(Canvas, LDoc){

  this.geometry = new THREE.PlaneGeometry(Canvas.width - 20, Canvas.height - 20);
  this.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( Canvas.width / 2, Canvas.height / 2, 0 ) );

  this.geometry.computeFaceNormals();
  this.geometry.computeVertexNormals();

}

module.exports = Geometry;