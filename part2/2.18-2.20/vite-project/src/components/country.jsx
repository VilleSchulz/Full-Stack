
const Country = ({countryList}) => {


    if (countryList.length > 1) {
        return (
            <ul>
                {countryList.map(c => (
                    <li key={c.name.common}>{c.name.common}</li>
                ))}
            </ul>
        )
    }

    const country = countryList[0]

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
        </>

    )
}
export default Country


