var input=d3.select("input")
.property("min",12)
.property("max",20)
.property("value",15)


var height=350;
var width=550;
var padding=65;

makescatterplot(15)


input.on('input',function()
	{
		makescatterplot(+d3.event.target.value)
	})

var tooltip=d3.select('body')
.append("div")
.classed("tooltip",true);



function showtooltip(d)
{
	tooltip.style("opacity",1)
	.style("left",d3.event.x - tooltip.node().offsetWidth/2 +"px")
	.style("top",d3.event.y+ 25 +"px")
	.html(
		`
		<p>Country: ${d.location}</p>
		<p>Total Cases: ${d.total_cases.toLocaleString()}</p>
		<p>Population: ${d.population.toLocaleString()}</p>
		<p>Total Tests: ${d.total_tests.toLocaleString()}</p>
		<p>Date: ${d.date}</p>
		`)
}


function makescatterplot(month)
{
	month=month%12;
	if(month==0)
		month=12

	var newdata=coronadata.filter(d=>parseInt(d.date.substr(5,7))===month);


	d3.selectAll("g")
	.remove();

	d3.selectAll("text")
	.remove();
  

    var scalex=d3.scaleLinear()
    			.domain(d3.extent(newdata,d=>d.total_deaths))
    			.range([padding,width-padding])

    if(d3.extent(newdata,d=>d.total_deaths)[1]==0)
    	scalex.domain([0,100])


    var scaley=d3.scaleLinear()
    			.domain(d3.extent(newdata,d=>d.total_cases))
    			.range([height-padding,padding])


    var colorscale=d3.scaleLinear()
    			.domain(d3.extent(newdata,d=>d.total_tests))
    			.range(["Red","Green"])


    var scaleradius=d3.scaleLinear()
    			.domain(d3.extent(newdata,d=>d.population))
    			.range([15,30])


    var xaxis=d3.axisBottom(scalex)
             .tickSize(-1*(height-2*padding))
             .tickSizeOuter(0);
	var yaxis=d3.axisLeft(scaley)
	          .tickSize(-1*(width-2*padding))
	          .tickSizeOuter(0);


	var oldcircles=d3.select("svg")
	.selectAll('circle')
	.data(newdata,d=>d.location);


	oldcircles
	.exit()
	.remove();


	var newcircles=oldcircles
	.enter()
	.append("circle");




	oldcircles.merge(newcircles)
	.on('mousemove',showtooltip)
	.on('touchstart',showtooltip)
	.on('mouseout',function(){
		tooltip.style("opacity",0)
	})
	.on('touchend',function(){
		tooltip.style("opacity",0)
	})
	.transition()
	.duration(1500)
	.attr("cx",d=>scalex(d.total_deaths))
	.attr("cy",d=>scaley(d.total_cases))
	.attr("r",d=>scaleradius(d.population))
	.attr("fill",d=>colorscale(d.total_tests))
	.attr("stroke","#ccc")


	d3.select("svg")
	.append("g")
	.attr("transform","translate(0,"+(height-padding)+")")
	.call(xaxis);


	d3.select("svg")
	.append("g")
	.attr("transform","translate("+padding+",0)")
	.call(yaxis);



   d3.select('g')
   .select("text")
   .attr("visibility","hidden");


    var dob = new Date(newdata[0].date);
	var dobArr = dob.toDateString().split(' ');
	var dobFormat = dobArr[2] + ' ' + dobArr[1] + ' ' + dobArr[3];

	d3.select("svg")
	.append("text")
	.attr("x",width/2)
	.attr("y",height-padding)
	.attr("dy","1.5em")
	.style("text-anchor","middle")
	.text("Deaths till "+dobFormat)



	d3.select("svg")
	.append("text")
	.attr("y",padding)
	.attr("x",-height/2)
	.attr("dy","-3.2em")
	.attr("transform","rotate(-90)")
	.style("text-anchor","middle")
	.text("Total Cases till "+dobFormat)
}