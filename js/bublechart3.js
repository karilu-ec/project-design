//https://gist.github.com/infographicstw/9d61356e9111f09ae16b (example)
var margins= {top:0, right:40, bottom:0, left:10};
var width = 1000 - margins.left - margins.right;
var height = 500 - margins.top - margins.bottom;
var diameter1 = 1000;
var diameter2 = 500;
var duration = 200; var delay = 0;
//Add the canvas to the DOM
var svg = d3.select("#chart").append("svg")   
    .attr("width", width + margins.left + margins.right)
    .attr("height", height + margins.top + margins.bottom);
 /* .append("g")
    .attr("class", "mainG")
    .attr("transform", "translate(" + margins.left + "," + margins.top + ")");
    */
d3.csv("educationalBackground.csv", function(data) {
  var dataset =  { children: data };
  var pack = d3.layout.pack();
  pack = pack.padding(4)
    .size([diameter1, diameter2])
    .value(function(d) {return d.value;}) // new data will be loaded to bubble layout;
    .sort(function(a,b) { return b.value - a.value });

  var nodes = pack.nodes(dataset)
    .filter(function(d) { return !d.children;  });
  var color = d3.scale.category10();
  
  var circles = svg.selectAll("circle")
    .data(nodes, function(d) { return d.category; });
  //update
  circles.transition()
    .duration(duration)
    .delay(function(d,i) { return i*7 ; })
    .attr('r', function(d) {return d.r;});
    
  //enter
  circles.enter()
    .append("circle")
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .attr("r", function(d) { return d.r; })
    .attr("fill", function(d) { return color(d.category); })
    .attr("stroke", "#444")
    .style("opacity", 0)
    .transition()
    .duration(duration *5.2)
    .style("opacity", 1);
  //exit
  circles.exit()
    .transition()
    .duration(duration)
    .style('opacity', 0)
    .remove();
    
  var txt = svg.selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
    .attr("x", function(d) { return d.x; })
    .attr("y", function(d) { return d.y; })
    .attr("text-anchor", "middle")
    .text(function(d) { return d.category; });
    
});
