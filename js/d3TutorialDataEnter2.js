//shorted: append, then update all together

$("#run").click(function() {
	var svg = d3.select("svg");
	//4 data items
	var selection = svg.selectAll("rect")
			.data([127, 61, 256, 71]);
			
	selection.enter().append("rect");
	selection			
		.attr("x", 0)
		.attr("y", function(d,i) {
			return i*30 + 30;
		})
		.attr("width", function(d,i) {
			return d;
		})
		.attr("height", 20)
		.style("fill", "steelblue");	
});
