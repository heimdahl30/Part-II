import { useState, useEffect } from 'react'

import axios from 'axios'


const Search = ({searching, searchName, handleSearchNameChange, displaySearchedName}) => {

  
 console.log(displaySearchedName)


if (displaySearchedName.length === 0){
  return (
    <>
    <form onSubmit = {searching}>
      <div>Search by name <input value = {searchName} onChange = {handleSearchNameChange} placeholder='Name here' /></div>
      <button type = "submit">Search</button>
      <p>Not in the list</p>
      </form>
    </>
  )
}

else if (displaySearchedName.length === 1) {
  return (
    <>
    <form onSubmit = {searching}>
      <div>Search by name <input value = {searchName} onChange = {handleSearchNameChange} placeholder='Name here' /></div>
      <button type = "submit">Search</button>
      </form>
      
    {displaySearchedName.map((person) => {
      return (
        <div key = {person.name}>
          Found: {person.name} {person.number}
        </div>
      )
    })}
    </>
  )
}

else if (displaySearchedName.length > 1) {
  return (
    <>

      <form onSubmit = {searching}>
      <div>Search by name <input value = {searchName} onChange = {handleSearchNameChange} placeholder='Name here' /></div>
      <button type = "submit">Search</button>
      </form>


    </>
  )
}

}


const Addnewpeople = ({addName, handleNameChange, handleNumberAddition, newName, newNumber}) => {

  return (
    <>
    <form onSubmit = {addName}>
        <div>
          name: <input value = {newName} onChange = {handleNameChange}/>
        </div>
        <div>
          number: <input value = {newNumber} onChange = {handleNumberAddition} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    
    </>
  )

}

const Display = ({persons}) => {

  return (
    <>
    {persons.map((item) => {
        return (

          <p key = {item.name}>{item.name} {item.number}</p>

        )
      })
      }
    </>
  )
}


const App = () => {


useEffect(() => {
  axios.get("http://localhost:3001/persons")
  .then(response => {
    setPersons(response.data)
  } ) }, [])


  const [persons, setPersons] = useState([])


  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const duplicateNameArray = persons.filter((person) => person.name === newName)

  const addName = (event) => {
    event.preventDefault()

    if (duplicateNameArray.length === 0)
      {
    setPersons(persons.concat([{name: newName, number: newNumber}]))
    
      }

      else{
        alert(`${newName} is already added to the phonebook`)
      }

  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberAddition = (event) => {
    setNewNumber(event.target.value)
  }



  const [searchName, setSearchName] = useState('')

  const [displaySearchedName, setdisplaySearchedName] = useState([1, 2])

   const handleSearchNameChange = (event) => {
    setSearchName(event.target.value)
  }

  const searching = (event) => {

    event.preventDefault()
    const searchArray = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))

    if (searchArray.length > 0){
    setdisplaySearchedName(searchArray)
    console.log(displaySearchedName)
    }
    else if (searchArray.length === 0){
      setdisplaySearchedName([])
    }
  }
 

  
  return (
    <div>
      <h2>Phonebook</h2>
      <Search searching = {searching} searchName = {searchName} handleSearchNameChange = {handleSearchNameChange} displaySearchedName = {displaySearchedName}/>

      <h2>Add a new</h2>
      <Addnewpeople addName ={addName} handleNameChange = {handleNameChange} handleNumberAddition = {handleNumberAddition} newName = {newName} newNumber = {newNumber}/>

      <h2>Numbers</h2>
      <Display persons = {persons} />
      
    </div>
  )
}




export default App