import React, { useState, useEffect } from "react";

function Output(props) {
  const { rate, miles, hours, loadprofile, totalLoad } = props;
  //   const [output, setOutput] = useState("hello");
  const [billB1, setBillB1] = useState(0);
  const [billB2rateA, setBillB2rateA] = useState(0);
  const [billB2rateB, setBillB2rateB] = useState(0);
  const [hoursOfChargingDaily, setHoursOfChargingDaily] = useState(0);

  useEffect(() => {
    // we have all three inputs
    if (rate && miles && hours && hours !== "none") {
    }
  }, [rate, miles, hours]);

  function calcEVloadprofile() {
    let energyRequired = miles * 0.3;
    console.log(energyRequired);
    setHoursOfChargingDaily(Math.ceil(energyRequired / (365 * 7.2)));
    console.log(hoursOfChargingDaily);
    //calc new Ev load profile
  }

  function calcEVtotalLoad() {
    return totalLoad + hoursOfChargingDaily * 365;
  }

  function calculateB1() {
    if (rate === "A") {
      setBillB1((totalLoad * 0.15).toFixed(2));
      console.log(`b1 for rate A: ${billB1}`);
      // setOutput(`b1 for rate A: ${b1}`);
    } else if (rate === "B") {
      let b1 = 0;
      for (let i = 0; i < loadprofile.length; i++) {
        let cur = loadprofile[i];
        for (let j = 0; j < cur.length; j++) {
          if (j >= 11 && j < 17) {
            b1 += cur[j][2] * 0.2;
          } else {
            b1 += cur[j][2] * 0.08;
          }
        }
      }
      b1 = b1.toFixed(2);
      setBillB1(b1);
      console.log(`b1 for rate B: ${b1}`);
      // setOutput(`b1 for rate B: ${b1}`);
    }
  }

  function calculateB2rateA() {
    let EVtotalLoad = calcEVtotalLoad();
    setBillB2rateA((EVtotalLoad * 0.15).toFixed(2));
    console.log(`b2 for rate A: ${billB2rateA}`);
    //   setOutput(`b2 for rate A: ${b2_a}`);
  }

  function calculateB2rateB() {
    // calculate new EV load profile
    let EVloadprofile = calcEVloadprofile();
    for (let i = 0; i < EVloadprofile.length; i++) {
      let cur = EVloadprofile[i];
      let start = null;
      let end = null;
      if (hours === "hours2") {
        start = 17;
        end = 24;
      } else if (hours === "hours1") {
        start = 9;
        end = 16;
      }
      for (let j = start; j < end; j++) {
        cur[j][2] += 7.2;
      }
    }
  }

  return (
    <div>
      <div>{billB1 && billB1}</div>
      <div>{billB2rateA && billB2rateA}</div>
      <div>{billB2rateB && billB2rateB}</div>
    </div>
  );
}

export default Output;
