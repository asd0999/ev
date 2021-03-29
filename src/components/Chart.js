import React from "react";
import { VictoryBar, VictoryChart } from "victory";

function Chart(props) {
  const { billB1, billB2rateA, billB2rateB } = props;

  const data = [
    { bill: "Current bill", cost: parseInt(billB1) },
    { bill: "EV - Flat rate", cost: parseInt(billB2rateA) },
    { bill: "EV - ToU rate", cost: parseInt(billB2rateB) },
  ];
  return (
    <VictoryChart domainPadding={60} domain={{ y: [0, 3500] }}>
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
                ? "#d2d2d2"
                : "#a1a1a1",
          },
        }}
      />
    </VictoryChart>
  );
}

export default Chart;
