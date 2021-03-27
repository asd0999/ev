import React, { useState } from "react";
import Hours from "./components/Hours";
import Miles from "./components/Miles";
import Rates from "./components/Rates";

function App() {
  const [rate, setRate] = useState("");
  const [miles, setMiles] = useState(0);
  const [hours, setHours] = useState(null);

  return (
    <div className="container">
      <Rates rate={rate} setRate={setRate} />
      <Miles miles={miles} setMiles={setMiles} />
      <Hours hours={hours} setHours={setHours} />
    </div>
  );
}

export default App;
