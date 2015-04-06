var THREE = require('three');

var Canvas = require('./Canvas');

function Lumine ( options ){

  var self = this,
      o = options || {};

  this.Canvas = new Canvas(o.el || document.querySelector('canvas.lumine') || document.querySelector('canvas'));

  this.unpaused = true;

  var scene = new THREE.Scene();
  var camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0, 2 );

  var render = function(){
    self.Canvas.renderer.render(scene, camera);
    if(self.unpaused){
      requestAnimationFrame(function(){
        render.call(this, arguments);
      });
    }
  };

  render();

}

window.Lumine = Lumine;