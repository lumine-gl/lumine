var Canvas = require('./render/Canvas');

function Lumine ( options ){

  var o = options || {};

  this.Canvas = new Canvas(o.el || document.querySelector('canvas.lumine') || document.querySelector('canvas'));

}

window.Lumine = Lumine;