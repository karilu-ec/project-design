var data = d3.range(10);
var svg = d3.select("svg");

var c =  d3.scale.category10();

svg.selectAll("rect")
  .data(data)
  .enter().append("rect")
	.attr("x", function(d,i) { return i*30+30; })
	.attr("y", function(d,i) { return 20; })
	.attr("width", 20)
	.attr("height", 20)
	.style("fill", function(d,i) { return c(i); })