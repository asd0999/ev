import React from "react";

function Rates(props) {
  return (
    <div>
      <h4>CURRENT RATE:</h4>
      <div className="rates-container">
        <div
          className={`rate-option ${props.rate === "A" ? "rate-active" : null}`}
          onClick={(e) => props.setRate("A")}
        >
          <h2>FLAT</h2>
        </div>
        <div
          className={`rate-option ${props.rate === "B" ? "rate-active" : null}`}
          onClick={(e) => props.setRate("B")}
        >
          <h2>TOU</h2>
        </div>
      </div>
    </div>
  );
}

export default Rates;
