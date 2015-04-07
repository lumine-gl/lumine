var THREE = require('three');

var Canvas = require('./render/Canvas');
var Layout = require('./layout/Layout');

function Lumine ( options ){

  var self = this,
      o = options || {};

  this.Canvas = new Canvas(o.el || document.querySelector('canvas.lumine') || document.querySelector('canvas'));

  this.unpaused = true;

  var render = function(){
    self.Canvas.render();
    if(self.unpaused){
      requestAnimationFrame(function(){
        render.call(this, arguments);
      });
    }
  };

  render();

}

Lumine.prototype.layout = function(LDoc){

  this.layout = new Layout(this.Canvas, LDoc);

};

window.Lumine = Lumine;