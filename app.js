const express = require("express");
const https = require("https");
// const { stringify } = require("querystring");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
    // 
})
app.post("/", function (req, res) {
    // console.log(JSON.stringify(weatherData));})


    const query = req.body.cityName;
    const unit = "metric";
    const apiKey = "f5179aae7ef63529ff6955f09e413552";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, function (response) {
        console.log(response.statusCode)
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            // const temp=;
            const weatherDataDescription = weatherData.weather[0].icon;
            res.write("<h1>Weather of "+query+" is- ");
            res.write(weatherData.weather[0].description + "</h1>");
            const icon = weatherData.weather[0].icon;
            const iconLocation = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<img src=" + iconLocation + ">");
            // res.write(iconLocation);
            // https.get(iconLocation, function (response2) {
            // response2.write(iconLocation);})
            // console.log(temp);//weather is actually array so [0]
            res.send();
            // const object={ 
            //     name:"Prakhar",
            //     favouritefood:"vada pav"
        });
    });


})
app.listen(3000, function () { console.log("server running on port 3000."); })