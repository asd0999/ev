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
      calculateB1();
      calculateB2rateA();
      calculateB2rateB();
    }
  }, [rate, miles, hours]);

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
      //   console.log(`b1 for rate B: ${billB1}`);
      // setOutput(`b1 for rate B: ${b1}`);
    }
  }

  function calculateB2rateA() {
    let EVtotalLoad = calcEVtotalLoad();
    setBillB2rateA((EVtotalLoad * 0.15).toFixed(2));
    // console.log(`b2 for rate A: ${billB2rateA}`);
    //   setOutput(`b2 for rate A: ${b2_a}`);
  }

  function calculateB2rateB() {
    // calc new EV load profile
    let EVloadprofile = [];
    // console.log(EVloadprofile);
    let start = null;
    let end = null;
    if (hours === "hours2") {
      start = 17;
      end = 24;
    } else if (hours === "hours1") {
      start = 9;
      end = 16;
    }
    console.log(loadprofile[0][0][2]);
    for (let i = 0; i < loadprofile.length; i++) {
      EVloadprofile[i] = [];
      let cur = loadprofile[i];
      for (let j = 0; j < cur.length; j++) {
        if (j >= start && j < end) {
          EVloadprofile[i][j] = loadprofile[i][j][2] + hoursOfChargingDaily;
        } else {
          EVloadprofile[i][j] = loadprofile[i][j][2];
        }
      }
    }

    // console.log(EVloadprofile.length);
    console.log(EVloadprofile[0][0] * 0.08);

    // iterate over EV load profile to calculate new bill B2
    let b2 = 0;
    for (let i = 0; i < EVloadprofile.length; i++) {
      let cur = EVloadprofile[i];
      for (let j = 0; j < cur.length; j++) {
        if (j >= 11 && j < 17) {
          b2 += cur[j] * 0.2;
        } else {
          b2 += cur[j] * 0.08;
        }
      }
    }
    console.log(b2);
    b2 = b2.toFixed(2);
    setBillB2rateB(b2);
    console.log(`b2 for rate B: ${billB2rateB}`);
    // setOutput(`b2 for rate B: ${b2}`);
  }

  function calcEVtotalLoad() {
    let energyRequired = miles * 0.3;
    // console.log(energyRequired);
    let energyRequiredDaily = energyRequired / 365;
    let chargeIn1Hour = 7.2; //kwh
    setHoursOfChargingDaily(Math.ceil(energyRequiredDaily / chargeIn1Hour));
    // console.log(hoursOfChargingDaily);
    let EVtotalLoad = totalLoad + energyRequired;
    // console.log(EVtotalLoad);
    return EVtotalLoad;
  }

  return (
    <div>
      <div>B1: {billB1 && billB1}</div>
      <div>B2 (rate A): {billB2rateA && billB2rateA}</div>
      <div>B2 (rate B): {billB2rateB && billB2rateB}</div>
    </div>
  );
}

export default Output;
