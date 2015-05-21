var margins= {top:50, right:40, bottom:30, left:100};
var width = 1000 - margins.left - margins.right;
var height = 500 - margins.top - margins.bottom;
var outerRadius = Math.min(width, (height+margins.top))/2;
var donutWidth = 65;

//http://bl.ocks.org/mbostock/5577023 <- color brewer pallete
var color = d3.scale.ordinal()
	.range(["#66c2a5","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494","#b3b3b3"]); //define my own color palette


//Add svg to the DOM
var svg = d3.select("#chart").append("svg")
	.attr("width", width + margins.left + margins.right)
	.attr("height", height + margins.top + margins.bottom)
  .append("g")
	.attr("transform", "translate(" + width/2 +","+ ((height+margins.top+margins.bottom)/2) +" )");

//Define the radius with the outerRadius variable and set innerRadius because it's a donut.
var arc = d3.svg.arc()
	.outerRadius(outerRadius)
	.innerRadius(outerRadius - donutWidth);
	
//For the start and end angles of the segments function
var pie = d3.layout.pie()
	.value(function(d) { return d.value; })
	.sort(null);
	
// for the Legends
var tooltip	= d3.select("#tooltip");
	tooltip.select("#title")
		.text("Nominating Categories");
	tooltip.append("div")
		.attr("class", "category");
	tooltip.append("div")
		.attr("class", "count");
	tooltip.append("div")
		.attr("class", "percent");
		
var chartNode = d3.select("#chart").node();


d3.csv("nominatingCategory.csv", function(error, data) {
	data.forEach(function(d) {
		d.value = +d.value
	});
	
	//Set the arc and draw the paths for the donut
	var	path = svg.selectAll("path")
		.data(pie(data)) //data is receiving the pie function
		.enter()
		.append("path")
		.attr("d", arc)
		.attr("fill", function(d, i) {
			return color(d.data.category);
		});
	//Event handler for the donut sections
	path.on("mouseover", function(d) {
		var total = d3.sum(data.map(function(d) {
			return d.value;
		}));
		var percent = Math.round((100*d.data.value)/total);
		
		//Calculate the absolute coordinates
		var absoluteMousePos = d3.mouse(chartNode);
		
		var xPos = absoluteMousePos[0];
		var yPos = absoluteMousePos[1]+150;
		
		tooltip.select(".category").html(d.data.category.toUpperCase());
		tooltip.select(".count").html(d.data.value);
		tooltip.select(".percent").html(percent + "%");
		//show the tooltip
		tooltip.classed("hide", false);
		//update the tooltip's position
		tooltip.style("left", xPos + "px");
		tooltip.style("top", yPos + "px");
	});
	path.on("mouseout", function(d) {
		//hide the tooltip
		tooltip.classed("hide", true);
	});
		
	//Labels
	var legendRectSize = 20;
	var legendSpacing = 5;
	var donutLegend =svg.selectAll(".donutLegend")
		.data(color.domain()) //color.domain() refers to the array of labels defined in the fill of the arc. color(d.data.category)
		.enter()
		.append("g")
		.attr("class", "donutLegend")
		.attr("transform", function(d, i) {
			//centering the legend.
			var height = legendRectSize + legendSpacing;
			var offset = height * color.domain().length/2;// vertical offset of the entire legend
			var horz = -7 * legendRectSize; //left edge of the element
			var vert= i * height - offset; //top edge of the element
			return "translate(" + horz + "," + vert + ")";
		});
	//Add the coloured square and label
	donutLegend.append("rect")
		.attr("width", legendRectSize)
		.attr("height", legendRectSize)
		.attr("fill", color)
		.attr("stroke", color);
	//labels
	donutLegend.append("text")
		.attr("x", legendRectSize + legendSpacing)
		.attr("y", legendRectSize - legendSpacing)
		.text(function(d) { return d; });
	
	var donutLegendTitle = svg.append("g")
		.attr("class", "donutLegendTitle")
		.attr("transform", function(d) {
			//centering the legend title.
			var height = legendRectSize + legendSpacing;
			var offset = height * (color.domain().length+3)/2;// vertical offset of the entire legend
			var horz = -5*legendRectSize; //left edge of the element
			var vert=  - offset; //top edge of the element
			return "translate(" + horz + "," + vert + ")";			
		})
		.append("text")
			.attr("x", legendRectSize + legendSpacing)
			.attr("y", legendRectSize - legendSpacing)
			.text("Nominating Categories");
});