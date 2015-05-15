//http://www.recursion.org/d3-for-mere-mortals/
var data = [{year: 2006, books: 54},
            {year: 2007, books: 43},
            {year: 2008, books: 41},
            {year: 2009, books: 44},
            {year: 2010, books: 35}];

var barWidth = 40;
var spaceBetweenBars = 20;
var width = (barWidth + spaceBetweenBars) * data.length;
var height = 200;
var marginLeft = 40;
var marginTop= 40;

		
//declaring Scales
var x = d3.scale.ordinal()
	.domain(data.map(function(d) { return d.year; }))
	.rangeRoundBands([0,width], 0.05); //the pixels to map. the width of the diagram.

var y = d3.scale.linear()
	.domain([0, d3.max(data, function(d) { return d.books; })])
	.range([height, 0]);

//xAxis Scale
var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom");


//Add the canvas to the DOM
var rect_demo = d3.select("#rect-demo")
    .append("svg")
    .attr("width", 400)
    .attr("height", 300)
	.append("g")
	.attr("transform", "translate(" + marginLeft + " ," + marginTop + " )");
	
//Adding the bars to the svg
rect_demo.selectAll("rect")
	.data(data)
	.enter()
	.append("svg:rect")
    .attr("x", function(d, i) { return x(d.year); })
    .attr("y", function(d) { return height - y(d.books); })
    .attr("width", barWidth)
    .attr("height", function(d) { return y(d.books); })
	.attr("fill", "#2d578b");
/*
//Adding text
rect_demo.selectAll("text")
	.data(data)
	.enter()
	.append("svg:text")
	.attr("x", function(d, i) { return x(i) + barWidth; })
	.attr("y", function(d) { return height - y(d.books); })
	.attr("dx", -barWidth/2)
	.attr("dy", "1.2em")
	.attr("text-anchor", "middle")
	.text(function(d) { return d.books; })
	.attr("fill", "white");
	*/
//Adding the xAxis

	