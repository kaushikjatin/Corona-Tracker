var width = 900;
var height =600;



var projection=d3.geoMercator()
					.scale(130)
					.translate([width/2,height/1.5])


var path = d3.geoPath().projection(projection);


d3.select('svg')
  .attr('width', width)
  .attr('height', height)
  .selectAll('path')
  .data(topojson.feature(data,data.objects.countries).features)
  .enter()
  .append('path')
  .attr('d', path)


setcolors("total_cases")
var select=d3.select("select");

select.on("change",d => setcolors(d3.event.target.value));

function setcolors(val)
{
	var colorranges={
		total_cases:["#54CBF2","#007092"],
		total_tests:["red","green"],
		population:["white","purple"]
	}

	var colorscale=d3.scaleLinear()
					.domain([0,d3.max(data.objects.countries.geometries,d=>d.properties[val])])
					.range(colorranges[val])


	d3.selectAll("path")
	.transition()
	.duration(1000)
	.ease(d3.easeBackIn)
	.attr("fill",d=>colorscale(d.properties[val]))
}
      
