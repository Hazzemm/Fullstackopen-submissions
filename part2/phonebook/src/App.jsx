import { useState, useEffect } from 'react'
import axios from 'axios'

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
    <div>
      name: <input value={newName} onChange={handleNameChange} />
      <br />
      phone: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

// Persons component
const Persons = ({ persons }) => (
  <>
    {persons.map(person => (
      <div key={person.id}>{person.name} {person.number}</div>
    ))}
  </>
)

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(()=>{
    axios
      .get('http://localhost:3001/persons')
      .then(response=>{
        console.log(response.data)
        setPersons(response.data)
      })
  },[])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setSearch(event.target.value)

  const handleFormSubmit = (event) => {
    event.preventDefault()
    if (!newName.trim() || !newNumber.trim()) {
      alert('Both name and number are required')
      return
    }
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return
    }
    if (persons.some(person => person.number === newNumber)) {
      const phoneHolder = persons.find(person => person.number === newNumber).name
      alert(`${newNumber} is ${phoneHolder}'s phone number`)
      setNewNumber('')
      return
    }
    const newId = Math.max(...persons.map(person => person.id)) + 1
    const newPerson = { name: newName, number: newNumber, id: newId }
    setPersons([...persons, newPerson])
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} onChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={handleFormSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App