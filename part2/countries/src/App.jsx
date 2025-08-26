import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetail = ({ country }) => (
  <div>
    <h1>{country.name.common}</h1>
    <p>capital {country.capital}</p>
    <p>area {country.area}</p>
    <h2>languages:</h2>
    <ul>
      {Object.values(country.languages).map(language => (
        <li key={language}>{language}</li>
      ))}
    </ul>
    <img src={country.flags.png} alt="flag" width="200px" />
  </div>
)

const CountryList = ({ countries }) => (
  <>
    {countries.map(country => (
      <p key={country.name.common}>{country.name.common}</p>
    ))}
  </>
)

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
  }, [])

  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  let content
  if (countriesToShow.length > 10) {
    content = <p>Too many matches, specify another filter</p>
  } else if (countriesToShow.length === 1) {
    content = <CountryDetail country={countriesToShow[0]} />
  } else {
    content = <CountryList countries={countriesToShow} />
  }

  return (
    <div>
      <form>
        <label>find countries: </label>
        <input
          value={search}
          onChange={event => setSearch(event.target.value)}
        />
      </form>
      <div>{content}</div>
    </div>
  )
}

export default App
