import { useEffect, useState } from 'react'

import Weather from './weather'
const Country = ({ countryList }) => {

    const [selectedCountry, setSelectedCountry] = useState(null)

    useEffect(() => {
        setSelectedCountry(null)
    }, [countryList])

    const showCountry = (country) => {

        return (
            <>
                <h1>{country.name.common}</h1>
                <p>capital: {country.capital}</p>
                <p>Area: {country.area}</p>
                <h2>Languages</h2>
                <ul> {Object.values(country.languages).map(language =>
                    <li key={language}>{language}</li>
                )}</ul>
                <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
                <Weather latlng={country.latlng} />
            </>

        )

    }


    if (countryList.length > 1) {
        return (
            <div>
                <ul>
                    {countryList.map(c => (
                        <div key={c.name.common}>
                            <li>{c.name.common}</li>
                            <button onClick={() => setSelectedCountry(c)}>Show Details</button>
                        </div>
                    ))}
                </ul>
                {selectedCountry && showCountry(selectedCountry)}
            </div>
        )
    }


    if (countryList.length === 1) {
        return showCountry(countryList[0])

    }
    return null
}
export default Country


