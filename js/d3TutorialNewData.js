var i=0;
var data = [10,20,30,40,50,60,70,80,90,100,110,120].map(function(x) {
	return {id:i++,
			x:x
		};
});

var formatRect = function (sel) {
	 sel.attr("x", function(d,i) { return i*20+30; })
		.attr("y", function(d,i) { return 200-d.x; })
		.attr("width", 10)
		.attr("height", function(d,i) {return d.x; })
		.style("fill", "steelblue");
	return sel; //should return the object for chain calling
};


var getId = function(d) { return d.id;};

var svg = d3.select("svg");
	svg.selectAll("rect")
	.data(data, getId)
	.enter().append("rect")
	.call(formatRect);

$("#run").click(function() {
	data.shift(); //remove first
	console.log(i);
	data.push({id: i, x: (i%15+1)*10 });
	i++;
	console.log(data);
	
	var rects = svg.selectAll("rect")
		.data(data, getId);
	
	rects.enter().append("rect");
	
	rects.transition()
		.duration(1000)//1sec
		.call(formatRect);
		
	rects.exit()
		.transition()
		.duration(500)
		.style("opacity", "0")
		.remove();
});
