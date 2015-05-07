//Tutorial:http://eyalarubas.com/getting-started-with-d3js.html
// updating circles.
var data = [{
	id: 'before1',
	x:'25%',
	y:'25%',
	r:'5%',
	c:'red'
}, {
	id:'before2',
	x:'50%',
	y:'50%',
	r:'5%',
	c:'green'
}, {
	id:'before3',
	x:'75%',
	y:'75%',
	r:'5%',
	c:'blue'
}];

var canvas = d3.select("#canvas");
//data takes a function key to identify each of the datums
var circles = canvas
	.selectAll('circle')
	.data(data, function(d, i) {
		return d.id; //this is the identifier of the datum.
	});
	
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
	// Reset the data array with new circles
	var data = [{
	id: 'after1',
	x:'33%',
	y:'33%',
	r:'5%',
	c:'orange'
}, {
	id:'after2',
	x:'66%',
	y:'66%',
	r:'5%',
	c:'cyan'
}, {
	id:'after3',
	x:'25%',
	y:'25%',
	r:'5%',
	c:'magenta'
}];
	
	var circles = canvas
		.selectAll('circle')
		.data(data, function(d, i) {
			return d.id;
		});
		
	// update (x,y) coordinates with a transition of existing elements.
	circles
		//transition 1
		.transition()
		.attr('cx', function(d) {
			return d.x;
		})
		.attr('cy', function(d) {
			return d.y;
		});
	//creates new elements
	circles
		.enter()
		.append('circle')
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
		.transition()
		.attr('r', function(d) {
			return d.r;
		})
	//remove old elements
	circles
		.exit()
		.transition()
		.attr('r', 0)
		.remove();	
});