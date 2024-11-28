import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  VStack,
  Text,
  Card,
  CardHeader,
  CardBody,
  Flex,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import FixedStarRating from "../Rating";
import gsap from "gsap";

const leaderboardData = [
  {
    name: "Jasmine",
    points: 120,
    src: "https://img.freepik.com/free-photo/modern-woman-park_23-2148162600.jpg?uid=R96638826&semt=ais_hybrid",
  },
  {
    name: "Diego",
    points: 100,
    src: "https://img.freepik.com/free-photo/close-up-handsome-man-posing_23-2148895180.jpg?uid=R96638826&semt=ais_hybrid",
  },
  {
    name: "Alina",
    points: 100,
    src: "https://img.freepik.com/free-photo/front-view-cute-japanese-girl-tokyo_23-2148665360.jpg?uid=R96638826&semt=ais_hybrid",
  },
  {
    name: "Huan",
    points: 150,
    src: "https://img.freepik.com/free-psd/medium-shot-girl-having-fun_23-2150183287.jpg?t=st=1732181870~exp=1732185470~hmac=448e0c8a10cc835beb7c1f1916ee39ba6a5a1053c6c8e705a636cb40d27e601f&w=1380",
  },
  { name: "Adam", points: 80, src: "https://bit.ly/dan-abramov" },
];

export default function SocialSharingEngagement() {
  const [leaderboard, setLeaderboard] = useState(leaderboardData);
  const [referralData, setReferralData] = useState([10, 15, 20, 25, 30]);

  leaderboardData.sort((a, b) => b.points - a.points);

  useEffect(() => {
    const sortedData = [...leaderboardData].sort((a, b) => b.points - a.points);
    setLeaderboard(sortedData);
  }, []);

  // animations variables
  const cardRef = useRef();
  const leaderboardRef = useRef();
  const graphRef = useRef();
  useEffect(() => {
    gsap.fromTo(
      cardRef.current.children,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.3,
        ease: "easeInOut",
        scrollTrigger: {
          trigger: cardRef.current.children,
          start: "top center",
        },
      }
    );
    gsap.fromTo(
      leaderboardRef.current.children,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.3,
        ease: "bounce.out",
        scrollTrigger: {
          trigger: leaderboardRef.current.children,
          start: "top center",
        },
      }
    );
    gsap.fromTo(
      graphRef.current.children,
      { opacity: 0 },
      {
        opacity: 1,
        yoyo: true,
        // x: 0,
        duration: 1,
        stagger: 0.3,
        ease: "bounce.out",
        scrollTrigger: {
          trigger: graphRef.current.children,
          start: "top center",
        },
      }
    );
  }, [leaderboardData]);

  // Highcharts Configuration for Referral Growth Chart (Line Chart)
  const referralChartOptions = {
    chart: {
      type: "line",
      backgroundColor: "whitesmoke",
    },
    title: {
      text: "Referral Growth Over Time",
      style: { color: "black" },
    },
    xAxis: {
      categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
      labels: { style: { color: "#000000" } },
    },
    yAxis: {
      title: { text: "Referrals", style: { color: "#000000" } },
      labels: { style: { color: "#000000" } },
    },
    series: [
      {
        name: "Referrals",
        data: referralData,
        color: "#FFD700",
        lineWidth: 2,
      },
    ],
    tooltip: {
      backgroundColor: "#000000",
      style: { color: "#FFD700" },
    },
  };

  // Highcharts Configuration for User Performance Chart (Bar Chart)
  const performanceChartOptions = {
    chart: {
      type: "bar",
      backgroundColor: "whitesmoke",
    },
    title: {
      text: "Top User Performance",
      style: { color: "black" },
    },
    xAxis: {
      categories: leaderboard.map((user) => user.name),
      labels: { style: { color: "#000000" } },
    },
    yAxis: {
      title: { text: "Points", style: { color: "#000000" } },
      labels: { style: { color: "#000000" } },
    },
    series: [
      {
        name: "User Points",
        data: leaderboard.map((user) => user.points),
        color: "#FFD700",
      },
    ],
    tooltip: {
      backgroundColor: "#000000",
      style: { color: "#FFD700" },
    },
  };

  return (
    <Card className="w-full max-w-md mx-auto" ref={cardRef}>
      <CardHeader
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        fontWeight={"bold"}
        fontSize={{ md: "30px", lg: "30px", base: "25px" }}
        textAlign={"center"}
        fontFamily={"montserrat"}
      >
        Leaderboard
      </CardHeader>
      <CardBody fontFamily={"montserrat"}>
        <VStack spacing={4} align="stretch">
          {/* Leaderboard Section */}
          <Box gap={"3vh"} ref={leaderboardRef}>
            {leaderboard.map((user, index) => (
              <Flex
                key={index}
                display={"flex"}
                justifyContent={"center"}
                alignItems={" center"}
                gap={"2vw"}
                my={"1vh"}
              >
                <Avatar
                  name={user.name}
                  src={user.src}
                  size={{ md: "lg", lg: "lg", base: "md" }}
                />
                <Flex
                  flexDir={"column"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={" center"}
                  gap={"0.3vh"}
                >
                  <Text
                    fontSize="lg"
                    textAlign="center"
                    fontWeight={"semibold"}
                  >
                    {user.name}
                  </Text>
                  <Text fontSize="lg" textAlign="center">
                    {user.points} Toins
                  </Text>
                  <FixedStarRating rating={Math.random() * 0.5 + 4.5} />
                </Flex>
              </Flex>
            ))}
            {/* <Text fontSize="lg" textAlign="center" color="black">
              Your rank: {userRank}
            </Text> */}
          </Box>

          <Divider />
          {/* Referral Growth Chart (Line Chart) */}
          <Box ref={graphRef}>
            <HighchartsReact
              highcharts={Highcharts}
              options={referralChartOptions}
            />
          </Box>
          <Divider />
          {/* User Performance Chart (Bar Chart) */}
          <Box ref={graphRef}>
            <HighchartsReact
              highcharts={Highcharts}
              options={performanceChartOptions}
            />
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );
}
