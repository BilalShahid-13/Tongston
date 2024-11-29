import {
  Button,
  Checkbox,
  Flex,
  FormLabel,
  Grid,
  GridItem,
  Highlight,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePhone } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import {
  Acheivements_TWorld,
  EntrepreneursList,
  HigherEducationStudent,
  ProfessionalList,
  ScalingyourBuisness,
  scrollToSection,
  T_WorldCheckboxList,
} from "../../Constant";
import sendEmail from "../EmailJs";
import ReferalSystem from "../ReferalSystem";
const Signup = () => {
  const title = useRef();
  const input = useRef();
  const button = useRef();
  // referal variables
  const [referredBy, setReferredBy] = useState(null);
  const [referalCode, setReferralCode] = useState(null);
  const [referralCount, setReferralCount] = useState(0);
  const toast = useToast();

  // form values
  const [error, setError] = useState("");

  // login form
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [optionSelect, setOptionSelect] = useState("");
  // you are an
  const [choosedOption, setOption] = useState("");
  const [highEducationValue, setHighEducation] = useState("");
  const [checkboxValues, setCheckboxValues] = useState([]);
  const [acheivermentsCheckbox, setAcheivermentsCheckbox] = useState([]);
  const [SignUpButton, setSignUpButton] = useState(false);

  // auth
  const isLoggedIn = localStorage.getItem("userId");

  useEffect(() => {
    if (localStorage.getItem("refferId")) {
      setReferralCode(localStorage.getItem("refferId"));
    }
  });

  useEffect(() => {
    gsap.fromTo(
      title.current,
      { y: "-10vh", opacity: 0 },
      {
        y: "0vh",
        duration: 0.6,
        stagger: 0.3,
        opacity: 1,
        ease: "linear",
        scrollTrigger: {
          trigger: title.current,
          start: "top center",
          end: "bottom center",
        },
      }
    );
    gsap.fromTo(
      input.current.children,
      { y: "-10vh", opacity: 0 },
      {
        y: "0vh",
        duration: 0.6,
        stagger: 0.3,
        opacity: 1,
        ease: "back",
        scrollTrigger: {
          trigger: input.current.children,
          start: "top center",
          end: "bottom center",
        },
      }
    );
    gsap.fromTo(
      button.current,
      { y: "-10vh", opacity: 0 },
      {
        y: "0vh",
        duration: 0.6,
        opacity: 1,
        ease: "linear",
        scrollTrigger: {
          trigger: button.current,
          start: "top center",
          end: "bottom center",
        },
      }
    );
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const referralCode = queryParams.get("referredBy"); // Get referral code from URL

    if (referralCode) {
      setReferredBy(referralCode); // Set referral code if it exists
    } else {
      setReferredBy(null); // Optional: handle null case if referralCode is missing
    }
  }, []);

  function checkPhoneNumber(e) {
    const inputValue = e.target.value;
    // Allow only digits and prevent non-numeric input
    if (/^\d*$/.test(inputValue)) {
      setPhone(inputValue);
      setError(false);
    } else {
      setError(true);
    }
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function Validate() {
    if (
      firstName === "" ||
      email === "" ||
      phone === "" ||
      country === "" ||
      optionSelect === "" ||
      highEducationValue === "" ||
      checkboxValues.length === 0
    ) {
      toast({
        title: "Empty Fields",
        description:
          "There was an error completing your email field. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    } else if (!isValidEmail(email)) {
      toast({
        title: "Invalid Email",
        description:
          "There was an error completing your email. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return false;
    } else {
      return true;
    }
  }

  async function Signup() {
    if (Validate()) {
      await apiCall();
    }
  }

  function RadioButtons(value) {
    if (value == 1) {
      return "Entrepreneur";
    } else if (value == 2) {
      return "Professional";
    } else {
      return "Higher Education Student";
    }
  }

  function Clear() {
    setCheckboxValues([]);
    setFirstName("");
    setEmail("");
    setPhone("");
    setOption("");
    setCountry("");
    setOptionSelect("");
    setHighEducation("");
    setCheckboxValues("");
    setSignUpButton("");
  }

  async function apiCall() {
    setSignUpButton(true);

    try {
      // Making the POST request to the backend
      const response = await axios.post(
        // "https://tongston-api.vercel.app/register/signup",
        "http://localhost:8000/register/signup",
        {
          firstName,
          email,
          phone,
          country,
          userType: RadioButtons(choosedOption),
          ...(highEducationValue === null
            ? { industry: optionSelect }
            : { sector: optionSelect, highEducationValue }),
          features: checkboxValues || [],
          referredBy: referredBy,
          acheivermentsCheckbox,
        }
      );
      if (response.status === 201) {
        const { userId } = response.data;

        await sendEmail(firstName, email, response.data.referral.referralCode);
        toast({
          title: "Congratulations!",
          description:
            "Your initial sign-up has been completed on T-World. You've been successfully registered and are eligible to receive 100 TOINS. Login and earn another 100 TOINS by completing your profile now.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        // Clear();
        setReferralCode(response.data.referral.referralCode);
        setReferralCount(response.data.referral.referralCount);
        if (
          response.data.referral.referralCode &&
          response.data.referral.referralCode !== "0"
        ) {
          localStorage.setItem("userId", userId); // Store user ID in localStorage
          localStorage.setItem("refferId", response.data.referral.referralCode); // Store referral code in localStorage
        }
        scrollToSection("referalSystem");
      }
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: error.response.data.message
          ? error.response.data.message
          : "There was an error completing your signup. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setSignUpButton(false);
    }
  }

  return (
    <>
      <Grid
        templateColumns={"repeat(1, 1fr)"}
        // bgColor={"#333"}
        gap={3}
        id="signup2"
      >
        {/* First GridItem - Form Section */}
        <GridItem
          w="100%"
          px="2vw"
          py="2vh"
          gap={{ md: "2vh", lg: "2vh", base: "5vh" }}
        >
          {/* Login Section */}
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            my="3vh"
            ref={title}
          ></Flex>

          {/* Form Section */}
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3vh"
            ref={input}
          >
            {/* first name */}
            <Flex
              direction="column"
              w="100%"
              justifyContent="center"
              alignItems="center"
            >
              <Flex w="70%" justifyContent="flex-start">
                <Tooltip
                  label="First & Last Name is required"
                  hasArrow
                  bgColor={"red.500"}
                >
                  <Text>
                    <Highlight
                      query="*"
                      styles={{ px: "1", py: "1", textColor: "red" }}
                    >
                      First & Last Name *
                    </Highlight>
                  </Text>
                </Tooltip>
              </Flex>
              <InputGroup
                justifyContent="center"
                alignItems="center"
                width="70%"
              >
                <InputLeftElement pointerEvents="none" height="100%">
                  <FaRegUser color="gray.300" />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="First & Last Name"
                  py="3vh"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  fontFamily="montserrat"
                  focusBorderColor="rgb(250, 201, 20)"
                />
              </InputGroup>
            </Flex>

            {/* Email */}
            <Flex
              direction="column"
              w="100%"
              justifyContent="center"
              alignItems="center"
            >
              <Flex w="70%" justifyContent="flex-start">
                <Tooltip
                  label=" Email Address is required"
                  hasArrow
                  bgColor={"red.500"}
                >
                  <Text>
                    <Highlight
                      query="*"
                      styles={{ px: "1", py: "1", textColor: "red" }}
                    >
                      Email Address *
                    </Highlight>
                  </Text>
                </Tooltip>
              </Flex>
              <InputGroup
                justifyContent="center"
                alignItems="center"
                width="70%"
              >
                <InputLeftElement pointerEvents="none" height="100%">
                  <MdOutlineEmail color="gray.300" />
                </InputLeftElement>
                <Input
                  type="email"
                  placeholder="Email Address"
                  py="3vh"
                  value={email}
                  fontFamily="montserrat"
                  focusBorderColor="rgb(250, 201, 20)"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </Flex>

            {/* phone number */}
            <Flex
              direction="column"
              w="100%"
              justifyContent="center"
              alignItems="center"
            >
              <Flex w="70%" justifyContent="flex-start">
                <Tooltip
                  label="Phone Number is required"
                  hasArrow
                  bgColor={"red.500"}
                >
                  <Text>
                    <Highlight
                      query="*"
                      styles={{ px: "1", py: "1", textColor: "red" }}
                    >
                      Phone Number *
                    </Highlight>
                  </Text>
                </Tooltip>
              </Flex>
              <InputGroup
                justifyContent="center"
                alignItems="center"
                width="70%"
              >
                <InputLeftElement pointerEvents="none" height="100%">
                  <AiOutlinePhone />
                </InputLeftElement>
                <Input
                  placeholder="Phone Number"
                  py="3vh"
                  fontFamily={"montserrat"}
                  value={phone}
                  onChange={checkPhoneNumber}
                  type="text"
                  focusBorderColor="rgb(250, 201, 20)"
                />
              </InputGroup>
            </Flex>
            {/* location */}
            <Flex
              direction="column"
              w="100%"
              justifyContent="center"
              alignItems="center"
            >
              <Flex w="70%" justifyContent="flex-start">
                <Tooltip
                  label="Location is required"
                  hasArrow
                  bgColor={"red.500"}
                >
                  <Text>
                    <Highlight
                      query="*"
                      styles={{ px: "1", py: "1", textColor: "red" }}
                    >
                      Location *
                    </Highlight>
                  </Text>
                </Tooltip>
              </Flex>
              <InputGroup
                justifyContent="center"
                alignItems="center"
                width="70%"
              >
                <InputLeftElement pointerEvents="none" height="100%">
                  <IoLocationOutline />
                </InputLeftElement>
                <Input
                  placeholder="Location (City) [E.g. Johannesburg]"
                  py="3vh"
                  fontFamily={"montserrat"}
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                  type="text"
                  focusBorderColor="rgb(250, 201, 20)"
                />
              </InputGroup>
            </Flex>
            {/* select */}
            <FormLabel
              fontFamily={"montserrat"}
              fontWeight={"semibold"}
              my={"2vh"}
            >
              which industry / sector are you in?
            </FormLabel>
            <RadioGroup onChange={setOption} value={choosedOption} my={"2vh"}>
              <Stack
                direction={{ lg: "row", md: "column", base: "column" }}
                gap={"3vw"}
                fontFamily={"montserrat"}
              >
                <Radio value="1" borderColor={"#000000"} colorScheme="yellow">
                  Entrepreneur
                </Radio>
                <Radio value="2" borderColor={"#000000"} colorScheme="yellow">
                  Professional
                </Radio>
                <Radio value="3" borderColor={"#000000"} colorScheme="yellow">
                  Higher Education Student
                </Radio>
              </Stack>
            </RadioGroup>
            {/* entreprenuer */}
            {choosedOption === "1" && (
              <>
                <Text fontWeight={"semibold"}>
                  which industry / sector are you in?
                </Text>
                <Select
                  placeholder="Select option"
                  w={{ md: "70%", base: "85%" }}
                  _focus={{
                    borderColor: "rgb(250, 201, 20)", // Custom border color
                    boxShadow: "0 0 0 1px rgb(250, 201, 20)", // Optional: add an outline effect
                  }}
                  onChange={(e) => {
                    setOptionSelect(e.target.value);
                    setHighEducation(null);
                  }}
                >
                  {EntrepreneursList.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </>
            )}
            {/* professional */}
            {choosedOption === "2" && (
              <>
                <Text fontWeight={"semibold"}>
                  which industry / sector are you in?
                </Text>
                <Select
                  placeholder="Select option"
                  w={{ md: "70%", base: "85%" }}
                  _focus={{
                    borderColor: "rgb(250, 201, 20)", // Custom border color
                    boxShadow: "0 0 0 1px rgb(250, 201, 20)", // Optional: add an outline effect
                  }}
                  onChange={(e) => {
                    setOptionSelect(e.target.value);
                    setHighEducation(null);
                  }}
                >
                  {ProfessionalList.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </>
            )}
            {/* higher education student */}
            {choosedOption === "3" && (
              <>
                <Text fontWeight={"semibold"}>
                  Are you interested in?
                </Text>
                <Select
                  placeholder="Select option"
                  w={{ md: "70%", base: "85%" }}
                  onChange={(e) => {
                    // setOptionSelect(e.target.value);
                    setHighEducation(e.target.value);
                  }}
                  _focus={{
                    borderColor: "rgb(250, 201, 20)", // Custom border color
                    boxShadow: "0 0 0 1px rgb(250, 201, 20)", // Optional: add an outline effect
                  }}
                >
                  {HigherEducationStudent.map((option, index) => (
                    <option
                      onChange={setHighEducation}
                      key={index}
                      value={option}
                      style={{ fontFamily: "montserrat" }}
                      className="montserrat"
                    >
                      {option}
                    </option>
                  ))}
                </Select>
              </>
            )}

            {/* secure a job */}
            {choosedOption === "3" &&
              highEducationValue === "Securing a job" && (
                <Flex
                  direction={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  display={"flex"}
                  gap={"4vh"}
                  w={{ md: "70%" }}
                  flexDir="column"
                >
                  {/* secure a job */}
                  <FormLabel
                    fontFamily="montserrat"
                    fontWeight={"semibold"}
                    w={{ md: "full", lg: "full", base: "70%" }}
                    textAlign={{ md: "center", lg: "center", base: "center" }}
                  >
                    Which industry / sector are you most interested in securing
                    a job in?
                  </FormLabel>
                  <Select
                    w={{ md: "full", base: "90%", lg: "full" }}
                    placeholder="Select option"
                    _focus={{
                      borderColor: "rgb(250, 201, 20)", // Custom border color
                      boxShadow: "0 0 0 1px rgb(250, 201, 20)", // Optional: add an outline effect
                    }}
                    onChange={(e) => setOptionSelect(e.target.value)}
                  >
                    {ProfessionalList.map((option, index) => (
                      <option
                        key={index}
                        value={option}
                        id="option"
                        style={{ fontFamily: "montserrat" }}
                      >
                        {option}
                      </option>
                    ))}
                  </Select>
                </Flex>
              )}
            {/* Starting/scaling your business */}
            {choosedOption === "3" &&
              highEducationValue === "Starting/scaling your business" && (
                <Flex
                  direction={"column"}
                  w={{ md: "70%" }}
                  justifyContent={"center"}
                  alignItems={"center"}
                  display={"flex"}
                  gap={"4vh"}
                  flexDir="column"
                >
                  <FormLabel
                    fontFamily="montserrat"
                    fontWeight={"semibold"}
                    textAlign={"center"}
                    w={{ md: "full", lg: "full", base: "70%" }}
                  >
                    Which industry / sector are you most interested in starting
                    business in / do you currently have a business in?
                  </FormLabel>
                  <Select
                    w={{ md: "full", base: "90%", lg: "full" }}
                    placeholder="Select option"
                    _focus={{
                      borderColor: "rgb(250, 201, 20)", // Custom border color
                      boxShadow: "0 0 0 1px rgb(250, 201, 20)", // Optional: add an outline effect
                    }}
                    onChange={(e) => setOptionSelect(e.target.value)}
                  >
                    {ScalingyourBuisness.map((option, index) => (
                      <option
                        key={index}
                        value={option}
                        id="option"
                        style={{ fontFamily: "montserrat" }}
                      >
                        {option}
                      </option>
                    ))}
                  </Select>
                </Flex>
              )}

            {/* checkboxes */}
            <Flex
              display={"flex"}
              flexDir={"column"}
              gap={"2vh"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text
                fontFamily={"montserrat"}
                textAlign={"center"}
                w={{ md: "full", lg: "full", base: "70%" }}
                fontWeight={"semibold"}
              >
                Which features of T-World are you most interested in
              </Text>
              {T_WorldCheckboxList.map((option, index) => (
                <Checkbox
                  w={{ md: "full", lg: "full", base: "90%" }}
                  key={index}
                  borderColor={"#fff200"}
                  colorScheme={"yellow"}
                  fontFamily={"montserrat"}
                  isChecked={checkboxValues.includes(option)} // Check if the option is selected
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCheckboxValues((prevValues) => [
                        ...prevValues,
                        option,
                      ]);
                    } else {
                      setCheckboxValues((prevValues) =>
                        prevValues.filter((value) => value !== option)
                      );
                    }
                  }}
                >
                  {option}
                </Checkbox>
              ))}
            </Flex>
            {/* acheivements checkboxes*/}
            <Flex
              display={"flex"}
              flexDir={"column"}
              gap={"2vh"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text
                fontFamily={"montserrat"}
                textAlign={"center"}
                w={{ md: "full", lg: "full", base: "70%" }}
                fontWeight={"semibold"}
              >
                What would you want to achieve on T-World?
              </Text>
              {Acheivements_TWorld.map((option, index) => (
                <Checkbox
                  w={{ md: "full", lg: "full", base: "90%" }}
                  key={index}
                  borderColor={"#fff200"}
                  colorScheme={"yellow"}
                  fontFamily={"montserrat"}
                  isChecked={acheivermentsCheckbox.includes(option)} // Check if the option is selected
                  onChange={(e) => {
                    if (e.target.checked) {
                      setAcheivermentsCheckbox((prevValues) => [
                        ...prevValues,
                        option,
                      ]);
                    } else {
                      setAcheivermentsCheckbox((prevValues) =>
                        prevValues.filter((value) => value !== option)
                      );
                    }
                  }}
                >
                  {option}
                </Checkbox>
              ))}
            </Flex>

            <Button
              isLoading={SignUpButton}
              w={{ md: "70%", lg: "50%", base: "50%" }}
              rounded="full"
              padding={{ md: "4vh 0vw", lg: "4vh 0vw", base: "2vh 0vw" }}
              bgColor="rgb(255, 242, 0)"
              _hover={{ bgColor: "rgb(250, 201, 20)" }}
              transition="all 0.6s ease"
              fontFamily={"montserrat"}
              onClick={Signup}
              fontSize={{ md: "3vw", lg: "2vw", base: "4vw" }}
            >
              Sign Up
            </Button>
          </Flex>
        </GridItem>
      </Grid>
      {isLoggedIn && (
        <ReferalSystem
          referralCode={referalCode}
          referralCount={referralCount}
        />
      )}
    </>
  );
};

export default Signup;
