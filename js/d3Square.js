//Tutorial: http://blog.visual.ly/creating-animations-and-transitions-with-d3-js/
var width = 500;
var height = 300;
var margins= {top:50, right:40, bottom:30, left:50};

var svg = d3.select("#chart")
    .append("svg")
        .attr("width", width + margins.right + margins.left)
        .attr("height", height + margins.top + margins.bottom)
    .append("g")
        .attr("transform", "translate(" + margins.top + "," + margins.left + ")");

var mySquare = svg.append("rect")
    .attr("x", 60)
    .attr("y", 60)
    .attr("width", 60)
    .attr("height", 60);

//Transition moves it on x
var button = d3.select("#transition");
button.on("click", function() {
    mySquare
        .transition()
        .duration(1000) //half of a second
        .delay(100) //0.1
        .ease("elastic")
        .attr("x", 320)
        .each("end", function() { //after the first transition is done
            d3.select(this) //transition on this element
                .transition()
                .attr("y", 180); //move down
        })
});

//It will make it bigger
var button2 = d3.select("#transition2");
button2.on("click", function() {
   mySquare
    .transition()
    .attr("width", 120)
    .duration(1000)
    .each("end", function() {
        d3.select(this)
            .remove();
    });
});

mySquare
    .transition()
    .attr("fill", "blue");