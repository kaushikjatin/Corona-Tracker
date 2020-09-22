window.onload = function()
{
	var height=500;
	var width=500;
	var padding=70;


	var scalex=d3.scaleTime()
			.domain([new Date(2020,5,1),new Date(2020,8,12)])
			.range([padding,width-padding])


	makelinegraph("Afghanistan");

	var select=d3.select("select");
	select.on("change",d => makelinegraph(d.target.value));


	function makelinegraph(country)
	{
		var temp=confirmed.filter(d=>d['Country/Region']==country);
		var data1=[];
		var keys=Object.keys(temp[0])
		for(var i=1;i<keys.length;i++)
		{
			var newobj={
				"Date":keys[i],
				"Figure":temp[0][keys[i]]
			}
			data1.push(newobj);
		}

	    
	    var scaley=d3.scaleLinear()
			.domain([0,d3.max(data1,d=>d.Figure)])
			.range([height-padding,padding])


		plotlinegraph(data1,"confirmed","red",scaley);

		var temp=deaths.filter(d=>d['Country/Region']==country);
		var data1=[];
		var keys=Object.keys(temp[0])
		for(var i=1;i<keys.length;i++)
		{
			var newobj={
				"Date":keys[i],
				"Figure":temp[0][keys[i]]
			}
			data1.push(newobj);
		}

		plotlinegraph(data1,"dead","#000",scaley);

		var temp=recovered.filter(d=>d['Country/Region']==country);
		var data1=[];
		var keys=Object.keys(temp[0])
		for(var i=1;i<keys.length;i++)
		{
			var newobj={
				"Date":keys[i],
				"Figure":temp[0][keys[i]]
			}
			data1.push(newobj);
		}

		plotlinegraph(data1,"recovered","green",scaley);



        d3.selectAll("g")
        .remove();

		xaxis=d3.axisBottom(scalex)
				.ticks(5)

		yaxis=d3.axisLeft(scaley);

		d3.select("svg")
		.append("g")
		.attr("transform","translate(0,"+(height-padding)+")")
		.call(xaxis);

		d3.select("svg")
		.append("g")
		.attr("transform","translate("+padding+",0)")
		.call(yaxis);


	    
	}

	function plotlinegraph(data,classname,stroke,scaley)
	{

		var oldlines=d3.select('svg')
		.attr("width",width)
		.attr("height",height)
		.selectAll("."+classname)
		.data(data.slice(1))


		var newlines=oldlines
		.enter()
		.append("line")
		.classed(classname,true);


		oldlines.merge(newlines)
		.transition()
		.duration(1000)
		.attr("x1",(d,i)=>{
			month=parseInt(data[i].Date.substring(0,1)) -1
			date=parseInt(data[i].Date.substring(2,4).replace("/",""))
			return scalex(new Date(2020,month,date));
		})
		.attr("y1",(d,i)=>scaley(data[i].Figure))
		.attr("x2",d=>{
			month=parseInt(d.Date.substring(0,1)) -1
			date=parseInt(d.Date.substring(2,4).replace("/",""))
			return scalex(new Date(2020,month,date));
		})
		.attr("y2",d=>scaley(d.Figure))
		.attr("stroke-width",'2')
		.attr("stroke",stroke)

	}
}