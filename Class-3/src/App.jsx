import { useState} from 'react'
import './index.css'

const Counter = () => {
  
  let [count  , setCount] = useState(0)

  function addCount(){
    setCount(count + 1)
    // setCount(count + 1)
    // setCount(count + 1)
    // setCount(count + 1)
    // this will works only one time but ,
    // setCount((prevCount) => prevCount + 1)
    // setCount(prevCount => prevCount + 1)
    // setCount(prevCount => prevCount + 1)
    // setCount(prevCount => prevCount + 1)
    // its works
  }
  function reset(){
    setCount(0)
  }
  function subCount(){
    if(count > 0){
     
      setCount(count - 1)
    }else{
      alert('count is less than 1 !!')
    }
  }
  return (
    <div className='counter-div'>
      <h1>Counter</h1>
      <h2>Count : {count} </h2>
      <button className='btn' 
      onClick={addCount}
      >Add Count</button>
      <button
      onClick={subCount}  
      className='btn'>Sub Count</button>
      <button
      onClick={reset}  
      className='btn'>Reset</button>

    </div>

  )
}

export default Counter