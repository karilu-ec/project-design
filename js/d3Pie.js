//width and height
var w=300, h=300;

var dataset = [1, 10, 20, 45, 6, 35];

var outerRadius = w/2;
var innerRadius = 0;
var arc = d3.svg.arc()
		.innerRadius(innerRadius)
		.outerRadius(outerRadius);
		
var pie = d3.layout.pie();

//Easy colors accessible via a 10-step ordinal scale
var color = d3.scale.category10();

//Create svg element
var svg = d3.select("svg")
	.attr("width", w)
	.attr("height", h);
	
//set up groups
var arcs = svg.selectAll("g.arc")
		.data(pie(dataset))
		.enter()
		.append("g")
		.attr("class", "arc")
		.attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

//Draw arc paths
arcs.append("path")
	.attr("fill", function(d,i) {
		return color(i);
	})
	.attr("d", arc);
	
//Labels
arcs.append("text")
	.attr("transform", function(d) {
		return "translate(" + arc.centroid(d) + ")";
	})
	.attr("text-anchor", "middle")
	.text(function(d) {
		return d.value
	});