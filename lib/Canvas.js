var THREE = require('three');

function Canvas(el){

  // bind to and prepare DOM element

  this.el = el;
  this.el.classList.add('lumine');

  this.renderer = new THREE.WebGLRenderer({
    canvas: this.el,
    antialias: true
  });

  this.renderer.setPixelRatio(window.devicePixelRatio);
  this.renderer.setSize(window.innerWidth, window.innerHeight);
  this.renderer.setClearColor(0xffffff, 0);

  this.el.style.width = '100%';
  this.el.style.height = '100%';
  this.el.style.position = 'fixed';
  this.el.style.top = '0';
  this.el.style.left = '0';

}

module.exports = Canvas;