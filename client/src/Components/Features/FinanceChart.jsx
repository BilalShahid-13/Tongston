import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const FinanceChart = () => {
  const options = {
    chart: {
      type: "area", // You can use 'line', 'bar', etc.
    },
    title: {
      text: "Personal Finance Tracking",
    },
    subtitle: {
      text: "Income, Expenses, Savings & Investments (2024)",
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
    plotOptions: {
      area: {
        stacking: "normal", // For stacked area chart
      },
    },
    series: [
      {
        name: "Income",
        data: [
          4000, 4200, 4300, 4400, 4500, 4600, 4700, 4800, 4900, 5000, 5100,
          5200,
        ], // Sample data
      },
      {
        name: "Expenses",
        data: [
          2000, 2200, 2100, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000,
          3100,
        ], // Sample data
      },
      {
        name: "Savings",
        data: [
          800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000,
        ], // Sample data
      },
      {
        name: "Investments",
        data: [
          300, 500, 700, 900, 1100, 1300, 1500, 1700, 1900, 2100, 2300, 2500,
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

export default FinanceChart;
