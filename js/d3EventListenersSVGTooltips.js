var data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];

var y = function(d,i) { return 200-d; };

var formatRect = function(sel) {
	sel.attr("x", function(d,i) { return i*50 +30; })
	  .attr("y", y)
	  .attr("width", 30)
	  .attr("height", function(d,i) { return d; });
	return sel; //should return the object for chain calling	  
};

var svg = d3.select("svg");
svg.selectAll("rect")
	.data(data)
	.enter().append("rect")
		.call(formatRect)
		.style("fill", "steelblue")
		.append("svg:title")
			.text(function(d,i) { return d; });