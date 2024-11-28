import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Progress,
  Text,
  Tooltip,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { IoCopyOutline } from "react-icons/io5";

function ReferralTracker({ referrals, coinsEarned, nextRewardAt }) {
  const progressRef = useRef(null);
  const [referralLink, setReferralLink] = useState("");
  const { hasCopied, onCopy } = useClipboard(referralLink);
  const toast = useToast();
  const referralCode = localStorage.getItem("refferId");

  useEffect(() => {
    // GSAP animation for item entry
    gsap.from(".tracker-item", {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      ease: "power3.out",
      duration: 0.8,
    });

    // GSAP progress animation
    gsap.to(progressRef.current, {
      width: `${(referrals / nextRewardAt) * 100}%`,
      duration: 1,
      ease: "power3.out",
    });

    // Update the referral link
    setReferralLink(
      `${window.location.origin}/signup?referredBy=${referralCode}`
    );
  }, [referrals, nextRewardAt, referralCode]);

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

  const progressPercentage = Math.min((referrals / nextRewardAt) * 100, 100);

  return (
    <Card
      maxW="md"
      mx="auto"
      mt={8}
      borderWidth="2px"
      borderColor="black"
      bg="white"
    >
      <CardHeader
        bg="yellow.400"
        borderBottomWidth="2px"
        borderColor="black"
        py={4}
      >
        <Heading size="lg" textAlign="center" color="black">
          Your Referral Progress
        </Heading>
      </CardHeader>
      <CardBody>
        <Box className="space-y-4">
          <Flex justify="space-between" align="center" className="tracker-item">
            <Text fontWeight="bold" color="black">
              People Referred:
            </Text>
            <Text fontWeight="bold" fontSize="xl" color="red.600">
              {referrals}
            </Text>
          </Flex>
          <Flex justify="space-between" align="center" className="tracker-item">
            <Text fontWeight="bold" color="black">
              Coins Earned:
            </Text>
            <Text fontWeight="bold" fontSize="xl" color="red.600">
              {coinsEarned}
            </Text>
          </Flex>
          <Box className="tracker-item">
            <Flex justify="space-between" align="center" mb={2}>
              <Text fontWeight="bold" color="black">
                Progress to Next Reward:
              </Text>
              <Text fontWeight="bold" color="red.600">
                {referrals} / {nextRewardAt}
              </Text>
            </Flex>
            <Box
              position="relative"
              w="full"
              bg="gray.200"
              borderRadius="full"
              h="2.5"
              ref={progressRef}
            >
              <Progress
                value={progressPercentage}
                size="xs"
                borderRadius="full"
                colorScheme="red"
                height="2.5"
              />
            </Box>
          </Box>
          {/* Referral link section */}
          <Box w="full">
            <Text fontSize="lg" fontWeight="semibold" mb={2}>
              Your Referral Link
            </Text>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDir={{ md: "column", lg: "column", base: "column" }}
              gap={{ md: "2vw", lg: "1vw", base: "5vh" }}
            >
              <Text
                w={{ base: "full", md: "full", lg: "full" }}
                fontSize={{ base: "4vw", md: "2vw", lg: "12px" }}
                textAlign="center"
              >
                {referralLink}
              </Text>
              <Tooltip hasArrow label={hasCopied ? "Copied!" : "Click to copy"}>
                <Button
                  onClick={handleCopy}
                  rightIcon={<IoCopyOutline />}
                  color="black"
                  p={"2vw 4vh"}
                  bgColor={hasCopied ? "green" : "#fff200"}
                  _hover={{ bgColor: "#fac913" }}
                >
                  {hasCopied ? "Copied" : "Copy Link"}
                </Button>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
}

export default ReferralTracker;
