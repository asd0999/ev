import React, { useState, useEffect } from "react";
import Chart from "./Chart.js";

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
    }
  }, [rate, miles, hours]);

  useEffect(() => {
    calculateB2rateB();
  }, [billB2rateA]);

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
    <div className="output-container">
      <div className="output-label">
        <h4>
          Recommendation: <p />
          {rate === "A" && billB2rateA <= billB2rateB
            ? "Your current plan is the best option!"
            : rate === "A" && billB2rateA > billB2rateB
            ? "You can nsave by switching to Time - Of - use based rate!"
            : rate === "B" && billB2rateA < billB2rateB
            ? "You can save by switching to flat rate!"
            : rate === "B" && billB2rateA >= billB2rateB
            ? "You current plan is the best option!"
            : "(enter details)"}
        </h4>
      </div>
      {billB2rateA ? (
        <table>
          <tbody>
            <tr className="current-bill-row">
              <td className="tr-label">Current bill</td>
              <td>{billB1 && `$ ${billB1}`}</td>
            </tr>
            <tr
              className={
                billB2rateA && billB2rateB && billB2rateA <= billB2rateB
                  ? "best-choice"
                  : null
              }
            >
              <td className="tr-label">Post EV - Flat rate</td>
              <td>{billB2rateA && `$ ${billB2rateA}`}</td>
            </tr>
            <tr
              className={
                billB2rateA && billB2rateB && billB2rateA <= billB2rateB
                  ? null
                  : "best-choice"
              }
            >
              <td className="tr-label">Post EV - ToU rate</td>
              <td>{billB2rateB && `$ ${billB2rateB}`}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div className="table-placeholder"></div>
      )}
      {hours && billB2rateB && (
        <>
          <Chart
            billB1={billB1}
            billB2rateA={billB2rateA}
            billB2rateB={billB2rateB}
          />
          <div className="legend">
            <div className="legend-color"></div> Electric rate providing the
            maximum savings!
          </div>
        </>
      )}
    </div>
  );
}

export default Output;
