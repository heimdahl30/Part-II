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

export default Display