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

export default Errormessage