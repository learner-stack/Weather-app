const express = require('express');
const app = express()
const bodyparser = require('body-parser');
const request = require('request');
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
const apiKey='#############'; //API key
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'));


app.get('/',function(req,res){
  res.render('index',{weather:null,error:null});
});
app.post('/',function(req,response){
  let city = req.body.city;
  //console.log(city);
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  request(url,function(err,res,body){
    if(!err){
      let weather = JSON.parse(body);
      if(weather.main == undefined){
        response.render('index',{weather: null,error: 'Please enter a valid city Name'});
      }else{
        let displayweather = `Its ${weather.main.temp} degrees in ${weather.name}`;
        response.render('index',{weather: displayweather,error: null});
      }
    }

  });

})

app.listen(8080);
