;( function( d3 ) {
	//grab container	
	var d3container = d3.select(".container");
	//append svg
	var svg = d3container.append("svg");
	//append group of elements to include some circles
	var dots = svg.append("g");
	
	//create loop to append some circle
	for ( var i=1; i<= 5; i++) {
		//append circle
		dots.append("circle")
			.attr("r", 0) //set radius to '0' because we want to animate it later on
			.attr("cx", 150) //center it horizontally kind of
			.attr("cy", i * 25) //different y position
			.on("mouseenter", function() { //add event handler
				d3.select(this)
					.transition() //add transition
					.attr("r", 10); //change attribute
			})
			.on("mouseleave", function() { //ad event handler
				d3.select(this)
					.transition() //add transition
					.attr("r", 6);
			})
			.transition() //add transition for kick off
			.delay(200*i) //add delay so that it looks nic
			.attr("r", 6); //set radius to wished size
		
		
	}
})(d3);