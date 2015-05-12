var x = d3.scale.linear(),
	y = d3.scale.linear();
	
var svg = d3.select("svg")
	.attr("width", 300)
	.attr("height", 200)
	
var line = d3.svg.line()
  .x(function(d) { return d.x; })
  .y(function(d) { return d.y; });
  
  svg.append("path")
	.datum([{x:10, y:120}, {x:30, y:90}, {x:60, y:110}, {x:70, y:40}, {x:90, y:70}, {x:140, y:60}])
	.attr("class", "line")
	.attr("d", line);