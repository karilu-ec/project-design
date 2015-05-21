var margins= {top:50, right:40, bottom:30, left:100};
var width = 1000 - margins.left - margins.right;
var height = 500 - margins.top - margins.bottom;
var chartNode = d3.select("#chart").node();
//Add the canvas to the DOM
var svg = d3.select("#chart").append("svg")   
    .attr("width", width + margins.left + margins.right)
    .attr("height", height + margins.top + margins.bottom)
  .append("g")
    .attr("transform", "translate(" + margins.left + "," + margins.top + ")");
  
// Get the right Axis for the chart.
function putAxis(titleY, x, y) {
  //Remove previus axis
  d3.select("#chart").selectAll("g.axis").remove();
    //xAxis Scale
  var xAxis = d3.svg.axis()
	  .scale(x)
	  .orient("bottom");
		  
  //yAxis Scale
  var yAxis = d3.svg.axis()
	  .scale(y)
	  .orient("left")
	  .ticks(20);

   //Adding the xAxis
  var xAxisGroup = svg.append("g")
	  .attr("class", "x axis")
	  .attr("transform", "translate(0," + height + ")")
	  .call(xAxis)
    .selectAll("text")
      .attr("text-anchor", "end")
      .attr("dx", ".5em")
      .attr("dy", ".80em");
      
  //Adding the yAxis
  var yAxisGroup = svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", "1em")
    .text(titleY);
}

//Male and Female Bars maker.
function maleFemalebars(data, dataTitle, x, y) {
  //Remove previous Bar Text
  d3.select("#chart").selectAll("text.textBar").remove();
  
  //Color scale
  var color = d3.scale.category10();
  
  //Set axis
  putAxis(dataTitle, x, y);
  
  //Calculate totals
  var total = d3.nest()
	//.key(function(d) { return d.keyColumn})  //For this particular example I don't have a key column.
	.rollup(function(d) {
	  return d3.sum(d, function(g) { return g.value; })
	}).entries(data);
  
  //Bind with data
 var barsData= svg.selectAll("rect.bar")
    .data(data);
 var bars = barsData.enter();
 var barsText = svg.selectAll("text.textBar")
    .data(data);
 
   //update
   barsData
   .attr("fill", function(d,i) { return color(i); } )
    
  //enter()
  barsData.enter()
      .append("rect")
      .attr("class", "bar")    
      .attr("fill", function(d,i) { return color(i); } );
	  
  //exit
  barsData.exit()
	.transition()
	.duration(300)
	.ease("exp")
	.attr("width", 0)
	.remove()
	  
  barsData
     .on("mouseover", function(d) {
	  //get this bar x/y values and augment for the tooltip
	  var xPosition = parseFloat(d3.select(this).attr("x")) + x.rangeBand()/2;
	  var yPosition = parseFloat(d3.select(this).attr("y"))/2 + height/2;
	  
	  //update the tooltip position
	  var tooltip = d3.select("#tooltip")
		.style("left", xPosition + "px")
		.style("top", yPosition + "px");
	  tooltip.select("#title")
		  .text(dataTitle)
	  tooltip.append("div")
		  .attr("class", "total");		  
	  tooltip.select(".total").html("<strong>Total: </strong>" + total)
	  
	  //show the tooltip
	  d3.select("#tooltip").classed("hide", false);	  
	})
	.on("mouseout", function(d) {
	  //hide the tooltip
	  d3.select("#tooltip").classed("hide", true);
	})
	.attr("stroke-width", 4)
	.transition()	
	.duration(800)
	.ease("quad")
	.attr("x", function(d) { return x(d.gender); })
    .attr("y", function(d) { return y(d.value); })
    .attr("width", x.rangeBand())
    .attr("height", function(d) { return height - y(d.value); });

  barsText
	  .enter().append("text") //operate in new elements only
	  .attr("x", function(d) { return x(d.gender); })
      .attr("y", function(d) { return y(d.value); })
      .attr("dx", x.rangeBand()/2)
      .attr("dy", "-.5em")
      .attr("text-anchor", "middle")
      .transition()
      .delay(500)
      .duration(400)
      .text(function(d) { return d.value; })
      .attr("class", "textBar")
      .attr("fill", "black");
}

//Pie Nominating Categories.
function nominationsPie(data) {
  var outerRadius = Math.min(width, (height+margins.top))/2;
  var donutWidth = 65;

  //http://bl.ocks.org/mbostock/5577023 <- color brewer pallete
  var color = d3.scale.ordinal()
	.range(["#66c2a5","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494","#b3b3b3"]);
  
  //remove canvas svg from previous charts
  d3.select("svg").remove();
  
  //Add svg to the DOM
  var svg = d3.select("#chart").append("svg")
	  .attr("width", width + margins.left + margins.right)
	  .attr("height", height + margins.top + margins.bottom)
	.append("g")
	  .attr("transform", "translate(" + width/2 +","+ ((height+margins.top+margins.bottom)/2) +" )"); //centering the group
  
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

/*ToDo Try*/		
  //Add the background of arc//Try the transition http://bl.ocks.org/mbostock/5100636
  //http://codepen.io/tpalmer/pen/jqlFG/
  //http://bl.ocks.org/mbostock/1346410
  //http://bl.ocks.org/mbostock/5100636//
  var background = svg.append("path")
	.datum({engAngle: (2*Math.Pi)})
	.style("fill", "#ddd")
	.attr("d", arc)
	.each(function(d) { this._current = d; }); // store the initial angles;
		
  //Set the arc and draw the paths for the donut
	/*var	path = svg.selectAll("path")
		.data(pie(data)) //data is receiving the pie function
		.enter()
		.append("path")
		.attr("d", arc)
		.attr("fill", function(d, i) {
			return color(d.data.category);
		})
		.transition()
		.duration(800);*/

}


queue()
	.defer(d3.csv, "application.csv")
	.defer(d3.csv, "offersAppointment.csv")
	.defer(d3.csv, "classSize.csv")
	.defer(d3.csv, "nominatingCategory.csv")
	.await(init);
function init(error, applications, offersAppointments, classSize, nominatingCategory) {
  if (error) {     console.log(error);  }
  applications.forEach(function(d) {   
    d.value= +d.value;
  });
  offersAppointments.forEach(function(d) {   
    d.value= +d.value;
  });
  classSize.forEach(function(d) {   
    d.value= +d.value;
  });
  nominatingCategory.forEach(function(d) {   
    d.value= +d.value;
  });
  
  //Default to first chart male/female chart.
  // X and Y scale range
  var x = d3.scale.ordinal().rangeRoundBands([0, width], .5);
  var y = d3.scale.linear().range([height, 0]);
  
  // X and Y scale  domain of the number of applications.
  x.domain(applications.map(function(d) { return d.gender; })); // x domain in male and female
  y.domain([0, d3.max(applications, function(d) { return d.value; }) ]);
  
  maleFemalebars(applications, "Number of Applications", x, y)
    
  //Event listeners
  d3.select("#applications")
	.on("click", function(d,i) {
	  maleFemalebars(applications, "Number of Applications", x, y)
	});
  d3.select("#offersAppointment")
	.on("click", function(d,i) {
	  maleFemalebars(offersAppointments, "Offers of Appointment", x, y)
	});
  d3.select("#classSize")
	.on("click", function(d,i) {
	  maleFemalebars(classSize, "Class Size", x, y)
	});
  d3.select("#nominatingCategory")
	.on("click", function(d,i) {
	  nominationsPie(nominatingCategory)
	});
}
