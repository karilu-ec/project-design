//http://www.pubnub.com/blog/fun-with-d3js-data-visualization-eye-candy-with-streaming-json/
var diameter = 600;

var data = {"countries_msg_vol": {
  "CA": 170, "US": 393, "CU": 9, "BR": 89, "MX": 192,  "Other": 254 
}};

var svg = d3.select('#chart').append('svg')
.attr('width', diameter)
.attr('height', diameter);
 
var bubble = d3.layout.pack()
.size([diameter, diameter])
.padding(3) // padding between adjacent circles
.value(function(d) {return d.size;}) // new data will be loaded to bubble layout

function processData(data) {
  var obj = data.countries_msg_vol;
 
  var newDataSet = [];
 
  for(var prop in obj) {
    newDataSet.push({name: prop, className: prop.toLowerCase(), size: obj[prop]});
  }
  return {children: newDataSet};
}

var nodes = bubble.nodes(processData(data)) 
  .filter(function(d) { return !d.children; });  // filter out the outer bubble 

  
var vis = svg.selectAll('circle')
  .data(nodes, function(d) { return d.name; });
 
vis.enter().append('circle')
  .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
  .attr('r', function(d) { return d.r; })
  .attr('class', function(d) { return d.className; });