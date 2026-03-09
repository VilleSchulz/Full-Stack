
import { useEffect, useState } from 'react'
import weatherService from '../services/weather'
const Weather = ({ latlng }) => {

    const [weather, setWeather] = useState(null)

    useEffect(() => {
        if (latlng) {
            weatherService.getWeather(latlng[0], latlng[1]).then(returnedWeather => {
                setWeather(returnedWeather)
            }).catch(error => console.log("Error fetching weather: " + error))
            console.log("Weather: " + weather)
        }

    }, [latlng])
    if (!weather) {
        return <p>Loading weather...</p>
    }
    const temp = weather.main?.temp 
    const wind = weather.wind?.speed 
    const iconCode = weather.weather?.[0]?.icon
    const iconUrl = iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : null
    return (
        <>
            <p>Temperature: {temp} C</p>
            <img src={iconUrl} alt="Weather icon" />
            <p>Wind: {wind} m/s</p>
        </>)




}
export default Weather