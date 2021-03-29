import { max } from "d3-array";
import React from "react";
import { VictoryBar, VictoryChart } from "victory";

function Chart(props) {
  const { billB1, billB2rateA, billB2rateB } = props;

  const data = [
    { bill: "Current bill", cost: parseInt(billB1) },
    { bill: "Post EV - flat rate", cost: parseInt(billB2rateA) },
    { bill: "Post EV - ToU rate", cost: parseInt(billB2rateB) },
  ];
  return (
    <VictoryChart domainPadding={60}>
      <VictoryBar
        data={data}
        x="bill"
        y="cost"
        style={{
          data: {
            fill: ({ datum }) =>
              datum.cost === Math.min(data[1].cost, data[2].cost)
                ? "#faba45"
                : datum.bill === "Current bill"
                ? "grey"
                : "#000000",
          },
        }}
      />
    </VictoryChart>
  );
}

export default Chart;

// import React from "react";

// function Chart(props) {
//   const { billB1, billB2rateA, billB2rateB } = props;

//   const data = [parseInt(billB1), parseInt(billB2rateB), parseInt(billB2rateA)];
//   return (
//     <div className="bar-chart">
//       <div className="b1" style={{ height: data[0] / 10 }}></div>
//       <div className="b2A" style={{ height: data[1] / 10 }}></div>
//       <div className="b2B" style={{ height: data[2] / 10 }}></div>
//     </div>
//   );
// }

// export default Chart;
