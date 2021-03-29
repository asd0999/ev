import React from "react";

function Hours(props) {
  return (
    <div>
      <h4>PROBABLE HOURS OF CHARGING:</h4>
      <select
        name="hours"
        id="hours"
        value={props.hours}
        onChange={(e) => props.setHours(e.target.value)}
      >
        <option value="none">select one</option>
        <option value="hours1">10am - 6pm (peak)</option>
        <option value="hours2">6pm - 10am (non-peak)</option>
      </select>
    </div>
  );
}

export default Hours;
