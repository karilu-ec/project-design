var margin = {top: 20, right: 20, bottom: 70, left: 100},
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var x = d3.scale.ordinal().rangeRoundBands([0, width], .5);
var y = d3.scale.linear().range([height, 0]);

//Color scale
var color = d3.scale.category10();

//xAxis scale
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

//yAxis
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(20);

//specify the chart area and dimensions
var svg = d3.select("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("application.csv", function(error, data) {
    data.forEach(function(d) {
        d.value = +d.value;
    });
  x.domain(data.map(function(d) { return d.gender; }))
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "1em")
      .attr("dy", "1em");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Number of Applications");
 
    
  svg.selectAll("rect")
        .data(data)
      .enter().append("rect")
        .style("fill", function(d, i) { return color(i); })
        .attr("x", function(d) { return x(d.gender); })
        .attr("width",  x.rangeBand())
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); });
        
  svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text(function(d) {
            return d;
        })
        .attr("text-anchor", "middle")
        .attr("x",  x.rangeBand()/2)
        .attr("y", function(d) {
            return height-y(d.value)*4+14;
        })
        .attr("font-size", "11px")
        .attr("fill", "black");

});