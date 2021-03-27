import React, { useState, useEffect } from "react";

function Output(props) {
  const { rate, miles, hours, loadprofile, totalLoad } = props;
  const [output, setOutput] = useState("hello");

  useEffect(() => {
    let b1 = 0;
    let b2_a = 0;
    let b2_b = 0;
    if (rate && miles && hours && hours !== "none") {
      console.log(loadprofile);
      if (rate === "A") {
        b1 = (totalLoad * 0.15).toFixed(2);
        setOutput(`b1 for rate A: ${b1}`);
      } else if (rate === "B") {
        // for (let i = 0; i < loadprofile.length; i++) {}
        setOutput(`b1 for rate B: not yet calculated`);
      }
    }
  }, [rate, miles, hours]);

  return <div>{output}</div>;
}

export default Output;
