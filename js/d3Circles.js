//Tutorial:http://eyalarubas.com/getting-started-with-d3js.html
var data = [{
	x:'25%',
	y:'25%',
	r:'5%',
	c:'red'
}, {
	x:'50%',
	y:'50%',
	r:'5%',
	c:'green'
}, {
	x:'75%',
	y:'75%',
	r:'5%',
	c:'blue'
}];

var canvas = d3.select("#canvas");
var circles = canvas
	.selectAll('circle')
	.data(data);
	
circles
	.enter() //first type of event in a datum's lifespan - its  creation "entering"
	.append('circle') //append a new circle element
	.attr('cx', function(d){ //set attributes
		return d.x;
	})
	.attr('cy', function(d){
		return d.y;
	})
	.attr('fill', function(d){
		return d.c;
	})
	.attr('r', function(d){
		return d.r;
	})
	
$("#canvas").click(function() {	
	// change coorditates on the first circle.	
	data[0].x = '75%';

	//add a new circle
	data.push({
		x:'25%',
		y:'50%',
		r: '5%',
		c:'magenta'
	});
	
	var circles = canvas
		.selectAll('circle')
		.data(data);	
		
	// update (x,y) coordinates with a transition of existing elements.
	circles
		.transition()
		.attr('cx', function(d) {
			return d.x;
		})
		.attr('cy', function(d) {
			return d.y;
		});
	//create new element	
	circles
		.enter()
		.append('circle')
		//set initial (pre-transition) attributes:
		.attr('cx', function(d) {
			return d.x;
		})
		.attr('cy', function(d) {
			return d.y;
		})
		.attr('fill', function(d) {
			return d.c;
		})
		.attr('r', 0)
		//start transition
		.transition()
		//set final (post transition) attributes:
		.attr('r', function(d){
			return d.r;
		});		
});