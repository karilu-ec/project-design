;( function( d3 ) {
	//grab container	
	var d3container = d3.select(".container");
	//append svg
	var svg = d3container.append("svg");
	//append group of elements to include some circles
	var dots = svg.append("g");
	
	//create loop to append some circle
	for ( var i=1; i<= 5; i++) {
		//transitioning text
		dots.append("text")
			.text(0)
			.attr("text-anchor", "middle")
			.attr("x", 150)
			.attr("y", i*25)
			.on('mouseenter', function() {
				d3.select(this)
					.transition()
					.tween("text", tweenText(50));
			})
			.on("mouseleave", function() {
				d3.select(this)
					.transition()
					.tween("text", tweenText(10));
			})
			.transition()
			.delay(300*i)
			.tween("text", tweenText(10));
	}
	
	/**
	 * Tween Functions
	 */
	function tweenText(newValue) {
		return function() {
			//get the current value as starting point for the tween animation
			var currentValue = +this.textContent;
			//create interpolator and do not show nasty floating numbers
			var i = d3.interpolateRound(currentValue, newValue);
			
			//this returned function will be called a couple of times to animate
			//anything you want inside of your custom tween
			return function(t) {
				//set the new value to current text element
				this.textContent = i(t);
			};
		}	
	}
})(d3);