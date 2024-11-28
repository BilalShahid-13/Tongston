import React, { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import gsap from "gsap"; // Import GSAP for animations
import FinanceChart from "./FinanceChart";
import ConversionsIntoCash from "./ConvertionintoCash";
import { FeatureLists } from "../../Constant";

const InvestmentDashboard = () => {
  const text = React.useRef();
  const [chartData, setChartData] = useState([
    1000, 1200, 1400, 1600, 1900, 2100,
  ]); // Initial data

  React.useEffect(() => {
    const timeline = gsap.timeline();
    timeline.fromTo(
      text.current,
      { opacity: 0 },
      {
        duration: 1.3,
        opacity: 1,
        ease: "power4.out",
      }
    );
  }, []);

  // Highcharts column chart options
  const dashboardOptions = {
    chart: {
      type: "column", // Set chart type to 'column' for vertical bars
      animation: true,
    },
    title: {
      text: "Investment Growth Over Time",
    },
    xAxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      title: {
        text: "Months",
      },
    },
    yAxis: {
      title: {
        text: "Investment Value ($)",
      },
    },
    series: [
      {
        name: "Stocks",
        data: chartData,
        color: "#4caf50", // Green for stocks
      },
      {
        name: "Bonds",
        data: [1000, 1050, 1100, 1200, 1300, 1350],
        color: "#f44336", // Red for bonds
      },
      {
        name: "Mutual Funds",
        data: [1000, 1100, 1250, 1400, 1550, 1700],
        color: "#2196f3", // Blue for mutual funds
      },
    ],
    tooltip: {
      shared: true,
      valuePrefix: "$",
    },
  };

  // Function to animate columns up and down using GSAP
  // const animateColumns = () => {
  //   const randomData = chartData.map(
  //     (value) => value + (Math.random() - 0.5)
  //   ); // Simulate random data changes

  //   // Animate the bars using GSAP
  //   gsap.to(randomData, {
  //     duration: 2, // Duration of the animation
  //     yoyo: true, // Make the animation repeat back and forth
  //     repeat: -1, // Infinite repetitions
  //     onUpdate: () => {
  //       // Update chart data and redraw
  //       setChartData([...randomData]);
  //     },
  //   });
  // };

  // Call animateColumns when the component mounts
  useEffect(() => {
    // animateColumns(); // Start animation when component is mounted
  }, [chartData]);

  return (
    <Flex
      flexDirection={"column"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      fontSize={{ md: "20px", lg: "30px" }}
      id="Banking Finance and Investments"
    >
      <Text
        ref={text}
        border={"2px solid #fac913"}
        px={"2vw"}
        py={"1vh"}
        my={"1vh"}
        rounded={"full"}
      >
        {FeatureLists[0].name}
      </Text>
      <Box
        mt={6}
        p={4}
        border="1px solid #ddd"
        borderRadius="md"
        boxShadow="md"
        w={{ md: "100vw", lg: "100vw", base: "100vw" }}
      >
        {/* <Text fontSize={{ md: "lg", lg: "xl" }} fontWeight="bold" mb={4}>
        Investment Dashboard
        </Text> */}
        <HighchartsReact highcharts={Highcharts} options={dashboardOptions} />
        <FinanceChart />
        <ConversionsIntoCash />
      </Box>
    </Flex>
  );
};

export default InvestmentDashboard;
