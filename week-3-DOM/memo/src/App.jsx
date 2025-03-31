import React, { useState, useMemo } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [toggleCalculation, setToggleCalculation] = useState("memoized");

  console.log("Parent Component Rendering");

  // Our expensive calculation function
  const expensiveCalculation = (num) => {
    console.log("💰 EXPENSIVE CALCULATION RUNNING!");

    // Simulate expensive operation with visible delay
    const startTime = Date.now();
    while (Date.now() - startTime < 500) {
      // Intentional delay to simulate heavy computation
    }

    return num * 2;
  };

  // WITH useMemo - only runs when count changes
  const memoizedResult = useMemo(() => {
    console.log("⚡ Running memoized calculation path");
    return expensiveCalculation(count);
  }, [count]);

  // WITHOUT useMemo - runs on every render
  const getNonMemoizedResult = () => {
    console.log("🔄 Running non-memoized calculation path");
    return expensiveCalculation(count);
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Understanding useMemo</h1>

      <div style={{ marginBottom: "30px" }}>
        <h2>Current State</h2>
        <p>
          <strong>Count:</strong> {count}
        </p>
        <p>
          <strong>Text:</strong> {text || "(empty)"}
        </p>

        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <button
            onClick={() => setCount((c) => c + 1)}
            style={{ padding: "8px 16px" }}
          >
            Increment Count
          </button>

          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type to update text"
            style={{ padding: "8px" }}
          />
        </div>
      </div>

      <div
        style={{
          padding: "15px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        <h2>Calculation Type</h2>
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "15px",
          }}
        >
          <button
            onClick={() => setToggleCalculation("memoized")}
            style={{
              padding: "8px 16px",
              backgroundColor:
                toggleCalculation === "memoized" ? "#4CAF50" : "#f1f1f1",
            }}
          >
            Use Memoized Calculation
          </button>

          <button
            onClick={() => setToggleCalculation("non-memoized")}
            style={{
              padding: "8px 16px",
              backgroundColor:
                toggleCalculation === "non-memoized" ? "#f44336" : "#f1f1f1",
            }}
          >
            Use Non-Memoized Calculation
          </button>
        </div>

        <div
          style={{
            padding: "15px",
            backgroundColor: "#f9f9f9",
            borderRadius: "5px",
          }}
        >
          <h3>Result</h3>
          {toggleCalculation === "memoized" ? (
            <div>
              <p>
                <strong>Memoized Result:</strong> {memoizedResult}
              </p>
              <p style={{ color: "#4CAF50" }}>
                ✅ This calculation is memoized with useMemo and only runs when
                count changes.
              </p>
            </div>
          ) : (
            <div>
              <p>
                <strong>Non-Memoized Result:</strong> {getNonMemoizedResult()}
              </p>
              <p style={{ color: "#f44336" }}>
                ⚠️ This calculation runs on EVERY render, even when only text
                changes.
              </p>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#f0f8ff",
          padding: "15px",
          borderRadius: "5px",
        }}
      >
        <h3>Instructions</h3>
        <ol>
          <li>Switch to "Non-Memoized Calculation"</li>
          <li>
            Type in the text input and notice the delay on EVERY keystroke
          </li>
          <li>Switch to "Memoized Calculation"</li>
          <li>
            Type in the text input and notice it's instant (no recalculation)
          </li>
          <li>Press "Increment Count" and notice the calculation runs again</li>
        </ol>
      </div>
    </div>
  );
}

export default App;
