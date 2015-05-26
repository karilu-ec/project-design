var margins= {top:40, right:40, bottom:40, left:50};
var width = 1000 - margins.left - margins.right;
var height = 500 - margins.top - margins.bottom;
var chartNode = d3.select("#chart").node();
//Add the canvas to the DOM
var svg = d3.select("#chart").append("svg")   
    .attr("width", width + margins.left + margins.right)
    .attr("height", height + margins.top + margins.bottom)
  .append("g")
    .attr("class", "mainG")
    .attr("transform", "translate(" + margins.left + "," + margins.top + ")");
var svgTitle = d3.select("svg").append("g")
    .attr("class", "chartTitle")
    .attr("transform", "translate("+ (width-4*margins.right)+","+ margins.top + ")");

// Set the p for the Charts Legends
  var tooltip	= d3.select("#tooltip");
  tooltip.append("p")
    .attr("class", "category");
  tooltip.append("p")
    .attr("class", "total");
  tooltip.append("p")
    .attr("class", "percent");		

//Helper function to wrap text elements
function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.3, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
}

  
// Get the right Axis for the chart.
function putAxis(titleY, x, y) {
  //Remove previous axis
  d3.select("#chart").selectAll("g.axis").remove();
    //xAxis Scale
  var xAxis = d3.svg.axis()
	  .scale(x)
	  .orient("bottom");
		  
  //yAxis Scale
  var yAxis = d3.svg.axis()
	  .scale(y)
	  .orient("left")
	  .ticks(15);
 var mainG = d3.select(".mainG");
   //Adding the xAxis   
  var xAxisGroup = mainG.append("g")
	  .attr("class", "x axis")
	  .attr("transform", "translate(0," + height + ")")
	  .call(xAxis)
    .selectAll("text")
      .attr("text-anchor", "end")
      .attr("dx", ".5em")
      .attr("dy", ".80em")
	  .call(wrap, x.rangeBand());
      
  //Adding the yAxis
  var yAxisGroup = mainG.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", "1em")
    .text(titleY);
}
//Add chart Subtitle
function chartSubtitle(data) {
  console.log(data);
  var svgSubtitle = svgTitle.append("text")
	.attr("class", "chartSubtitle")
	.attr("y", 40)
	.attr("dy", "1em")
	.text(data[0].info)
	.call(wrap, 200);
}

