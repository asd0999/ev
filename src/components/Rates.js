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
        <option value="A">$0.15/kWh flat rate</option>
        <option value="B">$0.20/kWh 12pm-6pm, $0.08/kWh non-peak</option>
      </select>
    </div>
  );
}

export default Rates;
