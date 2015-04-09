var THREE = require('three'),
    us = require('lodash'),
    now = require('../common/now');

var FRAME = 1e3/60;

function docToBoxes(Canvas, LDoc){

  var boxes = [],
      rem = LDoc.typography.base,
      regionCursors = {};

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

      var nCols = Math.min(Math.max(1, Math.floor(pageWidth / (colMinWidth + colGutter))), segment.page['max-columns']),
          colWidth = ((nCols - 1) * colGutter + allMargins - pageWidth) / -nCols;

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

      var mod, m;

      for(m = 0; m < mods.length; m += 1){

        mod = mods[m];

        if (modMinHeight <= cols[curCol]['remaining-height']) {
          cols[curCol].modules.push(mod);
          cols[curCol]['remaining-height'] -= modMinHeight + modGutter;
        } else if (us.has(cols[curCol + 1], 'remaining-height')) {
          curCol += 1;
          cols[curCol].modules.push(mod);
          cols[curCol]['remaining-height'] -= modMinHeight + modGutter;
        } else {
          break;
        }

      }

      regionCursors[segment.region] = m;

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

  // hide modules that didn't make the cut

  us.each(regionCursors, function(m, rid){

    if(m < LDoc.modules[rid].length){

      var n;

      for(n = m; n < LDoc.modules[rid].length; n += 1){

        boxes.push(us.extend(LDoc.modules[rid][n], {

          left: -20,
          top: -20,
          right: -20,
          bottom: -20

        }));

      }

    }

  });

  return boxes;

}

function LayoutGeometry(LDoc){

  this.document = LDoc;

}

LayoutGeometry.prototype.toCG = function(Canvas, geometry){

  var start = now(),
      geo = geometry || new THREE.Geometry();

  geo.dynamic = true;

  us.each(docToBoxes(Canvas, this.document), function(box, i){

    var vi = i * 4,
        fi = i * 2;

    if(!geometry){
      geo.vertices[vi    ] = new THREE.Vector3(0, 0, 0);
      geo.vertices[vi + 1] = new THREE.Vector3(0, 0, 0);
      geo.vertices[vi + 2] = new THREE.Vector3(0, 0, 0);
      geo.vertices[vi + 3] = new THREE.Vector3(0, 0, 0);

      geo.faces.push(
        new THREE.Face3(vi, vi + 1, vi + 2),
        new THREE.Face3(vi+3, vi + 2, vi + 1)
      );
    }

    geo.vertices[vi].x = box.left;
    geo.vertices[vi].y = box.top;

    geo.vertices[vi + 1].x = box.left;
    geo.vertices[vi + 1].y = box.bottom;

    geo.vertices[vi + 2].x = box.right;
    geo.vertices[vi + 2].y = box.top;

    geo.vertices[vi + 3].x = box.right;
    geo.vertices[vi + 3].y = box.bottom;

    geo.faces[fi].vertexColors[0] = new THREE.Color(box.fill);
    geo.faces[fi].vertexColors[1] = new THREE.Color(box.fill);
    geo.faces[fi].vertexColors[2] = new THREE.Color(box.fill);

    geo.faces[fi+1].vertexColors[0] = new THREE.Color(box.fill);
    geo.faces[fi+1].vertexColors[1] = new THREE.Color(box.fill);
    geo.faces[fi+1].vertexColors[2] = new THREE.Color(box.fill);

  });

  if(!geometry){
    geo.computeFaceNormals();
    geo.computeVertexNormals();
  }else{
    geo.verticesNeedUpdate = true;
  }

  var duration = now() - start;

  if(duration > FRAME){
    console.warn('LayoutGeometry calculation took too long:', duration);
  }

  return geo;

};

module.exports = LayoutGeometry;