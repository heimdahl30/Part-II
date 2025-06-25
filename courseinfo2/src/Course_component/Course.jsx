const Course = (props) => {
  return (
    <> 
<Header courses = {props.courses} />
</>

  )
}

const Header = (props) => {
  return (
    <>
  {props.courses.map((item) => {

    return (
    
      <div key = {item.id}>

      <h1>{item.name}</h1>
      <div><Content item={item} /> </div>
      <div><Total item = {item} /></div>

      </div>
    )
  }
  )}
   </>
  )
}

const Content = (props) => {
  return (
    <>
    {props.item.parts.map((part) => {
      return (
      <Part key = {part.id} name = {part.name} exercises = {part.exercises} />
      )
    })}
    </>
  )
}

const Part = (props) => {
  
  return (
  <>
  <p>{props.name} {props.exercises}</p>
  </>
)
}


const Total = (props) => <p><strong>total of {props.item.parts.map((item) => item.exercises).reduce((sum, num) => sum + num, 0)} exercises</strong></p>


export default Course