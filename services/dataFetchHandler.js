const { getRequest } = require("./requester");
const { storeWeatherData } = require("./firebaseHandler");
const { httpResponseCode } = require("../config");

function getWeatherData(){
    getRequest(
        "http://www.7timer.info/bin/api.pl?lon=55.377917&lat=13.246862&product=astro&output=json",
        (response, error) => {
          // if the request is not ok then handle the error.
          if (response.status != httpResponseCode.OK) {
            console.log("Error on getting weather data:");
            console.log(error);
            return;
          }
          // only taking the first 24 hour of the day.
          response.data.dataseries = response.data.dataseries.slice(1,8)
          
          // storing the weather data i got.
          storeWeatherData(response.data, (isSuccessful, weatherError) => {
            // on error or unsuccessful
            if (!isSuccessful && error) {
              console.log("Error on getting weather data:");
              console.log(weatherError);
              return;
            }
          });
        }
      );
}
module.exports = {getWeatherData}