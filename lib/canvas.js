(function(){

  var FRAME_DURATION = 1e3/60,
      SUSPEND_THRESHOLD = FRAME_DURATION * 30;

  var _ = require('lodash'),
      THREE = require('three'),
      Stats = require('stats.js'),
      EE = require('events').EventEmitter,
      Composer = require('./composer'),
      inherits = require('util').inherits,
      now = require('./common/now');

  function Canvas(el, Scene, Layers){
    var self = this;

    this.playing = false;

    this.cTime = null;
    this.pTime = null;
    this.sTime = null;

    // prepare a stat watcher

    this.stats = new Stats();
    this.stats.setMode(0);

    this.stats.domElement.classList.add('lumine-stats');

    document.body.appendChild(this.stats.domElement);

    // bind to and prepare DOM element

    this.el = el;
    this.el.classList.add('lumine');

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.el,
      antialias: true
    });

    this.renderer.setClearColor(0xffffff, 0);

    this.composer = new Composer(this.renderer);

    this.querySize();

    _.each(Scene.layers, function(layer, i){

      var layerPass = Layers[layer.type](Scene, self, layer);

      if(i === Scene.layers.length - 1){
        layerPass.renderToScreen = true;
      }else{
        layerPass.needsSwap = true;
      }

      self.composer.addPass( layerPass );

    });

    EE.call(this);

    window.addEventListener('resize', function(){
      self.needsResize = true;
    });

  }

  inherits(Canvas, EE);

  Canvas.prototype.querySize = function(){
    var box = this.el.getBoundingClientRect(),
        density = window.devicePixelRatio;

    this.size = {
      width: parseFloat(box.width),
      height: parseFloat(box.height)
    };

    this.density = density;

    this.renderer.setPixelRatio(density);
    this.renderer.setSize(this.size.width, this.size.height);

    this.composer.setSize(this.size.width * density, this.size.height * density);
  };

  Canvas.prototype.render = function(){
    var self = this;

    this.stats.begin();

    if(this.needsResize){
      this.querySize();
      this.emit('resize');
      this.needsResize = false;
    }

    this.cTime = now();

    var delta = this.cTime - this.pTime < SUSPEND_THRESHOLD ? (this.cTime - this.pTime) : FRAME_DURATION;

    this.emit('pre-render', delta);
    this.emit('render', delta);

    this.composer.render( delta );

    this.stats.end();

    if(this.playing){
      requestAnimationFrame(function(){
        self.render.apply(self, arguments);
      });
    }

  };

  Canvas.prototype.start = function(){
    var self = this;

    this.playing = true;

    this.sTime = this.pTime = this.cTime = now();

    requestAnimationFrame(function(){
      self.render.apply(self, arguments);
    });

  };

  Canvas.prototype.pause = function(){
    this.playing = false;
  };

  module.exports = Canvas;

})();