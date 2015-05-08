var svg = d3.select("svg");
var circle = svg.selectAll("circle")
	//.data([32,57,112, 293])
    .data([32,57]);	
  circle.enter().append("circle")
	.style("fill", "steelblue")
	.attr("cy", 60)
	.attr("cx", function(d, i) { return i* 100 +30 })
	.attr("r", function(d) { return Math.sqrt(d); });
	
	circle.exit().remove();