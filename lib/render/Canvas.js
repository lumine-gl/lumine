var us = require('lodash'),
    THREE = require('three');

function Canvas(el){

  var self = this;

  // bind to and prepare DOM element

  this.el = el;
  this.el.classList.add('lumine');

  this.renderer = new THREE.WebGLRenderer({
    canvas: this.el,
    antialias: true
  });

  this.size = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  this.renderer.setPixelRatio(window.devicePixelRatio);
  this.renderer.setSize(this.size.width, this.size.height);
  this.renderer.setClearColor(0xffffff, 0);

  this.el.style.width = '100%';
  this.el.style.height = '100%';
  this.el.style.position = 'fixed';
  this.el.style.top = '0';
  this.el.style.left = '0';

  var getDimension = function(dimension){
    return function(){
      return self.size[dimension];
    }
  };

  var setDimension = function(dimension){
    return function(value){
      self.size[dimension] = value;
      self.renderer.setSize(self.size.width, self.size.height);
      // TODO: update camera?
    };
  };

  Object.defineProperty(this, 'width', {
    get: getDimension('width'),
    set: setDimension('width')
  });

  Object.defineProperty(this, 'height', {
    get: getDimension('height'),
    set: setDimension('height')
  });

  // prepare scene and camera

  this.scene = new THREE.Scene();

  this.camera = new THREE.OrthographicCamera(0, this.size.width, this.size.height, 0, 0, 1010);
  this.camera.aspect = (this.size.width / this.size.height);
  this.camera.updateProjectionMatrix();

  this.camera.position.z = 10;
  this.camera.lookAt(new THREE.Vector3(0, 0, 0));

  this.scene.add( new THREE.AmbientLight( 0x000000 ) );

  this.meshes = {};
  this.meshcbs = {};

  this.add = function(name, geometry, materialOptions, rcb){

    var material = new THREE.MeshBasicMaterial(materialOptions);

    self.meshes[name] = new THREE.Mesh(geometry, material);

    if(rcb){
      self.meshcbs[name] = rcb;
    }

    self.scene.add.call(self.scene, self.meshes[name]);
  }

}

Canvas.prototype.render = function(){
  var self = this,
      now = performance.now();

  us.each(this.meshcbs, function(cb, name){
    cb.call(self.meshes[name], self.meshes[name], now, self);
  });

  this.renderer.render(this.scene, this.camera);
};

module.exports = Canvas;