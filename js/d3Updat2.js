//http://bl.ocks.org/mbostock/3808218

var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

var width = 960,
	height = 500;

var svg = d3.select("svg")
	.attr("width", width)
	.attr("height", height)
  .append("g")
	.attr("transform", "translate(32," + (height/2) + ")");
	
function update(data) {
	//DATA JOIN
	// join new data with old elements, if any.
	var text = svg.selectAll("text")
		.data(data, function(d) { return d; });
	
	//UPDATE
	// Update old elements as needed
	text.attr("class", "update");
	
	//ENTER
	//create new elements as needed
	text.enter().append("text")
		.attr("class", "enter")
		.attr("dy", ".35em")
		.text(function(d) { return d; });
		
	//ENTER + UPDATE
	// Appending to the enter selection expands the update selection to include
	// entering elements; so, operations on the update selection after appending to
	// the enter selection will apply to both entering and updating nodes.
	text.attr("x", function(d, i) { return i*32; })
	
	//EXIT
	// Remove old elements as needed
	text.exit().remove();
}

//Ghe initial alphabel display
update(alphabet);

//Grab a random sample of letters from the alphabet, in alphabetical order.
setInterval(function() {
	update(shuffle(alphabet)
		   .slice(0, Math.floor(Math.random() * 26))
		   .sort());
}, 1500);

//Shuffles the input array
function shuffle(array) {
	var m= array.length, t, i;
	while (m) {
		i = Math.floor(Math.random() * m--);
		t = array[m], array[m] = array[i], array[i]= t;
	}
	return array;
}
