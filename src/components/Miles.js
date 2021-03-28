import React from "react";

function Miles(props) {
  return (
    <div className="miles-container">
      <h4>
        MILES / YEAR: <span>{props.miles}</span>
      </h4>
      <input
        type="range"
        className="miles-slider"
        min="0"
        max="60000"
        onChange={(e) => props.setMiles(e.target.value)}
      />
    </div>
  );
}

export default Miles;
