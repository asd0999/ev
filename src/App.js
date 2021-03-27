import React, { useState } from "react";
import Miles from "./components/Miles";
import Rates from "./components/Rates";

function App() {
  const [rate, setRate] = useState("");
  const [miles, setMiles] = useState(0);

  return (
    <div className="container">
      <Rates rate={rate} setRate={setRate} />
      <Miles miles={miles} setMiles={setMiles} />
    </div>
  );
}

export default App;
