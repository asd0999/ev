import React, { useState, useEffect } from "react";

function Output(props) {
  const { rate, miles, hours, loadprofile, totalLoad, evprofile } = props;
  const [output, setOutput] = useState("hello");
  //   let evprofile = [...loadprofile];

  useEffect(() => {
    let b1 = 0;
    let b2_a = 0;
    let b2_b = 0;
    let hoursOfCharging = 0;
    if (rate && miles && hours && hours !== "none") {
      // we have all three inputs
      console.log(loadprofile);

      // rate calculations
      if (rate === "A") {
        b1 = (totalLoad * 0.15).toFixed(2);
        setOutput(`b1 for rate A: ${b1}`);
      } else if (rate === "B") {
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
        setOutput(`b1 for rate B: ${b1}`);
      }

      // miles calculations
      let energyRequired = miles * 0.3;
      console.log(energyRequired);
      hoursOfCharging = Math.ceil(energyRequired / (365 * 7.2));
      console.log(hoursOfCharging);
    }

    // calculate new EV load profile
    for (let i = 0; i < evprofile.length; i++) {
      let cur = evprofile[i];
      let start = null;
      let end = null;
      let carry = null;
      if (hours === "hours2") {
        start = 17;
        end = Math.min(start + hoursOfCharging, cur.length);
        // let carry = null;
        // if (start + hoursOfCharging > cur.length) {
        //   carry = start + hoursOfCharging - cur.length;
        // }
      } else if (hours === "hours1") {
        start = 9;
        end = 16;
      }
      for (let j = 0; j < end; j++) {
        // if (carry) {
        //   cur[j][2] += 7.2;
        //   carry--;
        // } else
        if (j >= start && j < end) {
          cur[j][2] += 7.2;
        }
      }
    }
    console.log(loadprofile[0]);
    console.log(evprofile[0]);
  }, [rate, miles, hours]);

  return <div>{output}</div>;
}

export default Output;
