import { useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(0);
  let val = useRef(0);
  let timerRef = useRef(null);

  const handleClick = () => {
    setCount((prevValue) => prevValue + 1);
  };

  const handClick = () => {
    val.current = val.current + 1;
    console.log(val.current);
  };

  const startTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  useEffect(() => {
    console.log("Rerendering");
    console.log(count);
    return () => clearInterval(timerRef.current); // Cleanup interval on unmount
  }, [count]);

  return (
    <>
      <h1>Count: {count}</h1>
      <h1>Time: {time}</h1>
      <button onClick={handleClick}>Increment</button>
      <button onClick={handClick}>Decrement</button>
      <button onClick={startTimer}>Start Timer</button>
      <button onClick={stopTimer}>Stop Timer</button>
    </>
  );
}

export default App;
