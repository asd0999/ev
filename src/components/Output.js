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
    b2 = b2.toFixed(2);
    setBillB2rateB(b2);
    console.log(`b2 for rate B: ${billB2rateB}`);
    // setOutput(`b2 for rate B: ${b2}`);
  }

  function calcEVtotalLoad() {
    let energyRequired = miles * 0.3;
    let energyRequiredDaily = energyRequired / 365;
    let chargeIn1Hour = 7.2; //kwh
    setHoursOfChargingDaily(Math.ceil(energyRequiredDaily / chargeIn1Hour));
    let EVtotalLoad = totalLoad + energyRequired;
    return EVtotalLoad;
  }

  return (
    <div>
      <h1>
        Result:{" "}
        {rate === "A" && billB2rateA < billB2rateB
          ? "Good choice!"
          : rate === "A" && billB2rateA > billB2rateB
          ? "Get TOU rate!"
          : rate === "B" && billB2rateA < billB2rateB
          ? "Get flat rate!"
          : rate === "B" && billB2rateA > billB2rateB
          ? "Good choice!"
          : "(waiting for input)"}
      </h1>

      <table>
        <tbody>
          <tr>
            <td className="tr-label">Current bill</td>
            <td>{billB1 && `$ ${billB1}`}</td>
          </tr>
          <tr className={billB2rateA < billB2rateB ? "best-choice" : null}>
            <td className="tr-label">Bill post EV (flat)</td>
            <td>{billB2rateA && `$ ${billB2rateA}`}</td>
          </tr>
          <tr className={billB2rateA < billB2rateB ? null : "best-choice"}>
            <td className="tr-label">Bill post EV (TOU)</td>
            <td>{billB2rateB && `$ ${billB2rateB}`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Output;
