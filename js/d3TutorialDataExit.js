//shorted: append, then update all together

$("#run").click(function() {
	var svg = d3.select("svg");
	//2 data items
	var selection = svg.selectAll("rect")
			.data([127, 61]);
			
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
	
	selection.exit().remove();
		
});
