import { Card, CardBody, Flex, Grid, Heading, Tooltip } from "@chakra-ui/react";
import React from "react";
import { FeatureLists, scrollToSection } from "../../Constant";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import InvestmentDashboard from "../Features/Dashboard";
import gsap from "gsap";
import VideoPlayer from "../Features/VideoPlayer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const location = useLocation();
  const dashboardRef = useRef(null);
  const [clickedCardIndex, setClickedCardIndex] = useState(null);
  const cardRefs = useRef([]);

  // GSAP animation for the dashboard section
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      gsap.fromTo(
        dashboardRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: "power4.inOut" }
      );
    }
  }, [location]);

  useEffect(() => {
    cardRefs.current.forEach((card) => {
      // No index needed here
      gsap.fromTo(
        card,
        { opacity: 0, y: -50 }, // Initial state
        {
          opacity: 1,
          y: 0, // Final state
          duration: 0.5,
          ease: "bounce",
          yoyo: true,
          scrollTrigger: {
            trigger: card, // Trigger the animation when the card comes into view
            start: "top 70%", // Trigger when 70% of the card reaches the viewport
            end: "bottom 20%", // Optional: end the animation when the card leaves the viewport
            toggleActions: "play none none none", // Play animation on entering the viewport
          },
        }
      );
    });
  }, []);

  return (
    <>
      {/* Feature Cards Section */}
      <Flex
        overflowX="auto"
        width="100vw"
        justifyContent="center"
        alignItems="center"
        display="flex"
        flexDirection="column"
        py={4}
        id="Services"
      >
        <Heading
          fontFamily={"montserrat"}
          fontSize={{ md: "30px", lg: "38px", base: "20px" }}
          textAlign={"center"}
        >
          Experience T-World in Action
        </Heading>
        <Flex
          behavior="scroll"
          width="100%"
          overflowX="auto"
          px={{ md: "1vw", lg: "2vw" }}
          py={"1vh"}
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            templateColumns={{
              lg: "repeat(5, 1fr)",
              md: "repeat(3, 1fr)",
              base: "repeat(2, 1fr)",
            }}
            templateRows="repeat(2, auto)"
            gap="2vw"
            minWidth="max-content"
          >
            {FeatureLists.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                onClick={scrollToSection(item.name)}
              >
                <Card
                  width="180px"
                  height="180px"
                  shadow="md"
                  ref={(el) => (cardRefs.current[index] = el)}
                >
                  <CardBody
                    _hover={{ transform: "scale(1.2)" }}
                    transition="all 0.3s ease"
                    fontFamily={"montserrat"}
                    style={{
                      transform:
                        clickedCardIndex === index
                          ? "scale(1.2)"
                          : "scale(1.0)",
                    }}
                  >
                    <Tooltip
                      label={item.name}
                      hasArrow
                      color="#333"
                      bgColor="whitesmoke"
                      fontFamily={"montserrat"}
                    >
                      <video
                        src={item.src}
                        autoPlay
                        loop
                        muted
                        preload="auto"
                        playsInline
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={(e) => console.error("Video load error:", e)}
                      />
                    </Tooltip>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </Grid>
        </Flex>
      </Flex>

      {/* Routes Section */}
      <Routes>
        <Route
          path="/dashboard"
          element={
            <Flex
              ref={dashboardRef}
              w="100%"
              justifyContent="center"
              alignItems="center"
            >
              <InvestmentDashboard />
            </Flex>
          }
        />
        {FeatureLists.map((item, index) => (
          <Route
            path={item.link}
            key={index}
            element={
              <Flex w="100%" justifyContent="center" alignItems="center">
                <VideoPlayer videoUrl={item.videolink} name={item.name} />
              </Flex>
            }
          />
        ))}
      </Routes>
    </>
  );
};

export default Features;
