//http://www.recursion.org/d3-for-mere-mortals/
var data = [{year: 2006, books: 54},
            {year: 2007, books: 43},
            {year: 2008, books: 41},
            {year: 2009, books: 44},
            {year: 2010, books: 35}];

/*var margin = {top: 40, right: 20, bottom: 70, left: 40},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;
    */
var margin= {top:50, right:40, bottom:30, left:100};
var width = 1000 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

		
//declaring Scales
var x = d3.scale.ordinal()
	.domain(data.map(function(d) { return d.year; }))
	.rangeRoundBands([0,width], 0.1); //the pixels to map. the width of the diagram. 0.1 space between bars

var y = d3.scale.linear()
	.domain([0, d3.max(data, function(d) { return d.books; })])
	.range([height, 0]);

//xAxis Scale
var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom");
        
//yAxis Scale
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

//Color scale
var color = d3.scale.category10();

//Add the canvas to the DOM
var rect_demo = d3.select("#rect-demo")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + " ," + margin.top + " )");
	
//Adding the bars to the svg
rect_demo.selectAll("rect")
    .data(data)
    .enter()
    .append("svg:rect")
    .attr("x", function(d) { return x(d.year); })
    .attr("y", function(d) { return y(d.books); })
    .attr("width", x.rangeBand()-10)
    .attr("height", function(d) { return height - y(d.books); })
    .attr("fill", function(d,i) { return color(i); });

//Adding text
rect_demo.selectAll("text")
	.data(data)
	.enter()
	.append("svg:text")
	.attr("x", function(d) { return x(d.year); })
	.attr("y", function(d) { return y(d.books); })
	.attr("dx", x.rangeBand()/2)
	.attr("dy", "1.2em")
	.attr("text-anchor", "middle")
	.text(function(d) { return d.books; })
	.attr("fill", "black");
	
//Adding the xAxis
rect_demo.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(xAxis)
  .selectAll("text")
    .style("text-anchor", "end")
    .attr("dy", "1em")
    .attr("dx", ".2em")
    
//Adding the yAxis
rect_demo.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .style("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".5em")
    .text("Number of books");