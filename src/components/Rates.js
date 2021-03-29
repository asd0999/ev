import React from "react";

function Rates(props) {
  return (
    <div>
      <h4>YOUR CURRENT ELECTRIC RATE:</h4>
      <select
        name="rate"
        id="rate"
        value={props.rate}
        onChange={(e) => props.setRate(e.target.value)}
      >
        <option value="none">select one</option>
        <option value="A">
          $0.15/kWh flat rate (irresecptive of time of use)
        </option>
        <option value="B">$0.20/kWh 12pm-6pm, $0.08/kWh all other times</option>
      </select>
      {/* <div className="rates-container">
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
      </div> */}
    </div>
  );
}

export default Rates;
