var l = new Lumine();

describe('Lumine Canvas', function(){

  it('should have a WebGL context.', function(){
    return l.Canvas.renderer.domElement.should.equal(l.Canvas.el);
  });

  it('should render a layout.', function(){
    l.layout({
      typography: {
        base: 16 // CSS pixels
      },
      segments: [
        {
          region: '1',
          page: {
            'max-columns': 4, // number
            'min-columns': 1, // number
            'min-horizontal-margin': 2, // base type size
            'vertical-margin': 1, // base type size
            'min-height': 30, // base type size
            'max-height': 40, // base type size
            columns: {
              gutter: 1, // base type size
              'min-width': 18, // base type size
              'max-width': 24 // base type size
            },
            modules: {
              'min-height': 10,
              'gutter': 1
            }
          }
        }
      ],
      modules: {
        1: [
          { fill: 0xFA7B62 },
          { fill: 0xFF8936 },
          { fill: 0xF3C13A },
          { fill: 0x5B8930 },
          { fill: 0x407A52 },
          { fill: 0x3A6960 },
          { fill: 0x044F67 },
          { fill: 0x1F4788 },
          { fill: 0x614E6E },
          { fill: 0x6D2B50 }
        ]
      }
    });
  });

});