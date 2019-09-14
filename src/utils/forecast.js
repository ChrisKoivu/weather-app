const request = require('request')

 
const forecast = ({latitude, longitude, location}, callback) => {
    url = "https://api.darksky.net/forecast/9ce4eda3a4d782c805e85fc60af4eae5/" + latitude + "," + longitude + ""
   
    request(
        { url, json: true },
        (error, {body}) => {
            console.log(body.daily.data[0].temperatureHigh)
            if (error) {
                callback(('Unable to connect to Weather Service!'), undefined)
            } else if (body.error) {
                callback(('Unable to find location!'), undefined)
            } else {
               
                callback(undefined, 
                    {
                        
                        location,
                        'temperature': body.currently.temperature,
                        'precipitation': body.currently.precipProbability * 100,
                        'temperatureHigh' : body.daily.data[0].temperatureHigh,
                        'temperatureLow' : body.daily.data[0].temperatureLow,                       
                    })
                    
            }
        }
    )



}

module.exports = forecast
