var l = new Lumine();

describe('Lumine Canvas', function(){

  it('should have a WebGL context.', function(){
    return l.Canvas.renderer.domElement.should.equal(l.Canvas.el);
  });

});