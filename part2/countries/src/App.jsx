import { useState, useEffect } from 'react'
import axios from 'axios'
const api_key = import.meta.env.VITE_WEATHER_API_KEY

const CountryDetail = ({ country , temp, wind, icon }) => (
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
    <h2>{`Wheather in ${country.name.common}`}</h2>
    <p>temperature: {temp} °C</p>
    {icon && (
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt="weather icon"
            />
          )}
    <p>wind: {wind} m/s</p>
  </div>
)

const CountryList = ({ countries, handleShow }) => (
  <>
    <table>
    <tbody>
      {countries.map(country => (
        <tr key={country.name.common}>
          <td>{country.name.common}</td>
          <td>
            <button onClick={() => handleShow(country.name.common)}>show</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  </>
)

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [temp, setTemp] = useState(null)
  const [wind, setWind] = useState(null)
  const [icon, setIcon] = useState(null)

  useEffect(() => {
    if (selectedCountry) {
      setTemp(null)
      setWind(null)
      const capital = selectedCountry.capital[0]
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
        )
        .then(response => {
          console.log(response.data)
          setTemp(response.data.main.temp)
          console.log(response.data.main.temp)
          console.log(temp)
          setWind(response.data.wind.speed)
          setIcon(response.data.weather[0].icon)
        })
    }
  }, [selectedCountry])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
  }, [])

  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  const handleShow = (name) =>{
    setSearch(name)
    setSelectedCountry(countries.find(country => country.name.common === name))
  }
  
  let content
  if (countriesToShow.length > 10) {
    content = <p>Too many matches, specify another filter</p>
  } else if (countriesToShow.length === 1) {
    if (!selectedCountry || selectedCountry.name.common !== countriesToShow[0].name.common) {
      setSelectedCountry(countriesToShow[0])
    }
    content = <CountryDetail country={countriesToShow[0] } temp={temp} wind={wind} icon={icon}/>
  } else if (countriesToShow.length === 0) {
    content = <p>No matches found</p>
  } else {
    content = <CountryList countries={countriesToShow} handleShow={handleShow} />
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
