var myData = [
	[15, 20],
	[40, 10],
	[30, 17]
];

var svg = d3.select("svg");

//First selection (within svg)
var selA = svg.selectAll("g")
			.data(myData);
selA.enter().append("g");
selA.attr("transform", function(d,i) {
	return "translate(70," + (i*100+50) + ")";
});
selA.exit().remove();

//Second selection (within first selection)
var selB = selA.selectAll("circle")
	.data(function(d) { return d; });
selB.enter().append("circle");
selB.attr("cx", function(d,i) { return i*80; })
	.attr("r", function(d,i) { return d; });
selB.exit().remove();	