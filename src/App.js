import React, { useState } from "react";
import Rates from "./components/Rates";

function App() {
  const [currentRate, setCurrentRate] = useState("");

  return (
    <div className="App">
      <Rates currentRate={currentRate} setCurrentRate={setCurrentRate} />
    </div>
  );
}

export default App;
