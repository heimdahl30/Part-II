import { useState, useEffect } from 'react'
import backend from "./services/backend"
import Search from "./components/Search"
import Addnewpeople from "./components/Addnewpeople"
import Display from "./components/Display"
import Displaymessage from "./components/Displaymessage"
import Errormessage from "./components/Errormessage"

const App = () => { 
  
  const [persons, setPersons] = useState([])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [message, setMessage] = useState(null)
  const [errormsg, setErrorMsg] = useState(null)

  const duplicateNameArray = persons.filter((person) => person.name === name)

  const addName = (event) => {
    
    event.preventDefault()
    if (duplicateNameArray.length === 0)
      {
    
    const contactAdd = {
      name,
      number
    }
    backend.addData(contactAdd)
    .then(response => {
      console.log(response.data)
      console.log("Success")
      setMessage(`Added ${name}`)
      setTimeout(() => {setMessage(null)}, 5000)
    })

    backend.getData()
    .then(response => {
      setPersons(response.data)
    })
      }

      else{
       if (window.confirm(`${name} is already added to the phonebook, replace the old number with a new one?`)){

        const changeNumber = persons.filter((person) => person.name === name)

        
        console.log(name)
        console.log(number)

        const updateData = {

          
          name: name,
          number: number,
          id: changeNumber[0].id,

        }

        backend.updateData(`${changeNumber[0].id}`, updateData)
        .then(response => {
          console.log(changeNumber[0].id)
          setPersons(persons.map((person) => person.id === changeNumber[0].id ? {...person, number: number} : person))
          console.log(response.data)
          setMessage(`Number changed for ${name}`)
          setTimeout(() => {setMessage(null)}, 5000)
        })
        .catch(error => {
          console.log(error)
          setErrorMsg(`${name} has already been removed from the server`)
          setPersons(persons.filter((person) => person.id !== changeNumber[0].id ))
          setTimeout(() => {setErrorMsg(null)}, 5000)
        })
       }
      }
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleNumberAddition = (event) => {
    setNumber(event.target.value)
  }

  const [searchName, setSearchName] = useState('')
  const [displaySearchedName, setdisplaySearchedName] = useState([1, 2])

   const handleSearchNameChange = (event) => {
    setSearchName(event.target.value)
  }

  const searching = (event) => {
    event.preventDefault()
    const searchArray = persons.filter(person => (person.name).toLowerCase().includes(searchName.toLowerCase()))
    if (searchArray.length > 0){
    setdisplaySearchedName(searchArray)
    console.log(displaySearchedName)
    }
    else if (searchArray.length === 0){
      setdisplaySearchedName([])
    }
  }

  useEffect(() => {
  backend.getData()
  .then(response => {
    setPersons(response.data)
  }) }, [])


  const handleContactDeletion = (id) => {
    backend.deleteData(id)
    .then((response)=> {
      console.log(response)
    })
    .catch((error)=> {
      console.log(error)
    })

    setPersons(persons.filter((person) => person.id !== id ))

    }
  
  return (
    <div>
    <h2>Phonebook</h2>

      <Displaymessage message = {message} />

      <Errormessage message = {errormsg} />

      <Search searching = {searching} searchName = {searchName} handleSearchNameChange = {handleSearchNameChange} displaySearchedName = {displaySearchedName}/>

      <h2>Add a new</h2>
      <Addnewpeople addName ={addName} handleNameChange = {handleNameChange} handleNumberAddition = {handleNumberAddition} newName = {name} newNumber = {number}/>

      <h2>Numbers</h2>
      <Display persons = {persons} handleContactDeletion = {handleContactDeletion} />

    </div>

  )
}

export default App
