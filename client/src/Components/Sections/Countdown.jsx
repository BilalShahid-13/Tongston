import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import gsap from "gsap";

// Function to calculate the remaining time from the target date
const calculateTimeLeft = (targetDate) => {
  const targetTime = new Date(targetDate).getTime(); // Convert target date to timestamp
  const currentTime = new Date().getTime(); // Get current time
  const difference = targetTime - currentTime; // Calculate remaining time in milliseconds

  if (difference <= 0) return ''; // If time is up, return 0

  return difference;
};

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate)); // State to hold remaining time
  const circularSize = { md: "150px", lg: "200px", base: "75px" };

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingTime = calculateTimeLeft(targetDate);

      if (remainingTime <= 0) {
        clearInterval(interval); // Stop the countdown when it reaches zero
        setTimeLeft(0); // Set timeLeft to 0 when countdown finishes
      } else {
        setTimeLeft(remainingTime);
      }
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [targetDate]); // Re-run effect if targetDate changes

  // animations variable
  const textRef = useRef(null);
  const progressRef = useRef(null);
  const buttonRef = useRef(null);
  const taglineRef = useRef(null);

  useEffect(() => {
    const elementsToAnimate = progressRef.current
      ? [...progressRef.current.children, buttonRef.current, taglineRef.current]
      : [buttonRef.current, taglineRef.current];
    gsap.fromTo(
      textRef.current,
      {
        opacity: 0,
        y: -100,
      },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top center",
        },
      }
    );
    gsap.fromTo(
      elementsToAnimate,
      {
        opacity: 0,
        y: -100,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.7,
        duration: 0.4,
        yoyo: true,
        ease: "circ.inOut",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top center",
        },
      }
    );
  }, []);

  // Format time left into days, hours, minutes, and seconds
  const formatTime = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24)); // Calculate days
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Calculate hours
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)); // Calculate minutes
    const seconds = Math.floor((time % (1000 * 60)) / 1000); // Calculate seconds

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const { days, hours, minutes, seconds } = formatTime(timeLeft); // Destructure formatted time

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
      flexDirection={"column"}
      gap={"1vh"}
      fontFamily={"montserrat"}
    >
      {timeLeft > 0 ? (
        <Flex
          gap={"2vw"}
          flexDirection={"column"}
          display={"flex"}
          mt={"2vh"}
          justifyContent={"center"}
          alignItems={"center"}
          fontFamily={"montserrat"}
        >
          <Heading
            textAlign={"center"}
            fontSize={{ md: "2xl", lg: "3xl", base: "xl" }}
            ref={textRef}
          >
            Early access to T-World only @ TEES24
          </Heading>

          <Flex gap={{ md: "2vw", lg: "2vw", base: "3vw" }} ref={progressRef}>
            {/* days */}
            <CircularProgress
              value={(days / (timeLeft > 0 ? 30 : 1)) * 100}
              color="#fac913"
              trackColor={"#fff200"}
              borderRadius="100vw"
              rounded={"full"}
              size={circularSize}
            >
              <CircularProgressLabel>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Heading
                    fontSize={{ md: "18px", lg: "23px", base: "10px" }}
                    fontFamily={"Montserrat"}
                  >
                    Days
                  </Heading>
                  <Text fontSize={{ md: "18px", lg: "23", base: "10px" }}>
                    {days}
                  </Text>
                </Box>
              </CircularProgressLabel>
            </CircularProgress>
            {/* hours */}
            <CircularProgress
              value={(hours / 24) * 100}
              color="#fac913"
              trackColor={"#fff200"}
              borderRadius="100vw"
              rounded={"full"}
              size={circularSize}
            >
              <CircularProgressLabel>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Heading
                    fontSize={{ md: "18px", lg: "23px", base: "10px" }}
                    fontFamily={"Montserrat"}
                  >
                    Hours
                  </Heading>
                  <Text fontSize={{ md: "18px", lg: "23px", base: "10px" }}>
                    {hours}
                  </Text>
                </Box>
              </CircularProgressLabel>
            </CircularProgress>
            {/* minutes */}
            <CircularProgress
              value={(minutes / 60) * 100}
              color="#fac913"
              trackColor={"#fff200"}
              borderRadius="100vw"
              rounded={"full"}
              size={circularSize}
            >
              <CircularProgressLabel>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Heading
                    fontSize={{ md: "18px", lg: "23px", base: "10px" }}
                    fontFamily={"Montserrat"}
                  >
                    Minutes
                  </Heading>
                  <Text fontSize={{ md: "18px", lg: "23px", base: "10px" }}>
                    {minutes}
                  </Text>
                </Box>
              </CircularProgressLabel>
            </CircularProgress>
            {/* seconds */}
            <CircularProgress
              value={(seconds / 60) * 100}
              color="#fac913"
              trackColor={"#fff200"}
              borderRadius="100vw"
              rounded={"full"}
              size={circularSize}
            >
              <CircularProgressLabel>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Heading
                    fontSize={{ md: "18px", lg: "23px", base: "10px" }}
                    fontFamily={"Montserrat"}
                  >
                    Seconds
                  </Heading>
                  <Text fontSize={{ md: "18px", lg: "23px", base: "10px" }}>
                    {seconds}
                  </Text>
                </Box>
              </CircularProgressLabel>
            </CircularProgress>
          </Flex>

          <Text
            ref={taglineRef}
            textAlign={"center"}
            fontSize={{ md: "xl", lg: "2xl", base: "md" }}
            w={{ md: "95%", base: "90%", lg: "80%" }}
          >
            SignUp now to T-World and get an exclusive free demo only at
            TEES2024
          </Text>
        </Flex>
      ) : <h2>
        null</h2>}
    </Flex>
  );
};

export default CountdownTimer;
