module.exports = function(){

  return typeof performance === 'undefined' ? Date.now() : performance.now();

};