import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Footer, FooterLinks } from "../../Constant";
import "./footer.css";

const Footer1 = () => {
  return (
    <>
      <Flex
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        boxShadow={"rgb(250, 201, 20) 0px 3px 20px"}
        bgColor={"#fff200"}
      >
        <Grid
          templateColumns={{
            lg: "repeat(4, 1fr)",
            md: "repeat(1, 1fr)",
            base: "repeat(1, 1fr)",
          }}
          justifyContent={"center"}
          px={"2vw"}
          alignItems={"center"}
          py={"2vh"}
          w={"full"}
        >
          {Footer.map((item, index) => (
            <GridItem
              key={index}
              justifyContent={"flex-start"}
              display={"flex"}
              flexDir={"column"}
              alignItems={"left"}
              h={"100%"}
              px={"1vw"}
            >
              <Heading
                pl={"1vw"}
                textDecoration={"underline"}
                fontSize={{ md: "3vw", base: "5vw", lg: "2vw" }}
              >
                {item.headline}
              </Heading>

              {item.child.map((item, index) => (
                <Flex
                  direction={"row"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                  w={"full"}
                  key={index}
                  gap={"10px"}
                >
                  <Flex
                    _hover={{
                      transform: "translateX(5px)",
                    }}
                    transition={"all 0.3s ease-in-out"}
                  >
                    <IoIosArrowRoundForward fontSize={"20px"} />
                  </Flex>
                  <Text
                    className="footer-link"
                    as={"a"}
                    fontSize={{ md: "lg", lg: "lg", base: "md" }}
                    href={item.link}
                    textColor={"black"}
                    __hover={{
                      textDecoration: "underline",
                      cursor: "pointer",
                      textColor: "red",
                    }}
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "left",
                    }}
                  >
                    {item.name}
                  </Text>
                </Flex>
              ))}
            </GridItem>
          ))}
        </Grid>

        <Flex
          className="footer-link-container"
          overflow="hidden"
          flexDirection="column"
          w={"full"}
          bgColor={"black"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Flex
            justifyContent="space-between"
            alignItems="center"
            gap={"2vw"}
            px={"2vw"}
            flexDirection={{ base: "column", md: "row" }} // Responsive layout
            w="100%"
            py={"1vh"}
          >
            {/* Logo */}
            <Flex
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"flex-start"}
              alignItems={"left"}
              px={"1vh"}
            >
              <Flex
                display={"flex"}
                flexDirection={{ md: "row", lg: "row", base: "column" }}
                justifyContent={"left"}
                alignItems={"center"}
                gap={{ base: "2vw", lg: "1vw" }}
              >
                <Image
                  src="/trogon-logo/SVG/Asset 1.svg"
                  w={{ base: "8vw", md: "4vw", lg: "2vw" }} // Adjust width as needed
                  flexShrink={0} // Prevent image from shrinking
                  alt="Logo"
                />
                <Image
                  src="/trogon-logo/SVG/Asset 2.svg"
                  w={{ base: "18vw", md: "8vw", lg: "8vw" }} // Adjust width as needed
                  flexShrink={0} // Prevent image from shrinking
                  alt="Logo"
                />
              </Flex>
              <Text
                fontFamily={"montserrat"}
                fontSize={{ base: "14px", md: "xs", lg: "md" }}
                textColor={"white"}
                fontWeight={"medium"}
              >
                ...Dare to Think,Create & Sell Your Ideas!
              </Text>
            </Flex>
            {/* Footer Links */}
            <Flex
              justifyContent="center"
              alignItems="center"
              flexDirection="row"
              gap="4vw"
              mr={"5vw"}
              mt={{ base: 4, md: 0 }} // Add margin for smaller screens
            >
              {FooterLinks.map((item, index) => (
                <Tooltip
                  label={item.name}
                  hasArrow
                  key={index}
                  placement="top"
                  bg="black"
                  color="white"
                >
                  <Box
                    as="a"
                    href={item.link}
                    aria-label={item.name}
                    bgColor={"#e51f26"}
                    p={2}
                    shadow={"lg"}
                    boxShadow={"0px 0px 15px rgba(229, 31, 38,0.6)"}
                    rounded={"md"}
                  >
                    <item.icon
                      fontSize={{ md: "20px", lg: "30px", base: "10px" }}
                      color="black"
                    />
                  </Box>
                </Tooltip>
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Footer1;
