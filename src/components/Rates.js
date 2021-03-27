import React from "react";

function Rates(props) {
  return (
    <div className="rates-container">
      <div
        className={`rate-option ${
          props.currentRate === "A" ? "rate-active" : null
        }`}
        onClick={(e) => props.setCurrentRate("A")}
      >
        <h1>A</h1>
      </div>
      <div
        className={`rate-option ${
          props.currentRate === "B" ? "rate-active" : null
        }`}
        onClick={(e) => props.setCurrentRate("B")}
      >
        <h1>B</h1>
      </div>
    </div>
  );
}

export default Rates;
