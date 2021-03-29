import React, { useState, useEffect } from "react";
import Chart from "./Chart.js";

function Output(props) {
  const { rate, miles, hours, loadprofile, totalLoad } = props;
  const [billB1, setBillB1] = useState(0);
  const [billB2rateA, setBillB2rateA] = useState(0);
  const [billB2rateB, setBillB2rateB] = useState(0);
  const [hoursOfChargingDaily, setHoursOfChargingDaily] = useState(0);

  useEffect(() => {
    // we have all three inputs
    if (rate && miles && (hours === "hours1" || hours === "hours2")) {
      calculateB1();
      calculateB2rateA();
    }
  }, [rate, miles, hours]);

  useEffect(() => {
    calculateB2rateB();
  }, [hoursOfChargingDaily, hours]);

  useEffect(() => {
    calcEVtotalLoad();
  }, [miles]);

  function calculateB1() {
    if (rate === "A") {
      setBillB1((totalLoad * 0.15).toFixed(2));
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
    }
  }

  function calculateB2rateA() {
    let EVtotalLoad = calcEVtotalLoad();
    setBillB2rateA((EVtotalLoad * 0.15).toFixed(2));
  }

  function calculateB2rateB() {
    // calc new EV load profile
    let EVloadprofile = [];
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
  }

  function calcEVtotalLoad() {
    let energyRequired = miles * 0.3;
    let energyRequiredDaily = energyRequired / 365;
    let chargeIn1Hour = 6.2; //kwh
    setHoursOfChargingDaily(energyRequiredDaily / chargeIn1Hour);
    let EVtotalLoad = totalLoad + energyRequired;
    return EVtotalLoad;
  }

  return (
    <div className="output-container">
      <div className="output-label">
        <h4 style={{ marginBottom: "-16px" }}>Recommendation: </h4>
        {miles && hours && rate === "A" && billB2rateA <= billB2rateB ? (
          <h4>
            You will save{" "}
            <span>${Math.floor(Math.abs(billB2rateA - billB2rateB))}</span> by
            staying on your current plan!{" "}
          </h4>
        ) : rate === "A" && billB2rateA > billB2rateB ? (
          <h4>
            You can save{" "}
            <span>${Math.floor(Math.abs(billB2rateA - billB2rateB))}</span> by
            switching to Time - Of - use based rate!
          </h4>
        ) : rate === "B" && billB2rateA < billB2rateB ? (
          <h4>
            You can save{" "}
            <span>${Math.floor(Math.abs(billB2rateA - billB2rateB))}</span> by
            switching to flat rate!
          </h4>
        ) : rate === "B" && billB2rateA >= billB2rateB ? (
          <h4>
            You will save{" "}
            <span>${Math.floor(Math.abs(billB2rateA - billB2rateB))}</span> by
            staying on your current plan!{" "}
          </h4>
        ) : (
          <h4>(awaiting input)</h4>
        )}
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
                billB2rateA && billB2rateB && billB2rateA < billB2rateB
                  ? "best-choice"
                  : null
              }
            >
              <td className="tr-label">Post EV - Flat rate</td>
              <td>{billB2rateA && `$ ${billB2rateA}`}</td>
            </tr>
            <tr
              className={
                billB2rateA && billB2rateB && billB2rateB < billB2rateA
                  ? "best-choice"
                  : null
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