//Bars maker.
function barCharts(data, dataTitle, x, y) {
  //Remove previous charts elements
  d3.select("#chart").selectAll("text.textBar").remove();
  d3.select("#chart").selectAll("path").remove();
  d3.select("#chart").selectAll("g.donutLegend").remove();
  d3.select("#chart").selectAll("g.donutLegendTitle").remove();
  d3.select("#chart").selectAll("g.donuts").remove();
  svgTitle.selectAll("text").remove();
  var mainG = d3.select(".mainG")
    .attr("transform", "translate(" + margins.left + "," + margins.top + ")");
  
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
 
 //console.log(data);
 
  //Set chart title
  svgTitle.append("text").text(dataTitle);
  svgTitle.append("text")
    .attr("y", 20)
    .text("Total: " + total);
    
  //Bind with data
 var barsData= svg.selectAll("rect.bar")
    .data(data);
 var bars = barsData.enter();
 var barsText = svg.selectAll("text.textBar")
    .data(data);
 
   //update
   barsData
    .transition()	
    .duration(800)
    .ease("quad")
    .attr("x", function(d) { return x(d.category); })
    .attr("y", function(d) { return y(d.value); })
    .attr("width", x.rangeBand())
    .attr("height", function(d) { return height - y(d.value); })
    .attr("fill", function(d,i) { return color(i); } );
    
  //enter()
  barsData.enter()
      .append("rect")
      .attr("class", "bar")    
      .attr("fill", function(d,i) { return color(i); } )
      .attr("x", function(d) { return x(d.category); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", x.rangeBand())
      .attr("height", function(d) { return height - y(d.value); });	  
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
	  tooltip.select(".total").text(d.category +": "+d.value);
	  
	  //show the tooltip
	  d3.select("#tooltip").classed("hide", false);	  
	})
	.on("mouseout", function(d) {
	  //hide the tooltip
	  d3.select("#tooltip").classed("hide", true);
	});

  barsText
	  .enter().append("text") //operate in new elements only
	  .attr("x", function(d) { return x(d.category); })
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
//Calculate Percent
function calcPercent(percent) {
  return [percent, 100-percent];
}
//Composition Donut
function compositionDonut(data) {
  //Remove previous Charts components.
  d3.select("#chart").selectAll("text.textBar").remove();
  d3.select("#chart").selectAll("g.axis").remove();
  d3.select("#chart").selectAll("rect.bar").remove();
  d3.select("#chart").selectAll("path").remove();
  d3.select("#chart").selectAll("g.donutLegend").remove();
  d3.select("#chart").selectAll("g.donutLegendTitle").remove();
  svgTitle.selectAll("text").remove();
  
  heightC = 900;
  d3.select("svg")
    .attr("height", heightC + margins.top + margins.bottom);

// variables configuration
  var widthDonut =  130;
  var heightDonut = 130;
  var duration   = 500,
    transition = 200;
  var text_y = ".3em";
  var title_dy = "-5em";
  var title_y = -15;
  var maxItemsPerRow = 4;
  var spaceBetween = 180;
  
  var radius = Math.min(widthDonut, heightDonut) / 2;
  var pie = d3.layout.pie().sort(null);
 
  var arc = d3.svg.arc()
    .innerRadius(radius - 20)
    .outerRadius(radius);
  
  //Placing the main group
  d3.select(".mainG")	  
	  .attr("transform", "translate(" + margins.left + "," + margins.top + ")");
  
  
  var j=0, k = 0;
  var dist = widthDonut/2 + spaceBetween;
  var donuts = svg.selectAll(".donuts")
    .data(data)
    .enter().append("g")
    .attr("class", "donuts")
    .attr("transform", function(d,i) {
      var horz, vert;
      if ((i!= 0) && (i  % maxItemsPerRow == 0)) {
	j=0; k++;
	horz = widthDonut/2 + (j*dist);
	vert = heightDonut/2 + (k*dist);
	j++;
      }else {
	horz = widthDonut/2 +  (j * dist);
	vert = heightDonut/2 + (k * dist);
	j++;
      }
     return "translate(" + horz + "," + vert + ")";  
    });

  var path = donuts.selectAll("path")
    .data(function(d,i) { return pie(d.lower); })
    .enter().append("path")
    .attr("class", function(d,i) { return "color"+i; } )
    .attr("d", arc)
    .each(function(d) { return this._current = d; }); //storing initial values
 
  var txt = donuts.append("text")
	.attr("class", "value")
    .attr("text-anchor", "middle")
    .attr("dy", text_y);
  var title = donuts.append("text")
	.attr("class", "title")
    .attr("text-anchor", "middle")
	.attr("y", title_y)
    .attr("dy", title_dy);
	
  var timeout = setTimeout(function() {
	  clearTimeout(timeout);
	  fillDonuts();
	  textDonuts();	  
	}, 200);
  
  function fillDonuts() {
	path = path.data(function(d,i) {
		return pie(d.upper);
	  }); // update the data	
    path
	  .transition()
	  .duration(duration)
	  .call(arcTween);
  }
  function textDonuts() {
	d3.selectAll(".donuts > text.value")
	  .data(data)
	  .text(function(d) { return (d.value + "%"); });
	d3.selectAll(".donuts > text.title")
	  .data(data)
	  .text(function(d) { return d.category; })
	  .call(wrap, (widthDonut+spaceBetween/2));
	
  }
  /* Transition to get the porcentage numbers and arc colored*/
  function arcTween(transition) {
	transition.attrTween("d", function(d) {	  	  
	  var i  = d3.interpolate(this._current, d);	  
	  this._current = i(0);
	  return function(t) {
		return arc(i(t));
	  };
	})
  } // redraw the arcs
}

//Pie Nominating Categories.
function nominationsPie(data) {
  //Remove previous Charts components.
  d3.select("#chart").selectAll("text.textBar").remove();
  d3.select("#chart").selectAll("g.axis").remove();
  d3.select("#chart").selectAll("rect.bar").remove();
  d3.select("#chart").selectAll("g.donuts").remove();
  svgTitle.selectAll("text").remove();
  
  var outerRadius = Math.min(width, (height+margins.top))/2;
  var donutWidth = 65;

  //http://bl.ocks.org/mbostock/5577023 <- color brewer pallete
  var color = d3.scale.ordinal()
	.range(["#66c2a5","#8da0cb","#e78ac3","#a6d854","#ffd92f","#e5c494","#b3b3b3"]);
  
  //Define color domain
  d3.map(data, function(d) { return color(d.category);});
  
  //Centering the group
  d3.select(".mainG")	  
	  .attr("transform", "translate(" + width/2 +","+ ((height+margins.top+margins.bottom)/2) +" )");
  
  //Define the outerRadius variable and set innerRadius because it's a donut.
  var arc = d3.svg.arc()
	  .outerRadius(outerRadius)
	  .innerRadius(outerRadius - donutWidth);
	  	  
  //For the start and end angles of the segments function
  var pie = d3.layout.pie()
	  .value(function(d) { return d.value; })
	  .sort(null);
	  
  // Set the divs for the Legends
  var tooltip	= d3.select("#tooltip");
	tooltip.select("#title")
		.text("Nominating Categories");

  //Set the arc and draw the paths for the donut
	var path = svg.selectAll("path")
		.data(pie(data)) //data is receiving the pie function with the actual data.
		.enter()
		.append("path")
		.attr("d", arc)
		.attr("fill", "#ddd")
		.each(function(d) { this._current = d; }); //store the initial angles.
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
		tooltip.select(".total").html("<strong>Total: </strong>"  + d.data.value);
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
		tooltip.select(".category").html("");
		tooltip.select(".total").html("");
		tooltip.select(".percent").html("");
	});
    
	var timeout = setTimeout(function() {
	  clearTimeout(timeout);
	  fillPie()
	}, 200);
	
	// Update the pie with colors from the domain.
	function fillPie() {	  
	  path = path.data(pie(data));
	  path		
		.transition()		
		.duration(750)
		.attr("fill", function(d, i) {
			return color(d.data.category);
		})
		.attrTween("d", arcTween);//Redraw the arcs.
	}
	
	//Store the displayed angles in _current. _current has the stored angles. see path.
	// Interpolates from _current to the new angles.
	// During the transition, _current is updated in-place by d3.interpolate.
	function arcTween(a) {
	  var i = d3.interpolate(this._current, a);
	  this._current = i(0);
	  return function(t) {
		return arc(i(t));
	  };
	}
	
	//Donut Labels
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

}




