import {
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
const Login = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <>
      <Grid
        templateColumns={{ md: "repeat(0, 1fr", lg: "repeat(2, 1fr)" }}
        gap={6}
      >
        <GridItem w="100%" px={"2vw"} py={"2vh"}>
          <Flex
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            // gap={"1vw"}
          >
            <Flex justifyContent={"center"} alignItems={"center"}>
              <Image
                src="/trogon-logo/SVG/Asset 1.svg"
                alt=""
                w={{ md: "3vw", lg: "2vw" }}
              />
              <Heading fontFamily={"heading"}>TONGSTON.</Heading>
            </Flex>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"row"}
              gap={"1vw"}
              borderWidth={"2px"}
              borderColor={"gray.400"}
              padding={{ md: "1vh 2vw", lg: "2vh 2vw" }}
              borderRadius={"full"}
            >
              <Image
                src="/united-kingdom-flag-icon.svg"
                alt=""
                w={{ md: "3vw", lg: "2vw" }}
              />
              <Text fontFamily={"heading"}>EN</Text>
              <IoIosArrowDown />
            </Flex>
          </Flex>
          {/* Login */}
          <Flex
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            mb={"3vh"}
          >
            <Heading
              fontWeight={"bold"}
              textColor={"rgb(30, 30, 30)"}
              fontSize={"6xl"}
              fontFamily={"heading"}
            >
              Hi there!
            </Heading>
            <Text>Welcome to Tongston.Community Dashboard</Text>
          </Flex>
          {/* Form */}
          <Flex
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"3vh"}
          >
            {/* email */}
            <InputGroup justifyContent="center" alignItems="center" width="70%">
              <InputLeftElement pointerEvents="none" height="100%">
                <FaRegUser color="gray.300" />
              </InputLeftElement>
              <Input
                type="email"
                placeholder="email"
                py="3vh"
                focusBorderColor="rgb(250, 201, 20)" // Optional: border color on focus
              />
            </InputGroup>

            {/* password */}
            <InputGroup justifyContent="center" alignItems="center" width="70%">
              <InputLeftElement pointerEvents="none" height="100%">
                <MdOutlinePassword />
              </InputLeftElement>
              <Input
                placeholder="password"
                py="3vh"
                type={show ? "text" : "password"}
                focusBorderColor="rgb(250, 201, 20)" // Optional: border color on focus
              />
              <InputRightElement width="4.5rem" height={"100%"}>
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? <FaRegEye /> : <FaRegEyeSlash />}
                </Button>
              </InputRightElement>
            </InputGroup>

            <Text w={"70%"} textAlign={"right"} textColor={"rgb(31, 33, 36)"}>
              Forgot Password?
            </Text>
            <Button
              w={"70%"}
              rounded={"full"}
              padding={"3vh 0vw"}
              bgColor={"rgb(255, 242, 0)"}
              _hover={{ bgColor: "rgb(250, 201, 20)" }}
              transition={"all 0.6s ease"}
            >
              Login In
            </Button>
            <Flex>
              <Text>Don't have an account?</Text>
              <Text textColor={"rgb(229, 31, 38)"} fontWeight={"semibold"}>
                &nbsp;Sign up
              </Text>
            </Flex>
          </Flex>
        </GridItem>
        <GridItem w="100%" h="10" bg="blue.500"></GridItem>
      </Grid>
    </>
  );
};

export default Login;
