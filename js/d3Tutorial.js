var svg = d3.select("svg")

$("#runA").click(function() {
	//chain
	var myRect = svg
		.select("rect")	
	    .attr("width", 100)
	    .attr("height", 100)
	    .style("fill", "steelblue"); 
});

$("#runC").click(function() {
		svg.selectAll("rect")
		.attr({
			"width": 100,
			"height": 100
		})
		.style({
			"fill": "steelblue"
		});
	});