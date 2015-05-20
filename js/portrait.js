var margins= {top:50, right:40, bottom:30, left:100};
var width = 1000 - margins.left - margins.right;
var height = 500 - margins.top - margins.bottom;
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

//Bars maker.
function maleFemalebars(data, dataTitle, x, y) {
  //Remove previous Bar Text
  d3.select("#chart").selectAll("text.textBar").remove();
  
  // X and Y scale range
  /*var x = d3.scale.ordinal().rangeRoundBands([0, width], .5);
  var y = d3.scale.linear().range([height, 0]);
  
  // X and Y scale  domain.
  x.domain(data.map(function(d) { return d.gender; })); // x domain in male and female
  y.domain([0, d3.max(data, function(d) { return d.value; }) ]);*/
  
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
	  tooltip.select("#value")
		  .text("Total: " + total);
	  
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
      .attr("dy", "1.2em")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.value; })
      .attr("class", "textBar")
      .attr("fill", "white");
  

}

queue()
	.defer(d3.csv, "application.csv")
	.defer(d3.csv, "offersAppointment.csv")
	.defer(d3.csv, "classSize.csv")
	.await(init);
function init(error, applications, offersAppointments, classSize) {
  if (error) {     console.log(error);  }
  applications.forEach(function(d) {   
    d.value= +d.value;
  });
  offersAppointments.forEach(function(d) {   
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
}
