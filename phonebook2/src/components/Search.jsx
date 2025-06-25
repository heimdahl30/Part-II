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

export default Search