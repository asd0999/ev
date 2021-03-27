import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import Hours from "./components/Hours";
import Miles from "./components/Miles";
import Rates from "./components/Rates";
import data from "./lp.csv";

function App() {
  const [rate, setRate] = useState("");
  const [miles, setMiles] = useState(0);
  const [hours, setHours] = useState(null);
  let rawDataArr = [];
  let parsedData = [];
  const [loadprofile, setLoadprofile] = useState([]);

  useEffect(() => {
    d3.csv(data, function (data) {
      const datetime = data["Date/Time"];
      const [date, a, time] = datetime.trim().split(" ");
      const consumption = parseFloat(
        data["Electricity:Facility [kWh](Hourly)"]
      );
      rawDataArr = [...rawDataArr, [date, time, consumption]];
    }).then((res) => {
      for (let i = 0; i < 365; i++) {
        parsedData[i] = [];
        for (let j = i * 24; j < i * 24 + 24; j++) {
          parsedData[i].push(rawDataArr[j]);
        }
      }
      // console.log(parsedData);
      setLoadprofile(parsedData);
    });
  }, []);

  return (
    <div className="container">
      <Rates rate={rate} setRate={setRate} />
      <Miles miles={miles} setMiles={setMiles} />
      <Hours hours={hours} setHours={setHours} />
    </div>
  );
}

export default App;
