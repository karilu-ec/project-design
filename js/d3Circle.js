var jsonCircles = [
  {
   "x_axis": 30,
   "y_axis": 30,
   "radius": 20,
   "color" : "green"
  }, {
   "x_axis": 70,
   "y_axis": 70,
   "radius": 20,
   "color" : "purple"
  }, {
   "x_axis": 110,
   "y_axis": 100,
   "radius": 20,
   "color" : "red"
}];


/*console.log(d3.select("svg").attr("width", w).attr("height", h).selectAll("circle")
			.data(jsonCircles)
			.enter()
			.append("circle"));*/

var w = 300,
	h =300;
	
//Easy colors accessible via a 10-step ordinal scale
var color = d3.scale.category10();

//Create svg element
var svg = d3.select("svg")
	.attr("width", w)
	.attr("height", h);
	
var circles = svg.selectAll("circle")
			.data(jsonCircles)
			.enter()
			.append("circle");

var circleAttributes = circles
					.attr("cx", function(d) { return d.x_axis;})
					.attr("cy", function(d) { return d.y_axis;})
					.attr("r", function(d) { return d.radius;})
					.style("fill", function(d) { return d.color;});
