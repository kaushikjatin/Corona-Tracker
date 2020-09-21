var height=600;
var width=600;
var padding=90;


d3.select("svg")
	.attr("height",height)
	.attr("width",width)

var tooltip=d3.select('body')
.append("div")
.classed("tooltip",true);

function showtooltip(d,i,node)
{
		tooltip.style("opacity",1)
		.style("left",node.x - tooltip.node().offsetWidth/2 -5 +"px")
		.style("top",node.y+25+"px")
		.html(
			`
			<p>Date: ${cases[i].Date}</p>
			<p>Total Cases: ${cases[i].TotalCases}</p>
			<p>Total Deaths: ${deaths[i].TotalDeaths}</p>
			<p>Total Recovery: ${recovered[i].TotalCases}</p>
			`)
}




var scalex=d3.scaleTime()
		.domain([new Date(2020,5,1),new Date(2020,8,12)])
		.range([padding,width-padding])



var scaley=d3.scaleLinear()
		.domain([0,35000000])
		.range([height-padding,padding])



drawbubblegraph(cases,"cases","TotalCases","Red");
drawbubblegraph(deaths,"deaths","TotalDeaths","#ccc");
drawbubblegraph(recovered,"recovered","TotalCases","Green");


var xaxis=d3.axisBottom(scalex)
             .ticks(5);



var yaxis=d3.axisLeft(scaley)


d3.select("svg")
	.append("g")
	.attr("transform","translate(0,"+(height-padding)+")")
	.call(xaxis);


d3.select("svg")
.append("g")
.attr("transform","translate("+padding+",0)")
.call(yaxis);


d3.select("svg")
	.append("text")
	.attr("x",width/2)
	.attr("y",height-padding)
	.attr("dy","3.5em")
	.style("text-anchor","middle")
	.text("-------------Month-------------->")



	d3.select("svg")
	.append("text")
	.attr("y",padding)
	.attr("x",-height/2)
	.attr("dy","-4.5em")
	.attr("transform","rotate(-90)")
	.style("text-anchor","middle")
	.text("------------Corona Figures------------>")


function drawbubblegraph(arr,thisclass,object,color)
{
	d3.select("svg")
	.selectAll("."+thisclass)
	.data(arr)
	.enter()
	.append("circle")
	.classed(thisclass,true)
	.on('mousemove',changeradius1)
	.on('touchstart',changeradius1)
	.on('mouseout',changeradius2)
	.on('touchend',changeradius2)
	.transition()
	.duration(1500)
	.attr("cx",d => {
		month=parseInt(d.Date.substring(0,1))-1
		date=parseInt(d.Date.substring(2,4).replace("/",""))
		//console.log(d.Date.substring(0,1)+" "+d.Date.substring(2,3)+" "+month+" "+date);
		return scalex(new Date(2020,month,date));
	})
	.attr("cy",d =>scaley(d[object]))
	.attr("r",5)
	.attr("fill",color)
    .attr("stroke","#000")
    .attr("stroke-width","1.9")
}

function changeradius1(d,i)
{
	var x,y;
	x=d3.event.x;
	y=d3.event.y;
	d3.select(this).attr("r",12)
	showtooltip(d,i,d3.event);

}

function changeradius2()
{
	var x,y;
	x=d3.event.x;
	y=d3.event.y;
	d3.select(this).attr("r",5)
	tooltip.style("opacity",0)
}