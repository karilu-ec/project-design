d3.csv("maleFemalePortrait.csv", function(data) {
  data.forEach(function(d) {    
    d.quantity= +d.quantity;
  });  
    
   var expensesByName = d3.nest()
    .key(function(d) { return d.name; })
    .entries(expenses);
    
    //count items by name
    var expensesCount = d3.nest()
      .key(function(d) { return d.name; })
      .rollup(function(v) { return v.length; })
      .entries(expenses);      
    console.log(JSON.stringify(expensesCount));
    
    
    //Avg of amount by name
    var expensesAvgAmount = d3.nest()
      .key(function(d) { return d.name; })
      .rollup(function(v) { return d3.mean(v, function(d) { return d.amount ; }); })
      .entries(expenses);
    console.log(JSON.stringify(expensesAvgAmount));
    
    //Multiple metrics on my group.
    var expenseMetrics = d3.nest()
      .key(function(d) { return d.name; })
      .rollup(function(v) { return {
        count: v.length,
        total: d3.sum(v, function(d) { return d.amount; }),
        avg: d3.mean(v, function(d) {return d.amount; })
      }; })
      .entries(expenses);
      console.log(JSON.stringify(expenseMetrics));
      
    //map output
    var expensesTotal = d3.nest()
    .key(function(d) { return d.name; })
    .rollup(function(v) { return d3.sum(v, function(d) { return d.amount; }); })
    .map(expenses);
    console.log(JSON.stringify(expensesTotal));
});
