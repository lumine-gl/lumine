var THREE = require('THREE'),
    us = require('lodash');

function LayoutGeometry(Canvas, LDoc){

  var boxes = [],
      rem = LDoc.typography.base;

  us.each(LDoc.segments, function(segment, i){

    if(us.has(segment, 'page')){

      var allMargins = 2 * segment.page['min-horizontal-margin'] * rem,
          vMargin = segment.page['vertical-margin'] * rem,
          pageMaxHeight = segment.page['max-height'] * rem,
          colMinWidth = segment.page.columns['min-width'] * rem,
          colMaxWidth = segment.page.columns['max-width'] * rem,
          modMinHeight = segment.page.modules['min-height'] * rem,
          colGutter = segment.page.columns.gutter * rem,
          modGutter = segment.page.modules.gutter * rem;

      var maxPageWidth = segment.page['max-columns'] * colMaxWidth
            + (segment.page['max-columns'] - 1) * colGutter
            + allMargins,
          minPageWidth = segment.page['min-columns'] * colMinWidth
            + (segment.page['max-columns'] - 1) * colGutter
            + allMargins,
          pageWidth = Math.min(Canvas.width, maxPageWidth);

      var pageX = (Canvas.width - pageWidth) / 2,
          colX = pageX + allMargins / 2;

      var nCols = Math.max(1, Math.floor(pageWidth / (colMinWidth + colGutter))),
          colWidth = ((nCols - 1) * colGutter - pageWidth) / -nCols;

      var mods = LDoc.modules[segment.region],
          curCol = 0,
          cols = [];

      // populate columns
      us.times(nCols, function(i){

        cols[i] = {
          'remaining-height': pageMaxHeight,
          modules: []
        }

      });

      // populate columns with minimums

      while(mods.length){
        var mod = mods.shift();

        // can this column fit this module?

        if(modMinHeight <= cols[curCol]['remaining-height']){
          cols[curCol].modules.push(mod);
          cols[curCol]['remaining-height'] -= modMinHeight + modGutter;
        }else if(us.has(cols[curCol + 1], 'remaining-height')){
          curCol += 1;
          cols[curCol].modules.push(mod);
          cols[curCol]['remaining-height'] -= modMinHeight + modGutter;
        }else{
          break;
        }

      }

      // flex grow the modules in each column

      us.each(cols, function(col, c){

        col['remaining-height'] += modGutter;

        var curY = vMargin;

        us.each(col.modules, function(mod, m){

          // here's where we add this to the boxes array

          var height = modMinHeight + col['remaining-height'] / col.modules.length,
              left = colX + c * (colWidth + colGutter),
              top = Canvas.height - curY;

          boxes.push(us.extend(mod, {

            left: left,
            top: top,
            right: left + colWidth,
            bottom: top - height

          }));

          curY += height + modGutter;

        });

      });

    }

  });

  this.boxes = boxes;

}

LayoutGeometry.prototype.toCG = function(){

  var geometry = new THREE.Geometry();

  us.each(this.boxes, function(box){

    var vi = geometry.vertices.length,
        fi = geometry.faces.length;

    geometry.vertices.push(
      new THREE.Vector3( box.left, box.top, 0 ),
      new THREE.Vector3( box.left, box.bottom, 0 ),
      new THREE.Vector3( box.right, box.top, 0 ),
      new THREE.Vector3( box.right, box.bottom, 0 )
    );

    geometry.faces.push(
      new THREE.Face3(vi, vi + 1, vi + 2),
      new THREE.Face3(vi+3, vi + 2, vi + 1)
    );

    geometry.faces[fi].vertexColors[0] = new THREE.Color(box.fill);
    geometry.faces[fi].vertexColors[1] = new THREE.Color(box.fill);
    geometry.faces[fi].vertexColors[2] = new THREE.Color(box.fill);

    geometry.faces[fi+1].vertexColors[0] = new THREE.Color(box.fill);
    geometry.faces[fi+1].vertexColors[1] = new THREE.Color(box.fill);
    geometry.faces[fi+1].vertexColors[2] = new THREE.Color(box.fill);

  });

  geometry.computeFaceNormals();
  geometry.computeVertexNormals();

  return geometry;

};

module.exports = LayoutGeometry;