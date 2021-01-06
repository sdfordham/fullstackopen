import React, { useState, useEffect } from 'react'
import phoneService from './services/phonebook'

const Message = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="success">
      {message}
    </div>
  )
}

const Filter = (props) => {
  const handleFilterChange = (event) => {
    props.setFilter(event.target.value)
  }
  return (
    <div>
      filter shown with <input value={props.filter} onChange={handleFilterChange}/>
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
      if (window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
        )) {
        const toUpdate = props.persons.find(el => el.name === newName)
        toUpdate['number'] = newNumber
        phoneService.update(toUpdate)
        props.setPersons(
          props.persons.map(el => el.name === toUpdate.name ? toUpdate : el)
        )
        props.setMessage(`Number changed for ${newName}`)
        setTimeout(() => {props.setMessage(null)}, 5000)
        setNewName('')
        setNewNumber('')
      }
    }
    else {
      const newPerson = {name: newName, number: newNumber}
      phoneService.create(newPerson)
                  .then(response => {
                    props.setPersons(
                      props.persons.concat(
                        {...newPerson, id: response.data.id}
                      )
                    )
                  })
      props.setMessage(`Added ${newName}`)
      setTimeout(() => {props.setMessage(null)}, 5000)
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

const Delete = (props) => {
  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
    phoneService.remove(person.id)
    props.setPersons(props.persons.filter(el => el !== person))
    }
  }
  const toDelete = props.persons.find(el => el.id === props.id)
  return (
    <button type="submit" onClick={() => handleDelete(toDelete)}>Delete</button>
  )
}

const Numbers = (props) => {
  var persons = props.persons.filter(person =>
    person.name.toLowerCase().includes(props.filter.toLowerCase())
  )

  return (
    <div>
      <ul>
        {persons.map(person =>
          <li key={person.name}>
            {person.name} {person.number} <Delete
                                           id={person.id}
                                           persons={props.persons}
                                           setPersons={props.setPersons} />
          </li>
        )}
      </ul>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    phoneService.getAll()
                .then(response => {setPersons(response.data)})
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>

      <Message message={message} />

      <Filter filter={filter} setFilter={setFilter} />

      <h2>Add a new</h2>

      <PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage} />

      <h2>Numbers</h2>
       
      <Numbers persons={persons} setPersons={setPersons} filter={filter} />
    </div>
  )
}

export default App