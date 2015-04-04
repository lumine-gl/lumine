function Canvas(el){

  // bind to and prepare DOM element

  this.el = el;
  this.el.classList.add('lumine');

  // query pixel density

  this.density = window.devicePixelRatio;

  // getting WebGL context

  this.gl = el.getContext("webgl") || el.getContext("experimental-webgl");
  this.gl.viewport(0, 0, this.el.width * this.density, this.el.height * this.density);

}

module.exports = Canvas;