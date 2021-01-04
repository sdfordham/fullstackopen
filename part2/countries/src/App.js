import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div>
      find countries <input value={props.value} onChange={props.onChange}/>
  </div>
  )
}

const Countries = (props) => {
  const [showProfile, setShowProfile] = useState([])
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
        <Profile data={countries[0]}/>
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
              {showProfile.indexOf(country.name) >= 0 ? <Profile data={country}/> : null}
            </li>)
          }
        </ul>
      </div>
    )
  }
}

const Profile = (props) => {
  const country = props.data
  console.log(country)
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
      <Countries search={_filter} data={data} />
    </div>
  )
}

export default App 