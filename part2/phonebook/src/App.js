import React, { useState, useEffect } from 'react'
import personService from './services/phonebook'

const Filter = (props) => {
  const handleFilterChange = (event) => {
    props.setFilter(event.target.value)
  }
  return (
    <div>
      filter shown with <input value={props.value} onChange={handleFilterChange}/>
  </div>
  )
}

const PersonForm = (props) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const addName = (event) => {
    event.preventDefault()
    const names = props.persons.map((person) => person.name)
    if(names.indexOf(newName) >= 0) {
      window.alert(newName + ' is already added to phonebook.')
    }
    else {
      const newPerson = {name: newName, number: newNumber}
      props.setPersons(props.persons.concat(newPerson))
      personService.create(newPerson)
                   .then(response => {console.log(response)})
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Numbers = (props) => {
  const search = props.search
  var persons = props.persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <div>
      <ul>
        {persons.map(person =>
          <li key={person.name}>{person.name} {person.number}</li>)
        }
      </ul>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService.getAll()
                 .then(response => {setPersons(response.data)})
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter value={filter} setFilter={setFilter} />

      <h2>Add a new</h2>

      <PersonForm persons={persons} setPersons={setPersons} />

      <h2>Numbers</h2>
       
      <Numbers persons={persons} search={filter} />
    </div>
  )
}

export default App