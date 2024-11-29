import {
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { FaFlag } from "react-icons/fa";
import { RewardsLists } from "../../Constant";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Rewards = () => {
  const title = useRef();
  const titleImg = useRef();
  const cardtitle = useRef();
  const cardtext = useRef();
  const cardRefs = useRef([]); // Refs for cards
  const toinsRefs = useRef([]); // Refs for toins counter
  const headingRef = useRef();
  const headlineRef = useRef();

  useEffect(() => {
    const timeline = gsap.timeline({ paused: false });

    // Ensure there are items in RewardsLists to iterate over
    if (RewardsLists && RewardsLists.length > 0) {
      RewardsLists.forEach((item, index) => {
        const cardRef = cardRefs.current[index];
        const toinsRef = toinsRefs.current[index];

        // Ensure ref exists before animating
        if (cardRef && toinsRef) {
          // Card entrance animation with ScrollTrigger
          gsap.fromTo(
            [headingRef.current, headlineRef.current],
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0, // Final state
              duration: 0.5,
              ease: "bounce.inOut",
              scrollTrigger: {
                trigger: headingRef.current,
                start: "top 80%",
                end: "bottom 20%", // Optional: end the animation when the card leaves the viewport
                toggleActions: "play none none none",
              },
            }
          );

          gsap.fromTo(
            cardRef,
            { opacity: 0, y: 50 }, // Initial state
            {
              opacity: 1,
              y: 0, // Final state
              duration: 0.8,
              ease: "power4.out",
              scrollTrigger: {
                trigger: cardRef, // Trigger when the card comes into the viewport
                start: "top 80%", // When the top of the card is 80% into the viewport
                end: "top 10%", // Optional: when the card is 20% from the top of the viewport
                toggleActions: "play none none none", // Play animation on entering the viewport
              },
            }
          );

          // Toins counter animation
          let counter = { value: 0 }; // Initial counter value
          gsap.to(counter, {
            value: item.toins, // Target value
            duration: 0.5, // Duration in seconds
            ease: "power1.out",
            onUpdate: () => {
              toinsRef.textContent = `+${Math.round(counter.value)}`; // Update text content dynamically
            },
            scrollTrigger: {
              trigger: cardRef, // Trigger when the card comes into the viewport
              start: "top 80%", // Animation starts when card enters the viewport
              toggleActions: "play none none none", // Play animation on entering the viewport
            },
          });

          // Add delay between cards by controlling their animations
          timeline.add(
            gsap.fromTo(
              cardRef,
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power4.out",
                scrollTrigger: {
                  trigger: cardRef,
                  start: "top 80%",
                  toggleActions: "play none none none",
                },
              }
            ),
            `+=0.3` // Add a delay of 0.3s between animations
          );
        }
      });
    }
  }, [RewardsLists]);

  return (
    <>
      <Flex direction={"column"}>
        {/* moto */}
        <Flex
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          px={"2vw"}

          ref={title}
        >
          {/* increasae your toins */}
          <Flex display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={'column'}
            gap='1vh' w={{ md: "70%", lg: "100%", base: "100%" }}>
            <Flex display={'flex'} flexDir={'row'} justifyContent={'center'}
              alignItems={'center'}>
              <Image ref={headingRef} src="/toins.png" minW={{ md: "30%", lg: "20%", base: "20%" }} />
              <Heading
                textColor={"black"}
                textAlign={{ md: "center", lg: "center", base: "center" }}
                fontFamily={"montserrat"}
                minW={{ md: "75%", lg: "75%", base: "65%" }}
                ref={headingRef}
                fontSize={{ md: "xl", lg: "3xl", base: "sm" }}
              >
                COLLECT TOINS WITH EVERY ACTION ON T-WORLD
              </Heading>
            </Flex>
          </Flex>
          <Flex ref={titleImg} w={{ md: "60%", base: "50%", lg: "50%" }}>
            <video
              autoPlay
              loop
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              src="https://res.cloudinary.com/dbsxojyxy/video/upload/v1732458374/toin_to_cash_hvhfsz.mp4"
            />
          </Flex>
        </Flex>
        {/* card */}
        <Flex>
          <Card w={"100%"}>
            <CardBody bgColor={"gray.100"} rounded={"lg"} mx={"1vw"}>
              <Flex
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                gap={"5vh"}
                px={"3vw"}
                my={"2vh"}
                ref={cardtitle}
              >
                <Flex
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={"4vw"}
                  mb={"1vh"}
                >
                  <FaFlag color="#333" fontSize={"18px"} />
                  <Heading
                    fontWeight={"semibold"}
                    fontSize={{ md: "26px", lg: "38px", base: "28px" }}
                    textColor={"black"}
                    fontFamily={"montserrat"}
                    ref={headlineRef}
                  >
                    Daily Rewards
                  </Heading>
                </Flex>
              </Flex>
              {/* list */}
              <Grid
                templateColumns={{
                  md: "repeat(1, 1fr)",
                  lg: "repeat(2, 1fr)",
                  base: "repeat(1, 1fr)",
                }}
                // direction={"column"}
                gap={"2vw"}
                ref={cardtext}
              >
                {RewardsLists.map((item, index) => (
                  <Flex
                    key={index}
                    display={"flex"}
                    flexDirection={"column"}
                    gap={"2vh"}
                    ref={(el) => (cardRefs.current[index] = el)}
                  >
                    <Flex
                      display={"flex"}
                      flexDirection={{ md: "row", base: "column", lg: "row" }}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Flex
                        display={"flex"}
                        flexDirection={"row"}
                        py={{ base: "2vh" }}
                        justifyContent={{
                          md: "left",
                          lg: "left",
                          base: "left",
                        }}
                        w={"full"}
                        alignItems={"center"}
                        gap={"3vw"}
                      >
                        <Image
                          src={item.src}
                          alt=""
                          w={{ md: "3vw", lg: "3vw", base: "9vw" }}
                          filter="drop-shadow(0px 4px 8px rgba(250, 201, 20, 0.4))"
                        />
                        <Flex
                          display={"flex"}
                          flexDirection={"column"}
                          justifyContent={"center"}
                          alignItems={"left"}
                          gap={"4px"}
                          w={{ md: "90%", lg: "90%", base: "full" }}
                        >
                          <Heading
                            fontFamily={"montserrat"}
                            textAlign={"left"}
                            textColor={"black"}
                            fontSize={{ md: "20px", lg: "20px", base: "16px" }}
                          >
                            {item.name}
                          </Heading>
                          {/* <Text textColor={"#333"}>{item.des}</Text> */}
                        </Flex>
                      </Flex>
                      <Button
                        padding={{ md: "2vh 2vw", lg: "3vh 1vw" }}
                        boxShadow="inset 0px 0px 20px rgba(255, 242, 0, 0.7)" // Creates a soft yellow inner glow
                        bgColor={"transparent"}
                        borderWidth={"2px"}
                        borderColor={"rgb(250, 201, 20)"}
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        dropShadow={"lg"}
                        gap={"2vw"}
                        w={{ md: "13vw", lg: "10vw", base: "full" }}
                        _hover={{
                          backgroundColor: "rgba(255, 242, 0, 0.7)",
                        }}
                      >
                        <Image
                          src="/toins.png"
                          alt=""
                          maxW={{ md: "3.5vw", lg: "2.8vw", base: "10vw" }}
                          minW={{ md: "3.5vw", lg: "2.8vw", base: "9vw" }}
                        />
                        <Text
                          ref={(el) => (toinsRefs.current[index] = el)}
                          textColor={"#333"}
                          fontFamily={"montserrat"}
                        >
                          +{item.toins}
                        </Text>
                      </Button>
                    </Flex>
                    <Divider
                      w={"full"}
                      borderWidth={"1px"}
                      borderColor={"#333"}
                    />
                  </Flex>
                ))}
              </Grid>
            </CardBody>
          </Card>
        </Flex>
      </Flex>
    </>
  );
};

export default Rewards;
