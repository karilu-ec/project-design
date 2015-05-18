var data = [2,4,3];
var width = 800;
var height = 500;

var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height);
    
svg.selectAll("circle")
    .data(data)
    .enter().append("circle")
    .attr("r", function(d) { return 5 * d; })
    .attr("fill", "red")
    .attr("cx", 40)
    .attr("cy", height / 2);
    
svg.selectAll("circle")
    .transition()
    .duration(750)
    .delay(500)
    .attr("fill", "green")
    .attr("cx", 500)
    .attr("cy", function(d, i) { return 100 * (i + 1); });