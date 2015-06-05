
queue()
	.defer(d3.csv,  "class2015statistics.csv")
	.await(init);

function init(error, class2015Statisctics) {
	if (error) { console.log(error); }
	
	horizontalBarChart(class2015Statisctics);
}

function horizontalBarChart(data) {
	var genderLabel = d3.keys(data[0]).filter(function(key) { return key !== "Year"});
//	console.log(genderLabel);
	data.forEach(function(d) {
		d.gender = genderLabel.map(function(name) {
			return { name: name, value: +d[name]}; });
	})
//	console.log(data);	
	
	var margins= {top:20, right:20, bottom:30, left:40};
	var width = 600 - margins.left - margins.right;
	var height = 400 - margins.top - margins.bottom;
	
	var color = d3.scale.ordinal()
		.range(["#74a9cf", "#bf812d"]);
	
	var x0 = d3.scale.ordinal()
		.rangeRoundBands([0,width], .2 )
		.domain(data.map(function(d) { return d.Year; }));
		
	var x1 = d3.scale.ordinal()
		.rangeRoundBands([0, x0.rangeBand()],.3)
		.domain(genderLabel);		
		
	var y = d3.scale.linear()
		.range([height, 0])
		.domain([0, d3.max(data, function(d) { return d3.max(d.gender, function(d) { return d.value; }); })]);
		
	var xAxis = d3.svg.axis()
		.scale(x0)
		.orient("bottom");
		
	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");
		
		
	//add the canvas to the DOM
	var svg = d3.select("#chart").append("svg")
		.attr("width", width + margins.left + margins.right)
		.attr("height", height + margins.top + margins.bottom)
	  .append("g")
		.attr("transform" , "translate(" + margins.left + "," + margins.top + ")");
		
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
		.text("Class of 2015");
	
	var gender = svg.selectAll(".genderGroup")
		.data(data)
		.enter().append("g")
			.attr("class", "genderGroup")
			.attr("transform", function(d) { return "translate(" + x0(d.Year) + ",0 )"; });
	
	gender.selectAll("rect")
		.data(function(d) { return d.gender; })
	  .enter().append("rect")
		.attr("width", x1.rangeBand())
		.attr("x", function(d) { return x1(d.name); })
		.attr("y", function(d) { return y(d.value); })
		.attr("height", function(d) { return height - y(d.value) ; })
		.style("fill", function(d) { return color(d.name); });
		
	//add text to bars
	gender.selectAll("text")
		.data(function(d) { return d.gender; })
	  .enter().append("text")
		.attr("x", function(d) { return x1(d.name)+20; })
		.attr("y", function(d) { return y(d.value)+10; })
		.attr("dy", ".4em")
		.text(function(d) { return d.value; });
	
	var legend = svg.selectAll(".legend")
		.data(genderLabel.slice().reverse())
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
		.text(function(d) { return d; })
			
//	console.log(data);
	//calculate totals
	var total = d3.nest()
		.key(function(d) { return d.Year; })
		.rollup(function(d) {
			return d3.sum(d, function(d) {
				return d3.sum(d.gender , function(d) { return d.value; });
			});
		}).entries(data);
//	console.log(total);

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
			if (i == 0) {
				return "Total " + d.key + " graduates: " + d.values;
			}else{
				return "Total in I-day " + d.key + ": " + d.values;	
			}		
			
		});
		


}