import React from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { MdLogin } from "react-icons/md";
import gsap from "gsap";
import { scrollToSection } from "../../Constant";
import { useRef, useEffect } from "react";

const Hero = () => {
  const headline = useRef();
  const paragraph = useRef();
  const signup = useRef();

  useEffect(() => {
    const timeline = gsap.timeline();

    timeline.fromTo(
      headline.current,
      { y: "-10vh", opacity: 0, overflow: "hidden" },
      {
        y: "0vh",
        duration: 0.6,
        opacity: 1,
        ease: "linear",
      }
    );
    timeline.fromTo(
      paragraph.current,
      { opacity: 0 },
      {
        duration: 1,
        opacity: 1,
        ease: "linear",
      }
    );
    timeline.fromTo(
      signup.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        duration: 1,
        opacity: 1,
        ease: "linear",
      }
    );
  });

  return (
    <>
      <Box
        id="Home"
        position="relative"
        width="100vw"
        height="100vh"
        overflow="hidden"
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent="center"
        fontFamily="Montserrat, sans-serif"
      >
        {/* <Navbar /> */}
        {/* Background Video */}
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          zIndex="-10"
        >
          <video
            src="https://res.cloudinary.com/dbsxojyxy/video/upload/v1731878543/tongston/fmebqj8naghxg9pnpw8y.mp4"
            autoPlay
            loop
            muted
            // preload="auto"
            style={{
              objectFit: "cover", // Ensure the video covers the full screen
              width: "100%", // Full width
              height: "100%", // Full height
            }}
          />
        </Box>

        {/* Front Content (Image) */}
        <Box
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
          display={"flex"}
          gap={{ md: "2vh", lg: "2vh", base: "1vh" }}
        >

          <Box
            justifyContent={"center"}
            alignItems={"center"}
            display={"flex"}
            mt={{ md: "75vh", lg: "77vh", base: "80vh" }}
            flexDirection={"column"}
            backgroundColor={"rgba(255, 255, 255, 0.2)"}
            backdropFilter={"blur(2px)"}
            gap={{ md: "2vh", lg: "5vh", base: "1vh" }}
            padding={{ md: "1vh 2vw", lg: "2vh 3vw", base: "1vh 2vw" }}
            rounded={"md"}
          >
            <Heading
              ref={headline}
              fontSize={{ md: "35px", lg: "25px", base: "18px" }}
              textColor={"white"}
              fontStyle={"bold"}
              textAlign={"center"}
              fontFamily={"montserrat"}
            >
              Become a VIP Employee / Employer
            </Heading>
          </Box>

          <Button
            ref={signup}
            gap={"1.7vw"}
            rounded={"full"}
            padding={{ md: "3vh 4vw", lg: "4vh 3vw", base: "1.2vh 4vw" }}
            bgColor={"rgba(255, 242, 0)"}
            textColor={"gray.800"}
            marginTop={{ md: "1vh", lg: "1vh", base: "1vh" }}
            justifyContent="center"
            display={"flex"}
            flexDirection={"row"}
            fontFamily={"montserrat"}
            alignItems="center"
            _hover={{
              transform: "scale(1.1)",
              bgColor: "#FF0000",
            }}
            onClick={() => {
              scrollToSection("signup2");
            }}
            border={"none"}
            transition="all 0.3s ease"
          >
            <Text
              fontFamily={"montserrat"}
              fontSize={{ md: "2vw", lg: "1.3vw", base: "3.3vw" }}
            >
              Sign up, Share & Earn
            </Text>
            <MdLogin fontSize={{ md: "2vw", lg: "2vw", base: "1vw" }} />
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Hero;
