import {
  Button,
  Flex,
  Image,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";

import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      fontFamily={"montserrat"}
      display={"flex"}
      minH={"100vh"}
    >
      <Image
        loop
        src="https://assets.dochipo.com/editor/animations/404-error/986fdadf-8dc2-4a46-aea7-8f9002ebaed0.gif"
      />
      <Text>Page NotFound</Text>
      <ChakraLink
        as={Link}
        p={"1vh 2vw"}
        rounded={"lg"}
        shadow={"md"}
        to={"/"}Button
        bgColor={"#fff200"}
        _hover={{ bgColor: "#fac913" }}
        transition={"all 0.6s ease"}
      >
        Back to Homepage
      </ChakraLink>
    </Flex>
  );
};

export default NotFound;
