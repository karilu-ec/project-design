var data = [10,20,30,40,50,60,70,80,90,100,110,120];
var I = function(d, i) { return i*20+30; };

function updateRect(rect) {
	return rect.attr("x", I)
		.attr("y", function(d,i) { return 200-d; })
		.attr("width", 10)
		.attr("height", function(d,i) {return d; })
		.style("fill", "steelblue");
}

var svg = d3.select("svg");
		 svg.selectAll("rect")
			.data(data, I)
			.enter().append("rect")
				.call(updateRect);

$("#run").click(function() {
	var first=data.shift();
	data.push(first);
	svg.selectAll("rect")
		.data(data, function(d) {return d;})
		.transition()
		.duration(1000)//1sec
			.call(updateRect);
});
