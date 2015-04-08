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
          { fill: 0x252321 },
          { fill: 0x393432 },
          { fill: 0x6A7F7A },
          { fill: 0x393432 }
        ]
      }
    });
  });

});