import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ConversionsIntoCash = () => {
  const options = {
    chart: {
      type: "column", // We can use a column chart to track the amount of assets converted to cash
    },
    title: {
      text: "Convert Toins into Cash",
    },
    subtitle: {
      text: "Asset Conversions to Cash in 2024",
    },
    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      title: {
        text: "Month",
      },
    },
    yAxis: {
      title: {
        text: "Amount (USD)",
      },
      labels: {
        formatter: function () {
          return "$" + this.value;
        },
      },
    },
    tooltip: {
      shared: true,
      valuePrefix: "$",
    },
    series: [
      {
        name: "Real Estate",
        data: [
          15000, 20000, 25000, 22000, 30000, 28000, 31000, 35000, 37000, 40000,
          45000, 50000,
        ], // Sample data
      },
      {
        name: "Stocks",
        data: [
          5000, 7000, 9000, 11000, 10000, 12000, 15000, 13000, 14000, 16000,
          18000, 20000,
        ], // Sample data
      },
      {
        name: "Other Assets",
        data: [
          2000, 3000, 2500, 3500, 3000, 4000, 4500, 5000, 6000, 5500, 7000,
          7500,
        ], // Sample data
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default ConversionsIntoCash;
