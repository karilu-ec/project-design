/*d3.csv("cities.csv", function(data) {  
  data.forEach(function(d) {
    d.population = +d.population;
    d["land area"] = +d["land area"];
  });
  console.log(data[0]);
});*/

// Another way to accomplish the same thing above
/*d3.csv("cities.csv", function(d) {
  return {
    city: d.city,
    state: d.state,
    population: +d.population,
    land_area: +d["land area"]
  };
}, function(data) {
  console.log(data[0]);
});

d3.json("employees.json", function(data) {
  console.log(data[0]);
});*/
queue()
  .defer(d3.csv, "cities.csv")
  .defer(d3.tsv, "animals.tsv")
  .await(analyze);
function analyze(error, cities, animals) {
  if (error) {     console.log(error);  }
  console.log(cities[0]);
  console.log(animals[0]);
}

