(function(){

  function Lumine(){}

  Lumine.prototype = {

    Composer: require('./composer'),
    Canvas: require('./canvas'),
    Shaders: require('./shaders'),
    Passes: require('./passes')

  };

  module.exports = window.Lumine = new Lumine();

})();