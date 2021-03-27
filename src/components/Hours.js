import React from "react";

function Hours(props) {
  return (
    <select
      name="hours"
      id="hours"
      value={props.hours}
      onChange={(e) => props.setHours(e.target.value)}
    >
      <option value="none">select one</option>
      <option value="hours1">10am - 6pm</option>
      <option value="hours2">6pm - 10am</option>
    </select>
  );
}

export default Hours;
