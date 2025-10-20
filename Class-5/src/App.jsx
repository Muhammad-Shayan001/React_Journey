import {useState} from "react";

const App = () => {



  const [color , setColor] = useState("olive")
  
 

  return (
    <div className="duration-200 h-screen flex justify-center items-baseline-last" style={{backgroundColor: color}}>
      <div className="btn-box font-serif rounded-xl text-white bg-white mb-10 h-13 w-2xl flex justify-center items-center ">
        <button className="  rounded-lg m-2 w-24 h-8  border-2 border-gray-900 " style={{backgroundColor : 'red'}} onClick={() => {setColor('red')}} >
          Red
        </button>
        <button className="  rounded-lg m-2 w-24 h-8  border-2 border-gray-900 "style={{backgroundColor : 'green'}} onClick={() => {setColor('green')}} >
          Green
        </button>
        <button className=" rounded-lg m-2 w-24 h-8  border-2 border-gray-900 " style={{backgroundColor : 'blue'}} onClick={() => {setColor('blue')}} >
          Blue
        </button>
        <button className=" rounded-lg m-2 w-24 h-8 border-2 border-gray-900  "  style={{backgroundColor : 'black'}} onClick={() => {setColor('black')}} >
          Black
        </button>
        <button className=" rounded-lg m-2 w-24 h-8 border-2 border-gray-900 text-black " style={{backgroundColor : 'white'}} onClick={() => {setColor('white')}} >
          white
        </button>
      </div>
    </div>
  );
};

export default App;
