(function(){

  function Lumine(){

    this.Scenes = {};
    this.Layers = {};

  }

  Lumine.prototype = {

    Composer: require('./composer'),
    Canvas: require('./canvas'),
    Shaders: require('./shaders'),
    Passes: require('./passes'),

    use: function(Scenes, Layers){

      var allScenes, allLayers;

      if(arguments.length > 1){
        allScenes = Scenes;
        allLayers = Layers;
      }
      else{
        allScenes = Scenes.hasOwnProperty('Scenes') ? Scenes.Scenes : {};
        allLayers = Scenes.hasOwnProperty('Layers') ? Scenes.Layers : {};
      }

      Object.keys(allScenes).forEach(function(name){
        this.Scenes[name] = allScenes[name];
      }.bind(this));

      Object.keys(allLayers).forEach(function(name){
        this.Layers[name] = allLayers[name];
      }.bind(this));

      return this;

    },

    init: function(scenes, options, done){

      var opts = options || {};

      Object.keys(scenes).forEach(function(type){

        var sceneOpts = scenes[type],

            scene = new this.Scenes[type](

              // find the canvas element
              opts.canvas
              || sceneOpts.canvas
              || document.querySelector('canvas.' + type)
              || document.querySelector('canvas.lumine'),

              // this lumine instance
              this,

              // options
              sceneOpts

            );

        scene.canvas.start();

      }.bind(this));

    }

  };

  module.exports = window.Lumine = new Lumine();

})();