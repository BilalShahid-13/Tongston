import { Box, Flex } from "@chakra-ui/react";
import { gsap } from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { TbMessageChatbot } from "react-icons/tb";

const Ai_Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false); // Manage chatbot toggle state
  const panelRef = useRef(null); // Reference for the chatbot panel

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      // Animate the panel to slide in
      gsap.to(panelRef.current, {
        bottom: 0, // Slide in to 20px from the bottom
        right: 0,
        opacity: 1, // Make it fully visible
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      // Animate the panel to slide out
      gsap.to(panelRef.current, {
        bottom: -650, // Slide out of view
        right: 0,
        opacity: 0, // Fade out
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [isOpen]);

  return (
    <Flex position="fixed" bottom="0px" right="0px" zIndex="1000" id='chatbot'>
      {/* Chatbot Toggle Button */}
      <Box
        as="button"
        onClick={toggleChatbot}
        id="chatbotToggle"
        bg="#fff200"
        _hover={{ bg: "#fac913" }}
        transition={"all 0.4s ease"}
        p={3}
        margin={'6vh 2vw'}
        rounded="full"
        shadow="lg"
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
      >
        {!isOpen && <TbMessageChatbot size="1.5rem" color="black" />}
      </Box>

      {/* Chatbot Panel with GSAP Animation */}
      <Box
        ref={panelRef}
        w="400px"
        maxW="90vw"
        h="600px"
        bg="white"
        shadow="xl"
        rounded="md"
        position="absolute"
        bottom="-650px" // Start off-screen
        right="0"
        opacity="0" // Start invisible
        display="flex"
        flexDirection="column"
      >
        {/* Header */}
        <Flex
          bg="yellow.400"
          p={4}
          roundedTop="md"
          justifyContent="space-between"
          alignItems="center"
          shadow="sm"
        >
          <Box fontWeight="bold" fontSize="lg" color="black">
            T-World Navigator
          </Box>
          <Box
            as="button"
            onClick={toggleChatbot}
            bg="red.400"
            _hover={{ bg: "red.500" }}
            p={2}
            rounded="full"
            cursor="pointer"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <AiOutlineClose size="1.2rem" color="white" />
          </Box>
        </Flex>

        {/* Chatbot Content */}
        <Box flex="1" overflow="hidden">
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/VitvP_0G9Tx4c8e_uuE0o"
            // src="https://www.chatbase.co/chatbot-iframe/QC0IaDwHGSjZqNJVhhKoL"
            style={{
              height: "100%",
              width: "100%",
              border: "none",
            }}
            title="T-World Chatbot"
          />
        </Box>
      </Box>
    </Flex>
  );
};

export default Ai_Chatbot;
