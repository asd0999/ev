import React from "react";

function Miles(props) {
  return (
    <div className="miles-container">
      <input
        type="range"
        className="miles-slider"
        min="0"
        max="60000"
        onChange={(e) => props.setMiles(e.target.value)}
      />
      <h4>The range value is {props.miles}</h4>
    </div>
  );
}

export default Miles;
