import React, { useState, useEffect } from 'react'
import personService from './services/phonebook'

const Filter = (props) => {
  return (
    <div>
      filter shown with <input value={props.value} onChange={props.onChange}/>
  </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.formSubmit}>
      <div>
        name: <input value={props.nameValue} onChange={props.nameOnChange}/>
      </div>
      <div>
        number: <input value={props.numberValue} onChange={props.numberOnchange}/>
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
  const [_filter, setFilter] = useState('') 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personService.getAll()
                 .then(response => {setPersons(response.data)})
  }, [])
  
  const addName = (event) => {
    event.preventDefault()
    const names = persons.map((person) => person.name)
    if(names.indexOf(newName) >= 0) {
      window.alert(newName + ' is already added to phonebook.')
    }
    else {
      const newPerson = {name: newName, number: newNumber}
      setPersons(persons.concat(newPerson))
      personService.create(newPerson)
                   .then(response => {console.log(response)})
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter value={_filter} onChange={handleFilterChange} />

      <h2>Add a new</h2>

      <PersonForm
        formSubmit={addName}
        nameValue={newName}
        nameOnChange={handleNameChange}
        numberValue={newNumber}
        numberOnchange={handleNumberChange}
      />

      <h2>Numbers</h2>
      
      <Numbers search={_filter} persons={persons} />
    </div>
  )
}

export default App