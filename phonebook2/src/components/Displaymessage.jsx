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

export default Displaymessage