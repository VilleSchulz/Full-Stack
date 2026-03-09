
const api_key = import.meta.env.VITE_SOME_KEY
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?"
const getWeather = (lat, lon) => {
    return fetch(`${baseUrl}lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`).then(response =>
        response.json())

}


export default { getWeather }