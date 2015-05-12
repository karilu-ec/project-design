//Source: http://bl.ocks.org/mbostock/3887235

//width , height and radius
var width=960,
	height=500,
	outerRadius = Math.min(width, height)/2;



var color = d3.scale.ordinal()
	.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arc= d3.svg.arc()
	.outerRadius(outerRadius)
	.innerRadius(0);

var pie = d3.layout.pie()
	.sort(null)
	.value(function(d) { return d.population; });
	
var svg = d3.select("svg")
	.attr("width", width)
	.attr("height", height);
	
d3.csv("data.csv", function(error, data) {
	data.forEach(function(d) {
		d.population = +d.population;
	});
	
	//Set up groups
	var g = svg.selectAll(".arc")
		.data(pie(data))
	  .enter().append("g")
	    .attr("class", "arc")
		.attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");
	
	//Draw arc paths
	g.append("path")
	  .attr("g", arc)
	  .style("fill", function(d) { return color(d.data.age); })
	  .attr("d", arc);

	//Labels	  
	g.append("text")
	  .attr("transform", function(d) {
		return "translate(" + arc.centroid(d) + ")";
	})
	  .attr("text-anchor", "middle")
	  .text(function(d) {
		return d.data.age;
	   });
});
	
