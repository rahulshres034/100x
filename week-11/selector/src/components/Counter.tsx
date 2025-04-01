import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');

  // Determine parity text based on count
  const parityText = count % 2 === 0 ? "Even" : "Odd";

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSetCount = () => {
    // Convert input to number and update count
    const newCount = parseInt(inputValue, 10);
    if (!isNaN(newCount)) {
      setCount(newCount);
      setInputValue('');
    }
  };

  return (
    <div>
      <div>
        <span>Count: {count}</span>
        <span> {parityText}</span>
      </div>
      
      <div>
        <button onClick={decrement}>Decrement</button>
        <button onClick={increment}>Increment</button>
      </div>
      
      <div>
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a number"
        />
        <button onClick={handleSetCount}>Set</button>
      </div>
    </div>
  );
};

export default Counter;