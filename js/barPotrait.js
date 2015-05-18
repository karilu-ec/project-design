var margins= {top:50, right:40, bottom:30, left:100};
var width = 1000 - margins.left - margins.right;
var height = 500 - margins.top - margins.bottom;

var x = d3.scale.ordinal().rangeRoundBands([0, width], .5);
var y = d3.scale.linear().range([height, 0]);

//xAxis Scale
var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom");
        
//yAxis Scale
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(20);
    
//Color scale
var color = d3.scale.category10();

//Add the canvas to the DOM
var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margins.left + margins.right)
    .attr("height", height + margins.top + margins.bottom)
  .append("g")
    .attr("transform", "translate(" + margins.left + "," + margins.top + ")");

//Read applicants data
d3.csv("application.csv", function(data) {
  data.forEach(function(d) {   
    d.value= +d.value;
  });
 //console.log(data);
 x.domain(data.map(function(d) { return d.gender; }));
 y.domain([0, d3.max(data, function(d) { return d.value; }) ]);
   
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
    .text("Number of Applications");
    
  //Adding the bars
  var bars = svg.selectAll("rect")
    .data(data)
    .enter();
    
  bars.append("rect")
    .attr("x", function(d) { return x(d.gender); })
    .attr("y", function(d) { return y(d.value); })
    .attr("width", x.rangeBand())
    .attr("height", function(d) { return height - y(d.value); })
    .attr("fill", function(d,i) { return color(i); } );
    
  //Adding text
  bars.append("text")
      .attr("x", function(d) { return x(d.gender); })
      .attr("y", function(d) { return y(d.value); })
      .attr("dx", x.rangeBand()/2)
      .attr("dy", "1.2em")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.value; })
      .attr("class", "textBar")
      .attr("fill", "white");
    
});
