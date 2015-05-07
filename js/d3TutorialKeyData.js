var I = function(d) { return d; };
var data = [10,20,30,40,50,60,70,80,90,100,110,120];
var svg = d3.select("svg");
		 svg.selectAll("rect")
			.data(data, I)
			.enter().append("rect")
				.attr("x", function(d,i) {
					return i*20+30;
				})
				.attr("y", function(d,i) {
					return 200-d;
				})
				.attr("width", 10)
				.attr("height", function(d,i) {
					return d;
				})
				.style("fill", "steelblue");

$("#run").click(function() {
	var first=data.shift();
	data.push(first);
	svg.selectAll("rect")
		.data(data, I)
		.transition()
		.duration(1000)//1sec
			.attr("x", function(d,i) {
					return i*20+30;
				})
				.attr("y", function(d,i) {
					return 200-d;
				})
				.attr("width", 10)
				.attr("height", function(d,i) {
					return d;
				});
});
