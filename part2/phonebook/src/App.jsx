import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import './index.css'

// Filter component
const Filter = ({ value, onChange }) => (
  <div>
    filter shown with <input value={value} onChange={onChange} />
  </div>
)

// PersonForm component
const PersonForm = ({
  onSubmit,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange
}) => (
  <form onSubmit={onSubmit}>
  <table>
    <tbody>
      <tr>
        <td>name: </td>
        <td>
          <input value={newName} onChange={handleNameChange} />
        </td>
      </tr>
      <tr>
        <td>number: </td>
        <td>
          <input value={newNumber} onChange={handleNumberChange} />
        </td>
        <td></td>
        <td></td>
        <td>
          <button type="submit">ADD</button>
        </td>
      </tr>
    </tbody>
  </table>
</form>
)



// Persons component
const Persons = ({ persons, handleDelete }) => (
  <table>
    <tbody>
      {persons.map(person => (
        <tr key={person.id}>
          <td>{person.name}</td>
          <td>{person.number}</td>
          <td>
            <button onClick={() => handleDelete(person.id)}>DELETE</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)
const Message = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="notification">
      {message}
    </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(()=>{
    personService
      .getAll()
      .then(persons=>{
      setPersons(persons)
    })
  },[])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setSearch(event.target.value)

  const handleDelete = (id) => {
    if (window.confirm(`Delete ${persons.find((person)=>person.id === id).name}?`)) {
      
      personService
        .deletion(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setMessage(`${persons.find((person)=>person.id === id).name} deleted successfully`)
          setTimeout(() => {setMessage(null)}, 5000)
        })
        .catch(error => {
          alert('Error deleting person')
          console.error(error)
        })
    }
  }

  const handleUpdate = (id, newPerson) => {
    personService
      .update(id, newPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setMessage(`${returnedPerson.name}'s number updated successfully`)
        setTimeout(() => {setMessage(null)}, 5000)
      })
      .catch(error => {
        alert('Error updating person')
        console.error(error)
      })
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    if (!newName.trim() || !newNumber.trim()) {
      alert('Both name and number are required')
      return
    }
    if (persons.some(person => person.name === newName.trim()) && !persons.find(person => person.number === newNumber)) {
      if (window.confirm(`${newName.trim()} is already added to phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find(person => person.name === newName.trim())
        const updatedPerson = { ...personToUpdate, number: newNumber }
        handleUpdate(personToUpdate.id, updatedPerson)
        setNewName('')
        setNewNumber('')
      }
      return
    }
    if (persons.some(person => person.number === newNumber)) {
      const phoneHolder = persons.find(person => person.number === newNumber).name
      alert(`${newNumber} is ${phoneHolder}'s phone number`)
      setNewNumber('')
      return
    }
    const newId = Math.max(...persons.map(person => person.id)) + 1
    const newPerson = { name: newName.trim(), number: newNumber, id: newId.toString() }
    personService
      .create(newPerson).then(person => {
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
      setMessage(`${person.name} added successfully`)
      setTimeout(() => {setMessage(null)}, 5000)
    }).catch(error => {
      console.error('Error adding person:', error)
    })
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <Message message={message}/>
      <Filter value={search} onChange={handleSearchChange} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={handleFormSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App