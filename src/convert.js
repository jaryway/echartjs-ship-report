import { SVGPathSeg } from "./pathseg";

var settings = {
  divideXBy: 1,
  divideYBy: 1,
  units: "",
  precision: 3
};
function pointCommandsToSVGPoints(pointCommands) {
  return pointCommands
    .map(function(value, index) {
      if (index === 0) return value;
      return `${index % 2 === 1 ? "," : " "}${value}`;
      // return (index % 2 === 1 ? "," : " ") + value;
    })
    .join("");
}
function pointCommandsToCSSPoints(pointCommands, settings) {
  return pointCommands
    .map(function(value, index, array) {
      return (
        (
          value / (index % 2 === 0 ? settings.divideXBy : settings.divideYBy)
        ).toFixed(settings.precision) +
        settings.units +
        (index % 2 === 1 && index < array.length - 1 ? "," : "")
      );
    })
    .join(" ");
}
function pathToPoints(segments) {
  var count = segments.numberOfItems;
  var result = [],
    segment,
    x,
    y;
  for (var i = 0; i < count; i++) {
    segment = segments.getItem(i);
    switch (segment.pathSegType) {
      case SVGPathSeg.PATHSEG_MOVETO_ABS:
      case SVGPathSeg.PATHSEG_LINETO_ABS:
      case SVGPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
      case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
      case SVGPathSeg.PATHSEG_ARC_ABS:
      case SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
      case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS:
        x = segment.x;
        y = segment.y;
        break;

      case SVGPathSeg.PATHSEG_MOVETO_REL:
      case SVGPathSeg.PATHSEG_LINETO_REL:
      case SVGPathSeg.PATHSEG_CURVETO_CUBIC_REL:
      case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:
      case SVGPathSeg.PATHSEG_ARC_REL:
      case SVGPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
      case SVGPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL:
        x = segment.x;
        y = segment.y;
        if (result.length > 0) {
          x += result[result.length - 2];
          y += result[result.length - 1];
        }
        break;

      case SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
        x = segment.x;
        y = result[result.length - 1];
        break;
      case SVGPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
        x = result[result.length - 2] + segment.x;
        y = result[result.length - 1];
        break;

      case SVGPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
        x = result[result.length - 2];
        y = segment.y;
        break;
      case SVGPathSeg.PATHSEG_LINETO_VERTICAL_REL:
        x = result[result.length - 2];
        y = segment.y + result[result.length - 1];
        break;
      case SVGPathSeg.PATHSEG_CLOSEPATH:
        return result;
      default:
        console.log("unknown path command: ", segment.pathSegTypeAsLetter);
    }
    result.push(x, y);
  }
  return result;
}

// function rect2Points(rect) {
//   const [x, y, width, height] = ["x", "y", "width", "height"].map(
//     k => rect[k].baseVal.value
//   );

//   return [x, y, x + width, y, x + width, y + height, x, y + height];
// }

// function circle2Points(circle) {
//   const [cx, cy, r] = ["cx", "cy", "r"].map(k => circle[k].baseVal.value);
//   let degree = 0;
//   let points = [];
//   // 已知圆心，半径，角度，求圆上的点坐标
//   while (degree < 360) {
//     points.push(
//       (cx + r * Math.cos((degree * Math.PI) / 180)).toFixed(3),
//       (cy + r * Math.sin((degree * Math.PI) / 180)).toFixed(3)
//     );
//     degree += 5;
//   }
//   return points;
// }

const getPoints = type =>
  ({
    path: path => {
      return pathToPoints(path.pathSegList);
    },

    circle: circle => {
      const [cx, cy, r] = ["cx", "cy", "r"].map(k => circle[k].baseVal.value);
      let degree = 0;
      let points = [];
      // 已知圆心，半径，角度，求圆上的点坐标
      while (degree < 360) {
        points.push(
          (cx + r * Math.cos((degree * Math.PI) / 180)).toFixed(3),
          (cy + r * Math.sin((degree * Math.PI) / 180)).toFixed(3)
        );
        degree += 5;
      }
      return points;
    },

    rect: rect => {
      const [x, y, width, height] = ["x", "y", "width", "height"].map(
        k => rect[k].baseVal.value
      );

      return [x, y, x + width, y, x + width, y + height, x, y + height];
    }
  }[type]);

function crunch() {
  var svg = document.querySelector("#svg-original svg");
  var viewPort = svg.getAttribute("viewBox");
  if (!viewPort)
    viewPort =
      "x:" +
      svg.getAttribute("x") +
      " y:" +
      svg.getAttribute("y") +
      " width:" +
      svg.getAttribute("width") +
      " height:" +
      svg.getAttribute("height");
  document.getElementById("viewbox").innerHTML = "ViewPort: " + viewPort;
  document.getElementById("svg-result").innerHTML = document.getElementById(
    "svg-original"
  ).innerHTML;

  var shapes = document.querySelectorAll(
    "#svg-result path,#svg-result rect,#svg-result circle"
  );

  const list = Array.from(shapes).map(shape => {
    const { tagName } = shape;
    let points = getPoints(tagName)(shape);
    let polygonSVGPoints = pointCommandsToSVGPoints(points);
    return { element: shape, polygonSVGPoints, points };
    // list.push({ element: path, polygonSVGPoints, points });
  });

  // console.log(, "rects");

  // const list = [];

  var cssPolygons = ["<ul>"];
  list.forEach(({ element, points, polygonSVGPoints }) => {
    var polygon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon"
    );
    polygon.setAttributeNS(null, "fill", "#cecece");
    polygon.setAttributeNS(null, "points", polygonSVGPoints);
    element.parentNode.replaceChild(polygon, element);

    cssPolygons.push(
      "<li>",
      "polygon(",
      pointCommandsToCSSPoints(points, settings),
      ")",
      "</li>"
    );
  });

  cssPolygons.push("</ul>");
  document.getElementById("output").innerHTML = cssPolygons.join("");
}
window.onload = function() {
  // var gui = new dat.GUI({ autoPlace: false });
  // document.getElementById("my-gui-container").appendChild(gui.domElement);

  // gui.add(settings, "divideXBy").min(1).max(100).step(.5).onFinishChange(
  //     function(newValue) {
  //         crunch();
  //     }
  // );
  // gui.add(settings, "divideYBy").min(1).max(100).step(.5).onFinishChange(
  //     function(newValue) {
  //         crunch();
  //     }
  // );
  // gui.add(settings, "units", ['none', 'px', '%', 'em']).onFinishChange(
  //     function(newValue) {
  //         if (newValue === 'none')
  //             settings.units = '';
  //         crunch();
  //     }
  // );
  // gui.add(settings, "precision").min(0).max(10).step(1).onFinishChange(
  //     function(newValue) {
  //         crunch();
  //     }
  // );
  var picker = document.getElementById("files");
  picker.addEventListener(
    "change",
    function(evt) {
      var files = evt.target.files;
      if (files.length < 1) return;
      var f = files[0];
      if (f.type != "image/svg+xml") return;
      var reader = new FileReader();
      reader.onload = (function(theFile) {
        return function(e) {
          var result = e.target.result;
          // some programs add extra markup at the beginning, we remove that here
          result = result.replace(/^[\s\S]*(<svg)/i, "$1");
          document.getElementById("svg-original").innerHTML = result;
          crunch();
        };
      })(f);
      reader.readAsText(f);
    },
    false
  );
  crunch();
};
