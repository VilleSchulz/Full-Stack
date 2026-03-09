import { useEffect, useState } from 'react'
import countryService from './services/countries'
import './App.css'
import Country from './components/country'
import weatherService from './services/weather'

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [currentCountries, setCurrentCountries] = useState([])



  useEffect(() => {
    countryService.getAll().then(returnedCountries => {
      setCountries(returnedCountries)
    }).catch(error => console.log("Error fetching: " + error))

  }, [])





  useEffect(() => {
    const filtered = countries.filter(country => country.name?.common?.toLowerCase().includes(search.toLowerCase()))
    setCurrentCountries(filtered)
  }, [search, countries])


  return (
    <>
      <span>find countries</span>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Type a country name' />
      <div>
        {search.length === 0 ? null :
          currentCountries.length === 0 ?
            <p>No countries found</p> :
            currentCountries.length > 10 ?
              <p>Too many matches, please be more specific</p> :
              <Country countryList={currentCountries}/>
        }
      </div>


    </>
  )
}

export default App
