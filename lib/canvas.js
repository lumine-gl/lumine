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

  function Canvas(el, Scene, Layers, options){

    this.opts = options || {};

    this.playing = false;

    this.cTime = null;
    this.pTime = null;
    this.sTime = null;

    // bind to and prepare DOM element

    if(el){

      this.el = el;
      this.el.classList.add('lumine');

      this.renderer = new THREE.WebGLRenderer({
        canvas: this.el,
        antialias: true
      });

      window.addEventListener('resize', function(){
        this.needsResize = true;
      }.bind(this));

      // prepare a stat watcher

      this.stats = new Stats();
      this.stats.setMode(0);

      this.stats.domElement.classList.add('lumine-stats');

      document.body.appendChild(this.stats.domElement);

    }else{

      this.renderer = new THREE.WebGLRenderTarget(this.opts.width, this.opts.height, _.extend({
        antialias: true
      }, this.opts));

    }

    this.renderer.setClearColor(0xffffff, 0);

    this.composer = new Composer(this.renderer);

    this.querySize();

    _.each(Scene.layers, function(layer, i){

      var layerPass = Layers[layer.type](Scene, this, layer);

      if(i === Scene.layers.length - 1){
        layerPass.renderToScreen = true;
      }else{
        layerPass.needsSwap = true;
      }

      this.composer.addPass( layerPass );

    }.bind(this));

    EE.call(this);

  }

  inherits(Canvas, EE);

  Canvas.prototype.querySize = function(){

    if(this.el){

      var box = this.el.getBoundingClientRect(),
          density = window.devicePixelRatio;

      this.setSize(box.width, box.height, density);

    }

  };

  Canvas.prototype.setSize = function(width, height, density){

    this.size = {
      width: width,
      height: height,
      density: density
    };

    this.density = density;

    if(this.el){

      this.renderer.setPixelRatio(density);
      this.renderer.setSize(this.size.width, this.size.height, this.opts.useStyle || false);

    }else{

      this.renderer.setSize(this.size.width * density, this.size.height * density);

    }

    this.composer.setSize(this.size.width * density, this.size.height * density);

  };

  Canvas.prototype.render = function(){
    var self = this;

    if(this.stats) this.stats.begin();

    if(this.needsResize){

      if(this.el) this.querySize();

      this.emit('resize');
      this.needsResize = false;

    }

    this.cTime = now();

    var delta = this.cTime - this.pTime < SUSPEND_THRESHOLD ? (this.cTime - this.pTime) : FRAME_DURATION;

    this.emit('pre-render', delta);
    this.emit('render', delta);

    this.composer.render( delta );

    if(this.stats) this.stats.end();

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