var l = new Lumine();

describe('Lumine Canvas', function(){

  it('should have a WebGL context.', function(){
    return l.Canvas.renderer.domElement.should.equal(l.Canvas.el);
  });

  it('should render a layout.', function(){
    l.layout({
      segments: [
        {
          region: '1'
        }
      ],
      modules: {
        1: [
          {
            fill: 0x000000
          }
        ]
      }
    });
  });

});