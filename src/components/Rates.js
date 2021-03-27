import React from "react";

function Rates(props) {
  return (
    <div className="rates-container">
      <div
        className={`rate-option ${props.rate === "A" ? "rate-active" : null}`}
        onClick={(e) => props.setRate("A")}
      >
        <h1>A</h1>
      </div>
      <div
        className={`rate-option ${props.rate === "B" ? "rate-active" : null}`}
        onClick={(e) => props.setRate("B")}
      >
        <h1>B</h1>
      </div>
    </div>
  );
}

export default Rates;
