import { Box, Heading, List, ListItem, Text } from "@chakra-ui/react";
import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";
import { FaCoins } from "react-icons/fa";
import { Early_Benefits } from "../../Constant";

const Early_Access = () => {
  // animations variable
  const headlineRef = useRef();
  const textRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      headlineRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "linear",
        scrollTrigger: {
          trigger: headlineRef.current,
          start: "top 70%",
        },
      }
    );
    gsap.fromTo(
      textRef.current.children,
      {
        opacity: 0,
        x: -50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.7,
        ease: "back",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 70%",
        },
      }
    );
  }, [Early_Benefits]);

  return (
    <Box maxW="container.lg" mx="auto" px="4" py="8" fontFamily={"montserrat"}>
      <Box
        className="early-signup-banner"
        maxW="2xl"
        mx="auto"
        bg="yellow.100"
        border="2px"
        borderColor="yellow.400"
        borderRadius="lg"
        p="6"
        ref={headlineRef}
      >
        <Heading as="h2" size="lg" color="black" mb="4" textAlign={"center"}>
          Early Sign-up Benefits
        </Heading>
        <List spacing="2" color="black" ref={textRef}>
          {Early_Benefits.map((benefit, index) => (
            <ListItem display="flex" alignItems="center" key={index}>
              <FaCoins style={{ marginRight: "8px", color: "gold" }} />
              <Text textAlign={"left"}> {benefit}</Text>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Early_Access;
