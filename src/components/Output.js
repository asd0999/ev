import React, { useState, useEffect } from "react";

function Output(props) {
  const { rate, miles, hours, loadprofile, totalLoad } = props;
  const [output, setOutput] = useState("hello");

  useEffect(() => {
    let b1 = 0;
    let b2_a = 0;
    let b2_b = 0;
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
            if (j >= 11 && j <= 17) {
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
      let hoursOfCharging = Math.ceil(energyRequired / (365 * 7.2));
      console.log(hoursOfCharging);
    }

    // hours calculations
  }, [rate, miles, hours]);

  return <div>{output}</div>;
}

export default Output;
