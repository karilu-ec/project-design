function InitChart() {
 
  var barData = [{
    'x': 1,
    'y': 5
  }, {
    'x': 20,
    'y': 20
  }, {
    'x': 40,
    'y': 10
  }, {
    'x': 60,
    'y': 40
  }, {
    'x': 80,
    'y': 5
  }, {
    'x': 100,
    'y': 60
  }];
  
 var width = 1000;
 var height = 500;
 var margins= {top:20, right:20, bottom:20, left:50};
 var vis = d3.select('#visualisation')
      .attr("width", width + margins.left + margins.right)
      .attr("height", height + margins.bottom + margins.top);
      
  //declaring the xScale
  var xRange = d3.scale.linear()
      .range([margins.left, width - margins.right])
      .domain([d3.min(barData, function(d) { return d.x; }), d3.max(barData, function(d) { return d.x; }) ]);
  
  //declaring the yScale
  var yRange = d3.scale.linear()
      .range([height - margins.top, margins.bottom])
      .domain([d3.min(barData, function(d) { return d.y; }), d3.max(barData, function(d) { return d.y; }) ]);
  
  //xAxis
  xAxis =d3.svg.axis()
    .scale(xRange)
    .tickSize(5)
    .tickSubdivide(true);
 
 //yAxis
 yAxis = d3.svg.axis()
    .scale(yRange)
    .tickSize(5)
    .orient("left")
    .tickSubdivide(true);
    
  //svg append g for axis
  vis.append("svg:g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " + (height - margins.bottom) + ")" )
    .call(xAxis);
    
  vis.append("svg:g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + margins.left + ", 0)")
    .call(yAxis);
    
    xRange = d3.scale.ordinal()
    .rangeRoundBands([margins.left, width - margins.right], 0.1)
    .domain(barData.map(function(d) { return d.x; }));

//add bars   
vis.selectAll("rect")
  .data(barData)
  .enter()
  .append("rect")
  .attr("x", function(d) {
    return xRange(d.x);
  })
  .attr("y", function(d) {
    return yRange(d.y)
  })
  .attr("width", xRange.rangeBand())
  .attr("height", function(d) {
    return (height-margins.bottom) - yRange(d.y);
  })
  .attr("fill", "grey")
  .on("mouseover", function(d) {
    d3.select(this)
      .attr("fill", "blue");
  })
  .on("mouseout", function(d) {
    d3.select(this)
      .attr("fill", "grey")
  })
}

InitChart();


  