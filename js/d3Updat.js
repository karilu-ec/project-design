//http://bl.ocks.org/mbostock/3808218

var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

var width = 960,
	height = 500;

var svg = d3.select("svg")
	.attr("width", width)
	.attr("height", height)
  .append("g")
	.attr("transform", "translate(32," + (height/2) + ")");
	
