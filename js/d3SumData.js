d3.csv("offersAppointment.csv", function(error, data) {
	data.forEach(function(d) {
		d.value = +d.value;
	});
	var total = d3.nest()
		//.key(function(d) { return d.keyColumn})  //For this particular example I don't have a key column.
		.rollup(function(d) {
			return d3.sum(d, function(g) { return g.value; })
		}).entries(data);
	console.log(JSON.stringify(total));
});