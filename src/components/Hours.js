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
      {/* <h2 className="hours-label">
        {props.hours === "hours1"
          ? "AM - PM"
          : props.hours === "hours2"
          ? "PM - AM"
          : ". . ."}
      </h2> */}
    </div>
  );
}

export default Hours;
