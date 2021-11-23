const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const schedule = require('node-schedule');
const { onceEveryDay } = require('./services/timeRuleHandler');
const { getWeatherData } = require("./services/dataFetchHandler");

// Setting up express object
const app = express();
// Init dotenv
dotenv.config();

// adding some parameter to the express object regarding format.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// adding morgan to get print on incoming requests.
app.use(morgan("dev"));



app.get("/test", (res, req, next) => {
  
  
});

// Schuling jobs to fetch data
schedule.scheduleJob(onceEveryDay(), function(){
    // Getting weather data from public api
    console.log("Getting data " + Date())
    getWeatherData();
    
});
// getting the port from .env file
const port = process.env.PORT || 3000;
// running the server
app.listen(port, () => {
  console.log("Server started on port: " + port);
});

module.exports = app;
