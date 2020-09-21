var express=require("express");
var bodyparser=require('body-parser');
var app=express();
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res)
{
    res.sendFile('public/corona_info.html', { root: __dirname });
})

app.get("/bubblechart",function(req,res)
{
    res.sendFile('public/bubblechart/bubblechart1.html', { root: __dirname });
})

app.get("/bubblechart",function(req,res)
{
    res.sendFile('public/bubblechart/bubblechart1.html', { root: __dirname });
})

app.get('/worldmap',function(req,res)
{
    res.sendFile('public/worldmap/worldmap1.html', { root: __dirname });
})

app.get('/scatterplot',function(req,res)
{
    res.sendFile('public/scatterplot/scatterplot1.html', { root: __dirname });
})

app.get('/linegraph',function(req,res)
{
    res.sendFile('public/linegraph/linegraph1.html', { root: __dirname });
})
app.listen("3000");



