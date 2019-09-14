const request = require('request') 

const geocode = (location, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(location) + ".json?access_token=pk.eyJ1IjoiY2hyaXNrb2l2dSIsImEiOiJjazAzenY5amwyZWVkM2NraW9xYTdmN2N1In0.8JcGxYB5JvQdRxOLOqR9dw"

    request(
        { url, json: true },
        (error, {body}) => {
            if (error) {
                callback(('Unable to connect to Geocode Service!'), undefined)
            } else if (body.features.length === 0) {
                callback(('Location not found. Please try again'), undefined)
            } else {
                callback(undefined,
                    data = {
                        location: body.features[0].place_name,
                        latitude: body.features[0].center[1],
                        longitude: body.features[0].center[0]
                    }
                )
            }
        }
    )
}

module.exports = geocode