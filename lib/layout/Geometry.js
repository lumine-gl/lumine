var THREE = require('THREE'),
    us = require('lodash');

function Geometry(Canvas, LDoc){

  this.geometry = new THREE.Geometry();

  this.geometry.vertices.push(
    new THREE.Vector3(10, 10, 0),
    new THREE.Vector3(Canvas.width - 10, 10, 0),
    new THREE.Vector3(Canvas.width - 10, Canvas.height - 10, 0),
    new THREE.Vector3(10, Canvas.height - 10, 0)
  );
  
  this.geometry.faces.push(
    new THREE.Face3(0, 1, 2),
    new THREE.Face3(2, 3, 0)
  );

  this.geometry.computeFaceNormals();
  this.geometry.computeVertexNormals();

}

module.exports = Geometry;