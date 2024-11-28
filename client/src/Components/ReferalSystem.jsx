import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  Tooltip,
  useClipboard,
  useToast,
} from "@chakra-ui/react";

import React from "react";
import { FaUsers } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import { ReferralLinks } from "../Constant";

const ReferalSystem = ({
  referralCount = 1,
  referralCode = localStorage.getItem("refferId"),
}) => {
  const referralLink = `${window.location.origin}/signup?referredBy=${referralCode}`;
  const { hasCopied, onCopy } = useClipboard(referralLink);
  const toast = useToast();
  const user = localStorage.getItem("userId");
  const refer = localStorage.getItem("refferId");
  console.log(user, refer);

  const handleCopy = () => {
    onCopy(); // Copy the referral link
    toast({
      title: "Copied!",
      description: "Your referral link has been copied to the clipboard!",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };
  return (
    <>
      <Grid
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={{ md: "row", lg: "row", base: "column" }}
        templateColumns={{
          md: "repeat(2, 1fr)",
          lg: "repeat(2, 1fr)",
          base: "repeat(1, 1fr)",
        }}
        gap={"3vw"}
        id="referalSystem"
      >
        <GridItem>
          <Card
            justifyContent={"center"}
            gap={"2vh"}
            alignItems={"center"}
            h={"15.5vh"}
          >
            <CardBody
              display={"flex"}
              flexDir={"column"}
              justifyContent={"space-between"}
              gap={"3vh"}
              alignItems={"center"}
            >
              <Heading
                fontSize={{ md: "md", lg: "lg", base: "md" }}
                fontFamily={"montserrat"}
                fontWeight={"medium"}
              >
                TOTAL REFERRALS
              </Heading>
              <Box
                display={"flex"}
                justifyContent={"center"}
                flexDir={"row"}
                alignItems={"center"}
                gap={"2vw"}
              >
                <FaUsers fontSize={"30px"} color="#fac913" />
                <Text
                  fontSize={{ md: "xl", lg: "xl", base: "md" }}
                  fontFamily={"montserrat"}
                  fontWeight={"medium"}
                >
                  {referralCount}
                </Text>
              </Box>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem>
          <Card
            justifyContent={"center"}
            gap={"2vh"}
            alignItems={"center"}
            h={"15.5vh"}
          >
            <CardBody
              display={"flex"}
              flexDir={"column"}
              justifyContent={"space-between"}
              gap={"3vh"}
              alignItems={"center"}
            >
              <Heading
                fontSize={{ md: "md", lg: "lg", base: "md" }}
                fontFamily={"montserrat"}
                fontWeight={"medium"}
              >
                TOTAL EARNED
              </Heading>
              <Box
                display={"flex"}
                justifyContent={"center"}
                flexDir={"row"}
                alignItems={"center"}
                gap={"2vw"}
              >
                <Image
                  src="/toins.png"
                  width={{ md: "50px", lg: "50px", base: "50px" }}
                />
                <Text
                  fontSize={{ md: "xl", lg: "xl", base: "md" }}
                  fontFamily={"montserrat"}
                  fontWeight={"semibold"}
                >
                  {(referralCount + 1) * 100}
                </Text>
              </Box>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
      <Flex
        display={"flex"}
        justifyContent={"left"}
        alignItems={"center"}
        flexDir={"column"}
        gap={{ base: "3vh" }}
      >
        <Text
          fontSize={{ md: "lg", lg: "lg", base: "md" }}
          fontWeight={"semibold"}
          textAlign={"left"}
        >
          Your Referral Link
        </Text>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          textAlign={"center"}
          flexDir={{ md: "row", lg: "row", base: "column" }}
          gap={{ md: "2vw", lg: "2vw", base: "5vh" }}
        >
          <Text
            textAlign={"center"}
            w={{ base: "full", md: "fit-content", lg: "fit-content" }}
            fontSize={{ base: "4vw", md: "2vw", lg: "1.3vw" }}
          >
            {referralLink}
          </Text>
          <Tooltip hasArrow label={hasCopied ? "Copied!" : "Click to copy"}>
            <Button
              onClick={handleCopy}
              rightIcon={<IoCopyOutline />}
              color={"black"}
              bgColor={hasCopied ? "green" : "#fff200"}
              _hover={{
                bgColor: "#fac913",
              }}
            >
              {hasCopied ? "Copied" : "Copy Link"}
            </Button>
          </Tooltip>
        </Box>
        <Text
          fontSize={{ md: "lg", lg: "lg", base: "md" }}
          fontWeight={"medium"}
          textStyle={"uppercase"}
          textAlign={"center"}
          justifyContent={"center"}
          alignItems={"center"}
          display={"flex"}
          // w={"full"}
        >
          Get
          <span
            style={{
              color: "#fac913",
              fontWeight: "bold",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              margin: "5px 1vw",
            }}
          >
            100 Toins
            <Image
              src="/toins.png"
              alt=""
              width={{ md: "50px", lg: "80px", base: "50px" }}
            />
          </span>{" "}
          for each invited user
        </Text>
      </Flex>
      <Flex
        gap={{ md: "5vw", lg: "6vw", base: "5vw" }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {ReferralLinks.map((item, index) => (
          <Tooltip hasArrow label={item.name} key={index}>
            <Box
              as={item.component}
              url={referralLink}
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              bg={hasCopied ? "green" : "#fff200"}
              _hover={{ bg: "#fac913" }}
              px="1.3vw"
              py={{ md: "2vh", lg: "4vh", base: "1vh" }}
              fontSize={{ md: "2xl", lg: "3xl", base: "md" }}
              borderRadius="md"
              cursor="pointer"
            >
              <item.icon />
            </Box>
          </Tooltip>
        ))}
      </Flex>
    </>
  );
};

export default ReferalSystem;
