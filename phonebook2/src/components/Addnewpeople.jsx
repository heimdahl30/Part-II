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

export default Addnewpeople