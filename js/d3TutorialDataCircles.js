var svg = d3.select("svg");


$("#runC").click(function() {
	//data object
	var data = [
		{x: 100, y:194},
		{x: 80, y:184},
		{x: 130, y:74},
		{x: 90, y:87}
	];
	
	var circles= svg.selectAll("circle")
		.data(data)
		.attr("cx", function(d) {
			return d.x;
		})
		.attr("cy", function(d) {
			return d.y;
		})		
		.style("fill", function(d){
			return d.x >=100 ? "red" :"steelblue";
		});
		
	console.log(circles);
});