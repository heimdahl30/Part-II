import { useState, useEffect } from 'react'

import backend from "./Phonebook/backend"


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

const Addnewpeople = ({addName, handleNameChange, handleNumberAddition, name, number}) => {

  return (
    <>
    <form onSubmit = {addName}>
        <div>
          name: <input value = {name} onChange = {handleNameChange}/>
        </div>
        <div>
          number: <input value = {number} onChange = {handleNumberAddition} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const Display = ({persons, handleContactDeletion}) => {

  return (

      <>
    
    {persons.map((item) => {
      console.log(item.id)
      console.log(item.name)

        return (

          <div key = {item.id}>
          
          <p>{item.name} {item?.number}  <button onClick = {() => {


            if (window.confirm(`Delete ${item.name}?`))
              {
              return handleContactDeletion(item.id)
            }

           }}>delete</button> </p>
          
          </div>
          
        )
    })  
      }

      </>
    
  )
}

const Displaymessage = ({message}) => {

  if (message === null){
    return null
  }

  else {

return (

<div className = "msg">

<p>{message}</p>

</div>
)
  }
}


const Errormessage = ({message}) => {

  if (message === null){
    return null
  }

  else {

return (

<div className = "errmsg">

<p>{message}</p>

</div>
)
  }
}



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

        backend.updateData(`http://localhost:3001/persons/${changeNumber[0].id}`, updateData)
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
  } ) }, [])


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