queue()
	.defer(d3.csv, "application.csv")
	.defer(d3.csv, "offersAppointment.csv")
	.defer(d3.csv, "classSize.csv")
	.defer(d3.csv, "nominatingCategory.csv")
	.defer(d3.csv, "raceBreakdown.csv")
	.defer(d3.tsv, "composition.tsv")
	.defer(d3.csv, "militaryBackground.csv")
	.defer(d3.tsv, "militaryBackgroundMoreInfo.tsv")
	.await(init);
function init(error, applications, offersAppointments, classSize, nominatingCategory, raceBreakdown, composition, militaryBackground, militaryBackgroundInfo ) {
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
  raceBreakdown.forEach(function(d) {   
    d.value= +d.value;
  });  
  var compositionDataset = [];
  composition.forEach(function(d) {
    d.value= +d.value;
    var dataset = {
      lower: calcPercent(0),
      upper:calcPercent(d.value),
      category: d.category,
	  value: d.value
    };
     compositionDataset.push(dataset);
  });
  militaryBackground.forEach(function(d) {   
    d.value= +d.value;
  });
  //Default to first chart male/female chart.
  // X and Y scale range
  var x = d3.scale.ordinal().rangeRoundBands([0, width], .5);
  var y = d3.scale.linear().range([height, 0]);
  
  // X and Y scale  domain of the number of applications.
  x.domain(applications.map(function(d) { return d.category; })); // x domain in male and female applicants
  y.domain([0, d3.max(applications, function(d) { return d.value; }) ]);
  
  barCharts(applications, "Number of Applications", x, y)
    
  //Event listeners
  d3.select("#applications")
	.on("click", function(d,i) {
	  // X and Y scale  domain of the number of applications.
	  x.domain(applications.map(function(d) { return d.category; })); // x domain in male and female applicants
	  y.domain([0, d3.max(applications, function(d) { return d.value; }) ]);
	  barCharts(applications, "Number of Applications", x, y);
	});
  d3.select("#offersAppointment")
	.on("click", function(d,i) {
	  // X and Y scale  domain of the number of applications and offers of appointment.
	  x.domain(offersAppointments.map(function(d) { return d.category; })); // x domain in male and female
	  y.domain([0, d3.max(applications, function(d) { return d.value; }) ]);
	  barCharts(offersAppointments, "Offers of Appointment", x, y);
	});
  d3.select("#nominatingCategory")
	.on("click", function(d,i) {
	  nominationsPie(nominatingCategory);
	});
  d3.select("#classSize")
	.on("click", function(d,i) {
	   // X and Y scale  domain of the class size.
	  x.domain(classSize.map(function(d) { return d.category; }));
	  y.domain([0, d3.max(classSize, function(d) { return d.value; }) ]);
	  barCharts(classSize, "Class Size", x, y);
	});
  d3.select("#racialBreakdown")
	.on("click", function(d,i) {
	   // X and Y scale  domain of the race breakdown.
	  x.domain(raceBreakdown.map(function(d) { return d.category; }));
	  y.domain([0, d3.max(classSize, function(d) { return d.value; }) ]);
	  barCharts(raceBreakdown, "Racial Breakdown", x, y);
	});
  d3.select("#composition")
	.on("click", function(d,i) {
	  compositionDonut(compositionDataset);
	});
  d3.select("#militaryBackground")
	.on("click", function(d,i) {
	   // X and Y scale  domain of the race breakdown.
	  x.domain(militaryBackground.map(function(d) { return d.category; }));
	  y.domain([0, d3.max(militaryBackground, function(d) { return d.value; }) ]);
	  barCharts(militaryBackground, "Military Background", x, y);
	  chartSubtitle(militaryBackgroundInfo);
	});
}
