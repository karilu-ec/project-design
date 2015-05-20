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
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .attr("text-anchor", "end")
      .attr("dx", ".5em")
      .attr("dy", ".80em");
      
  //Adding the yAxis
  svg.append("g")
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
function maleFemalebars(data) {
  // X and Y scale range
  var x = d3.scale.ordinal().rangeRoundBands([0, width], .5);
  var y = d3.scale.linear().range([height, 0]);
  
  // X and Y scale  domain.
  x.domain(data.map(function(d) { return d.gender; })); // x domain in male and female
  y.domain([0, d3.max(data, function(d) { return d.value; }) ]);
  
  //Color scale
  var color = d3.scale.category10();
  
  //Set axis
  putAxis("Number of Applications", x, y);

  
  //Bind with data
 var barsData= svg.selectAll("rect.bar")
    .data(data);
 var bars = barsData.enter();
   
   //update
   barsData
   .attr("fill", function(d,i) { return color(i); } );
    
  //enter()
  barsData.enter()
      .append("rect")
      .attr("class", "bar")    
      .attr("fill", function(d,i) { return color(i); } );
      //.attr("x", function(d) { return x(d.gender); })
      //.attr("y", function(d) { return y(d.value); })
      //.attr("width", x.rangeBand())
      //.attr("height", function(d) { return height - y(d.value); });
  
  //exit
 // bars.exit()
    /* bars
	.transition()
	.duration(300)
	.ease("exp")
	  .attr("width", 0)
	  .remove()*/
	  
  barsData.attr("stroke-width", 4)
	.transition()
	.duration(300)
	.ease("quad")
	.attr("x", function(d) { return x(d.gender); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x.rangeBand())
        .attr("height", function(d) { return height - y(d.value); });
 

  bars
      .append("text")
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
	.await(init);
function init(error, applications, offersAppointments) {
  if (error) {     console.log(error);  }
  applications.forEach(function(d) {   
    d.value= +d.value;
  });
  offersAppointments.forEach(function(d) {   
    d.value= +d.value;
  });
  /*console.log(applications);
  console.log(offersAppointments);*/
  
  //Default to first chart
  maleFemalebars(applications)
  
  
  //Event listeners
}
