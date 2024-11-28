import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Text,
  VStack,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap"; 

const RewardCalculator = () => {
  const [referrals, setReferrals] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [milestonesCompleted, setMilestonesCompleted] = useState(0);
  const [totalToins, setTotalToins] = useState(0);

  // Reward rates (you can adjust these as needed)
  const TOIN_PER_REFERRAL = 50;
  const TOIN_PER_TASK = 10;
  const TOIN_PER_HOUR = 5;
  const TOIN_PER_MILESTONE = 100;
  // animations
  const cardRef = useRef();

  useEffect(() => {
    // Calculate total toins whenever inputs change
    const referralToins = referrals * TOIN_PER_REFERRAL;
    const taskToins = tasksCompleted * TOIN_PER_TASK;
    const timeToins = (timeSpent / 60) * TOIN_PER_HOUR; // Convert minutes to hours
    const milestoneToins = milestonesCompleted * TOIN_PER_MILESTONE;

    setTotalToins(referralToins + taskToins + timeToins + milestoneToins);
  }, [referrals, tasksCompleted, timeSpent, milestonesCompleted]);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: -100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "bounce",
        scrollTrigger: {
          trigger: cardRef.current, // Trigger the animation when the card comes into view
          start: "top 70%", // Trigger when 80% of the card reaches the viewport
          end: "bottom 20%", // Optional: end the animation when the card leaves the viewport
          toggleActions: "play none none none", // Play animation on entering the viewport
        },
      }
    );
    gsap.fromTo(
      cardRef.current.children,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.5,
        ease: "elastic",
        scrollTrigger: {
          trigger: cardRef.current.children, // Trigger the animation when the card comes into view
          start: "top 70%", // Trigger when 80% of the card reaches the viewport
          end: "bottom 20%", // Optional: end the animation when the card leaves the viewport
          toggleActions: "play none none none", // Play animation on entering the viewport
        },
      }
    );
  }, []);

  return (
    <Card
      maxW={{ md: "lg", lg: "lg", base: "sm" }}
      mx="auto"
      p={4}
      shadow="md"
      borderWidth="1px"
      borderColor="#000000"
      bg="#FFFFFF"
      className="card"
      ref={cardRef}
    >
      <CardHeader
        textAlign="center"
        bg="#FFD700"
        color="#000000"
        borderBottomWidth="2px"
        borderColor="#000000"
      >
        <Heading size="lg" fontWeight="bold" fontFamily={"montserrat"}>
          Real-time Reward Calculator
        </Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={4}>
          <FormControl className="form-input">
            <FormLabel
              fontFamily={"montserrat"}
              htmlFor="referrals"
              color="#000000"
              fontWeight="bold"
            >
              Number of Referrals
            </FormLabel>
            <Input
              id="referrals"
              type="number"
              fontFamily={"montserrat"}
              min="0"
              value={referrals}
              onChange={(e) => setReferrals(Number(e.target.value))}
              bg="#FFFFFF"
              borderColor="#000000"
              _hover={{ borderColor: "#FF0000" }}
            />
          </FormControl>

          <FormControl className="form-input" fontFamily={"montserrat"}>
            <FormLabel htmlFor="tasks" color="#000000" fontWeight="bold">
              Activities Completed
            </FormLabel>
            <Input
              id="tasks"
              type="number"
              min="0"
              value={tasksCompleted}
              onChange={(e) => setTasksCompleted(Number(e.target.value))}
              bg="#FFFFFF"
              borderColor="#000000"
              _hover={{ borderColor: "#FF0000" }}
            />
          </FormControl>

          <FormControl className="form-input" fontFamily={"montserrat"}>
            <FormLabel htmlFor="milestones" color="#000000" fontWeight="bold">
              Milestones Completed
            </FormLabel>
            <Input
              id="milestones"
              type="number"
              min="0"
              value={milestonesCompleted}
              onChange={(e) => setMilestonesCompleted(Number(e.target.value))}
              bg="#FFFFFF"
              borderColor="#000000"
              _hover={{ borderColor: "#FF0000" }}
            />
          </FormControl>

          <FormControl className="form-input" fontFamily={"montserrat"}>
            <FormLabel htmlFor="time" color="#000000" fontWeight="bold">
              Time Spent (minutes)
            </FormLabel>
            <Input
              id="time"
              type="number"
              min="0"
              value={timeSpent}
              onChange={(e) => setTimeSpent(Number(e.target.value))}
              bg="#FFFFFF"
              borderColor="#000000"
              _hover={{ borderColor: "#FF0000" }}
            />
          </FormControl>

          <Box mt={4} textAlign="center" className="total-toins">
            <Heading size="md" mb={2} color="#000000" fontFamily={"montserrat"}>
              Total Toins Earned
            </Heading>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color="#FF0000"
              fontFamily={"montserrat"}
            >
              {totalToins.toFixed(2)}
            </Text>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default RewardCalculator;
