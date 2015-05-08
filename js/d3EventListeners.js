var data = [54, 61, 30, 38, 90, 23, 45 ,13 ,99, 88, 34, 47, 16, 25];

var y = function(d,i) { return 200-d; };
var y_up = function(d,i) {return 180-d;};

var formatRect = function(sel) {
	sel.attr("x", function(d,i) { return i*20 +30; })
	  .attr("y", y)
	  .attr("width", 10)
	  .attr("height", function(d,i) { return d; });
	return sel; //should return the object for chain calling	  
};

var svg = d3.select("svg");