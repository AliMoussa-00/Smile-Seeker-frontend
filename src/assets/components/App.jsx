import { useState } from "react"

function Person(props) {
  return <>
    <ul>
      <li>name: {props.name}</li>
      <li>age: {props.age}</li>
      <li>height: {props.height}</li>
    </ul>
  </>
}

function Counter() {
  const [counter, setCounter] = useState(0);
  return <>
    <button onClick={() => { setCounter((prevCount) => prevCount - 1) }}>-</button>
    <h4>{counter}</h4>
    <button onClick={() => { setCounter((prevCount) => prevCount + 1) }}>+</button>
  </>

}

function App() {

  return (
    <>
      <div>
        <h2>Hello Reactjs!!</h2>
        <Person name='ali' age='23' height='1.84' />
        <br />
        <Person name='ahmed' age='22' height='1.86' />
        <br />
        <Counter />
      </div>
    </>
  )
}

export default App
