//http://zeroviscosity.com/d3-js-step-by-step/step-1-a-basic-pie-chart
/*var dataset = [
  { label: 'Abulia', count: 10 }, 
  { label: 'Betelgeuse', count: 20 },
  { label: 'Cantaloupe', count: 30 },
  { label: 'Dijkstra', count: 40 }
];
*/

//width , height and radius
var width=360,
	height=360,
	outerRadius = Math.min(width, height)/2;
var donutWidth=75;	

var color = d3.scale.category20b();

var svg = d3.select("#chart").append("svg")
	.attr("width", width)
	.attr("height", height)
	.append('g')
	.attr("transform", "translate(" + (width/2) + "," + (height/2) + ")");

var arc= d3.svg.arc()
	.outerRadius(outerRadius)
	.innerRadius(outerRadius - donutWidth);

var pie = d3.layout.pie()
	.sort(null)
	.value(function(d) { return d.count; });

var tooltip = d3.select("#chart")
	.append("div")
	.attr("class", "tooltip");
	
	tooltip.append("div")
	  .attr("class", "label");
	
	tooltip.append("div")
	  .attr("class", "count");
	
	tooltip.append("div")
	  .attr("class", "percent")
	  
	
d3.csv("weekdays.csv", function(error, dataset) {	
	dataset.forEach(function(d) {
		d.count = +d.count;
		d.enabled = true;
	});
	//Set up paths /Draw arc paths
	var path = svg.selectAll("path")
	  .data(pie(dataset))
	  .enter()
	  .append("path")
	  .attr("d", arc) 	    
	  .style("fill", function(d, i) { return color(d.data.label); })
	  .each(function(d) { this._current = d; });
	  
	path.on("mouseover", function(d) {
		var total = d3.sum(dataset.map(function(d) {
			return (d.enabled) ? d.count : 0;
		}));
		var percent = Math.round(1000 * d.data.count/total)/10;
		tooltip.select('.label').html(d.data.label);
		tooltip.select('.count').html(d.data.count);
		tooltip.select('.percent').html(percent + '%');
		tooltip.style("display", "block");
		
	});
    //on mouse out
	path.on("mouseout", function(d) {
		tooltip.style("display", "none");
	});
	//on mouse move
	/*path.on('mousemove', function(d) {
	  tooltip.style('top', (d3.event.pageY + 10) + 'px')
    .style('left', (d3.event.pageX + 10) + 'px');
	});*/
	//Legends constructing
	var legendRectSize = 18;
	var legendSpacing =4;
	
	var legend = svg.selectAll(".legend")
		.data(color.domain())
		.enter()
		.append("g")
		.attr("class", "legend")
		.attr("transform", function(d,i) {
			var height = legendRectSize + legendSpacing;
			var offset = height * color.domain().length/2;
			var horz = -2*legendRectSize;
			var vert = i* height - offset;
			return 'translate(' + horz + ',' + vert + ')';
		});
		
		legend.append("rect")
		  .attr("width", legendRectSize)
		  .attr("height", legendRectSize)
		  .style("fill", color)
		  .style("stroke", color)
		  .on('click', function(label) {                            // NEW
              var rect = d3.select(this);                             // NEW
              var enabled = true;                                     // NEW
              var totalEnabled = d3.sum(dataset.map(function(d) {     // NEW
                return (d.enabled) ? 1 : 0;                           // NEW
              }));                                                    // NEW
			  
			   if (rect.attr('class') === 'disabled') {                // NEW
                rect.attr('class', '');                               // NEW
              } else {                                                // NEW
                if (totalEnabled < 2) return;                         // NEW
                rect.attr('class', 'disabled');                       // NEW
                enabled = false;                                      // NEW
              }                                                       // NEW
			  
			  pie.value(function(d) {                                 // NEW
                if (d.label === label) d.enabled = enabled;           // NEW
                return (d.enabled) ? d.count : 0;                     // NEW
              });                                                     // NEW

              path = path.data(pie(dataset));                         // NEW
			  
			  path.transition()                                       // NEW
                .duration(750)                                        // NEW
                .attrTween('d', function(d) {                         // NEW
                  var interpolate = d3.interpolate(this._current, d); // NEW
                  this._current = interpolate(0);                     // NEW
                  return function(t) {                                // NEW
                    return arc(interpolate(t));                       // NEW
                  };                                                  // NEW
                });                                                   // NEW
            });                                                       // NEW
			  
			  
		legend.append("text")
		  .attr("x", legendRectSize + legendSpacing)
		  .attr("y", legendRectSize - legendSpacing)
		  .text(function(d) { return d; });

});	
