const axios = require("axios");

// const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=47.6062&lon=122.3321&appid=${process.env.API_WEATHER}&units=imperial`


module.exports = (app) => {

let lon,lat;
let cityname;

	app.post('/weather', (req, res) => {

		// lon = req.body.longitude;
        // lat = req.body.latitude;
        cityname = req.body.city;

		res.redirect('weather');
		
	})

app.get("/weather", (req,res) => {
    
    //const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?${lon}&${lat}&appid=${process.env.API_WEATHER}&units=imperial`
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?${cityname}&appid=${process.env.API_WEATHER}&units=imperial`

    axios.get(weatherUrl)
    .then((response) => {
        console.log(response.data)
        const weatherInfo = response.data.main.temp;
        res.json(weatherInfo)       
       //res.json("test")
    })
    .catch((err) => {
        console.log(err)
    })
})
}