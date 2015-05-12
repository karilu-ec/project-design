var data = [54, 61, 30, 38, 90, 23, 45 ,13 ,99, 88, 34, 47, 16, 25];

var y = function(d,i) { return 200-d; };
var y_up = function(d,i) {return 180-d;};

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
		.on('mouseover', function(){
			d3.select(this)
				.attr("y", y_up);
		})
		.on('mouseout', function() {
			d3.select(this)
				.attr("y", y)
		})
		.on("click", function() {
			d3.select(this)
				.style("stroke", "red")
				.style("fill", "yellow");
		});