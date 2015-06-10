var margins= {top:20, right:20, bottom:30, left:40};
var width = 600 - margins.left - margins.right;
var height = 250 - margins.top - margins.bottom;

var color1 = d3.scale.ordinal()
	.range(["#74a9cf", "#bf812d"]);
	
var color2 = d3.scale.ordinal()
	.range(["#7fc97f", "#beaed4", "#386cb0"]);

queue()
	.defer(d3.csv,  "class2015statistics.csv")
	.defer(d3.csv,  "class2015commissions.csv")
	.defer(d3.csv,  "moreGraduates.csv")
	.await(init);

function init(error, class2015Statistics, class2015Commissions, moreGraduates) {
	if (error) { console.log(error); }
	//add the first canvas to the DOM
	var canvas = d3.select("#chart").append("svg")
		.attr("width", width + margins.left + margins.right)
		.attr("height", height + margins.top + margins.bottom)
	  .append("g")
		.attr("transform" , "translate(" + margins.left + "," + margins.top + ")");
		
	var data = setData(class2015Statistics);
	legendClass(data, canvas);
	classSize(data, canvas, "Class of 2015", color1);
	
	
	//add the second canvas to the DOM
	var canvas2 = d3.select("#chart").append("svg")
		.attr("width", width + margins.left + margins.right)
		.attr("height", height + margins.top + margins.bottom)
	  .append("g")
		.attr("transform", "translate(" + margins.left + "," + margins.top + ")");
	
	var data2 = setData(class2015Commissions);
	legendCommission(data2, canvas2);
	classSize(data2, canvas2, "Commissions", color1);
	
	//add the third canvas to the DOM
	var canvas3 = d3.select("#chart").append("svg")
		.attr("width", width + margins.left + margins.right)
		.attr("height", height + margins.top + (margins.bottom+40))
	  .append("g")
		.attr("transform", "translate(" + margins.left + "," + margins.top + ")");
	
	singleChart(moreGraduates, canvas3, "Other Graduates", color2);
	
}

