const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const ejs = require("ejs");
const _=require("lodash");

const app=express();
app.set('view engine', 'ejs'); 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){

res.render("index")
    
})

app.post("/", function(req, res){
    const city = req.body.city;
    const apiId="acf0bb16f2620216a5310f3ce19bc1ff";
    const units=req.body.units
    
    const url="https://api.openweathermap.org/data/2.5/weather?appid="+apiId+"&q="+city+"&units="+units;

    https.get(url, function(response){
        console.log(res.statusCode);
        response.on("data", function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const icon=weatherData.weather[0].icon;
            const description=weatherData.weather[0].description
            const country=weatherData.sys.country
            const flag="https://flagsapi.com/"+country+"/flat/64.png"
            const imgUrl= " https://openweathermap.org/img/wn/"+ icon +"@2x.png"
            const sendCity=_.capitalize(city);
            var sendUnits="";
            if(units==="metric"){
                sendUnits="Celcius";
            }else if(units==="imperial"){
                sendUnits="Farenheit";
            }else{
                sendUnits="Kelvin";
            }
            console.log(temp);
            //pass the data using ejs and send a new ejs file, as simple as that
            res.render("display", {unitsDisplay: sendUnits, cityDisplay: sendCity, temperature:temp, imgDisplay: imgUrl, descriptionWeather: description, countryDisplay: flag});
            // res.write("<h1>The temp in "+city+" is "+temp+"</h1>");
            // res.write("<img src="+imgUrl+">");
            // res.send();
        })
    })
})
app.get("/contact", function(req,res){
  res.render("contact")
})
app.get("/about", function(req,res){
  res.render("about")
})
app.post("/display", function(req, res){
    res.render("index")
})
app.listen(3000, function(){
    console.log("running");
})