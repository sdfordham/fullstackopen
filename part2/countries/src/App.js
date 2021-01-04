import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div>
      find countries <input value={props.value} onChange={props.onChange}/>
  </div>
  )
}

const CountryList = (props) => {
  const [showProfile, setShowProfile] = useState([])
  if (props.search === '') {
    return (
      <div></div>
    )
  }
  const onClick = (country) => {
    if(showProfile.indexOf(country.name) >= 0) {
      setShowProfile(showProfile.filter(el => el !== country.name))
    }
    else {
      setShowProfile([...showProfile, country.name])
    }
  }
  const search = props.search
  const countries = props.data.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase())
  )
  if(countries.length === 1) {
    return (
      <div>
        <Profile country={countries[0]}/>
      </div>
    )
  }
  else if (countries.length > 10) {
    return (
      <div>
        <p>Too many matches.</p>
      </div>
    )
  }
  else {
    return (
      <div>
        <ul>
          {countries.map(country =>
            <li key={country.name}>
              {country.name} <input type="submit" value="show" onClick={() => onClick(country)} />
              {showProfile.indexOf(country.name) >= 0 ? <Profile country={country}/> : null}
            </li>)
          }
        </ul>
      </div>
    )
  }
}

const Profile = (props) => {
  return (
    <div>
      <CountryInfo country={props.country} />
      <WeatherInfo city={props.country.capital} />
    </div>
  )
}

const CountryInfo = (props) => {
  const country = props.country
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
      {country.languages.map(language =>
        <li key={language.name}>{language.name}</li>)
      }
      </ul>
      <img src={country.flag} alt="Country flag" width="150"></img>
    </div>
  )
}

const WeatherInfo = (props) => {
  const [weather, setWeather] = useState('')
  const url = 'http://api.weatherstack.com/current?access_key='
  + process.env.REACT_APP_API_KEY + '&query=' + props.city

  useEffect(() => {
    axios.get(url)
         .then(response => {setWeather(response.data)})
  }, [url])

  return (
    <div>
      <p>Weather in {props.city}</p>
      <p><b>Temperature:</b> {weather.current.temperature} celsius</p>
      <img src={weather.current.weather_icons[0]} alt="Country flag" width="150"></img>
      <p><b>Wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
    </div>
  )
}

const App = () => {
  const [data, setData] = useState([])
  const [_filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
         .then(response => {setData(response.data)})
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter value={_filter} onChange={handleFilterChange} />
      <CountryList search={_filter} data={data} />
    </div>
  )
}

export default App 