//Helper function to wrap text elements
function wrap(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1, // ems
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

function setData(data) {
	var keyLabel = d3.keys(data[0]).filter(function(key) { return key !== "Key"});
	data.forEach(function(d) {
		d.group = keyLabel.map(function(name) {
			return { name: name, value: +d[name]}; });
	});
	return data;
}

function legendClass(data, svg) {
	//calculate totals
	var total = d3.nest()
		.key(function(d) { return d.Key; })
		.rollup(function(d) {
			return d3.sum(d, function(d) {
				return d3.sum(d.group , function(d) { return d.value; });
			});
		}).entries(data);

	var legend2 = svg.selectAll(".legend2")
		.data(total)
		.enter().append("g")
			.attr("class", "legend2")
			.attr("transform", function(d,i) { return "translate(0," + ((i*20) + 60) + ")"; });
	legend2.append("text")
		.attr("x", width-70)
		.attr("y", 9)
		.attr("dy", ".35em")
		.style("text-anchor", "middle")
		.text(function (d,i) {
			if ( d.key == "2015") {
				return "Total " + d.key + " graduates: " + d3.format(",")(d.values);
			}else{
				return "Total on I-day in " + d.key + ": " + d3.format(",")(d.values);
			}			
		});
}
function legendCommission(data, svg) {
	//calculate totals
	var total = d3.nest()
		.key(function(d) { return d.Key; })
		.rollup(function(d) {
			return d3.sum(d, function(d) {
				return d3.sum(d.group , function(d) { return d.value; });
			});
		}).entries(data);

	var legend2 = svg.selectAll(".legend2")
		.data(total)
		.enter().append("g")
			.attr("class", "legend2")
			.attr("transform", function(d,i) { return "translate(0," + ((i*20) + 60) + ")"; });
	legend2.append("text")
		.attr("x", width-100)
		.attr("y", 9)
		.attr("dy", ".35em")
		.style("text-anchor", "middle")
		.text(function (d,i) {
			if (i == 0) {
				return "Total " + d.key + ": " + d.values;
			}else{
				return "Total " + d.key + ": " + d.values;	
			}			
		});
}

function singleChart(data, svg, dataTitle, color){
	data.forEach(function(d) {
		d.value = +d.value;
	});
	data.sort(function(a,b) {
		return b.value - a.value;
	});
	
	var x = d3.scale.ordinal()
		.rangeRoundBands([0,width], .6)
		.domain(data.map(function(d) { return d.category; }));
	
	var y = d3.scale.linear()
		.range([height,0])
		.domain([0, d3.max(data, function(d) { return d.value; })]);
		
	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");
		
	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");
		
	//apend x and y axis
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
	  .selectAll("text")
		.attr("text-anchor", "end")
        .attr("dx", ".1em")
        .attr("dy", ".5em")
	    .call(wrap, x.rangeBand()+20);;
		
	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
	  .append("text")
		.attr("transform" , "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text(dataTitle);
	
	var rect = svg.selectAll(".rect")
		.data(data)
	  .enter().append("rect")
		.attr("class", "rect")
		.attr("x", function(d) { return x(d.category); })
		.attr("y", function(d) { return y(d.value); })
		.attr("width", x.rangeBand())
		.attr("height", function(d) { return height - y(d.value); })
		.style("fill", function(d) { return color(d.category); });

	//add text to bars	
	var text = svg.selectAll(".textRect")
		.data(data)	
	  .enter().append("text")
		.attr("class", "textRect")
		.attr("x", function(d) { return x(d.category)+25; })
		.attr("y", function(d) { return y(d.value)+10; })
		.attr("dy", ".4em")
		.text(function(d) { return d.value; });

	
}

function classSize(data, svg, dataTitle, color) {
	var keyLabel = d3.keys(data[0]).filter(function(key) { return key !== "Key" && key !== "group"});
		
	var x0 = d3.scale.ordinal()
		.rangeRoundBands([0,width], .2 )
		.domain(data.map(function(d) { return d.Key; }));
		
	var x1 = d3.scale.ordinal()
		.rangeRoundBands([0, x0.rangeBand()],.3)
		.domain(keyLabel);		
		
	var y = d3.scale.linear()
		.range([height, 0])
		.domain([0, d3.max(data, function(d) { return d3.max(d.group, function(d) { return d.value; }); })]);
		
	var xAxis = d3.svg.axis()
		.scale(x0)
		.orient("bottom");
		
	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");	
		
	//append x and y axis
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);
	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
	  .append("text")
		.attr("transform" , "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text(dataTitle);
	
	var g = svg.selectAll(".gGroup")
		.data(data)
		.enter().append("g")
			.attr("class", "gGroup")
			.attr("transform", function(d) { return "translate(" + x0(d.Key) + ",0 )"; });
	
	g.selectAll("rect")
		.data(function(d) { return d.group; })
	  .enter().append("rect")
		.attr("width", x1.rangeBand())
		.attr("x", function(d) { return x1(d.name); })
		.attr("y", function(d) { return y(d.value); })
		.attr("height", function(d) { return height - y(d.value) ; })
		.style("fill", function(d) { return color(d.name); });
		
	//add text to bars
	g.selectAll("text")
		.data(function(d) { return d.group; })
	  .enter().append("text")
		.attr("x", function(d) { return x1(d.name)+20; })
		.attr("y", function(d) { return y(d.value)+8; })
		.attr("dy", ".4em")
		.text(function(d) { return d.value; });
	
	var legend = svg.selectAll(".legend")
		.data(keyLabel.slice().reverse())
		.enter().append("g")
			.attr("class", "legend")
			.attr("transform", function(d,i) { return "translate(0, " + i*20 + ")"; });
	
	legend.append("rect")
		.attr("x", width-18)
		.attr("width", 18)
		.attr("height", 18)
		.style("fill", color);
	
	legend.append("text")
		.attr("x", width-24)
		.attr("y", 9)
		.attr("dy", ".35em")
		.style("text-anchor", "end")
		.text(function(d) { return d; });	
}