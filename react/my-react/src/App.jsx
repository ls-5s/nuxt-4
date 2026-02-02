import { useState } from "react";
let arr = [
  0,0,0
]
function App() {
  const [count, setCount] = useState(arr);
  function handleClick(index) {
    setCount(count.map((item, i) => i === index ? item + 1 : item));
  }
  return (
    <div> 
      <button onClick={() => handleClick(0)}>{count[0]}</button>
    </div>
  )
}

export default App;
