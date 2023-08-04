import React, { useEffect, useState } from "react";
import Employee from "./components/Employee";
import GetEmployee from "./components/GetEmployee"
import './App.css'

function App() {
  const [method,setMethod]=useState("GET")
   
  function handleClick(){
    setMethod(
      (method==="GET"?"POST":"GET")
    )
  }
  
  return (
    <div className="app">
      <button onClick={handleClick} className="change">Change to {method} Api</button>
      {method==="GET"?<Employee/>:<GetEmployee/>}
    </div>
  );
}

export default App;
