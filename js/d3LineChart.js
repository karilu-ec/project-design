var lineData = [{
  x: 1,
  y: 5
}, {
  x: 20,
  y: 20
}, {
  x: 40,
  y: 10
}, {
  x: 60,
  y: 40
}, {
  x: 80,
  y: 5
}, {
  x: 100,
  y: 60
}];

var margins={top:20, right:20, bottom:20, left:50};

var vis = d3.select("#visualisation")
    .attr("width", 1000)
    .attr("height", 500)
    