import {
  Button,
  Flex,
  Image,
  useBreakpointValue,
  Box,
  Text,
} from "@chakra-ui/react";
import { FaBars, FaTimes } from "react-icons/fa"; // Import hamburger and close icons
import gsap from "gsap";
import React, { useState } from "react";
import { NavbarItems, scrollToSection } from "../../Constant";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle dropdown
  const linkRef = React.useRef();
  const faviconRef = React.useRef();
  const loginRef = React.useRef();
  const faviconText = React.useRef();
  const hamburgerIcon = React.useRef();
  const dropdownRef = React.useRef();

  const isMobile = useBreakpointValue({ base: true, md: false, lg: false });

  React.useEffect(() => {
    const timeline = gsap.timeline();
    // favicon animation
    timeline.fromTo(
      faviconRef.current,
      { x: "-10vh", opacity: 0 },
      {
        x: "0VH",
        duration: 1,
        opacity: 1,
        ease: "power4.out",
      }
    );
    timeline.fromTo(
      faviconText.current.children,
      { y: "-100vh", opacity: 0 },
      {
        y: "0%",
        duration: 0.4,
        opacity: 1,
        stagger: 0.4,
        ease: "power4.out",
      }
    );
    timeline.fromTo(
      hamburgerIcon.current,
      { y: "-100vh", opacity: 0 },
      {
        y: "0%",
        duration: 0.4,
        opacity: 1,
        stagger: 0.4,
        ease: "power4.out",
      }
    );
    // link animation
    timeline.fromTo(
      linkRef.current,
      { scale: 0 },
      { scale: 1, duration: 0.2, ease: "bounce" }
    );
    timeline.fromTo(
      linkRef.current.children,
      { y: "-100%", opacity: 0 },
      {
        y: "0%",
        duration: 0.4,
        opacity: 1,
        stagger: 0.2,
        ease: "bounce.inOut",
      }
    );

    timeline.fromTo(
      loginRef.current.children,
      { x: "10vh", opacity: 0 },
      {
        x: "0vh",
        duration: 0.4,
        opacity: 1,
        stagger: 0.2,
        ease: "linear",
      }
    );
  }, []);

  function onLinkHover(e) {
    gsap.from(e.target, {
      scale: 1.5,
      duration: 0.4,
      ease: "power4.in",
    });
  }

  function onclickDropdown() {
    console.log("object");
    gsap.fromTo(
      dropdownRef.current,
      { opacity: 0 },
      {
        duration: 0.1,
        opacity: 1,
        ease: "linear",
      }
    );
  }
  function onLinkHoverExit(e) {
    gsap.to(e.target, {
      scale: 1.0,
      duration: 0.4,
      ease: "linear",
    });
  }

  const toggleMenu = () => {
    onclickDropdown();
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
  };

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      gap={{ md: "2vw", lg: "2vw", base: "4vw" }}
      padding={{ md: "2vh 2vw", lg: "1vh 2vw", base: "1vh 4vw" }}
      position={"fixed"}
      backgroundColor="rgba(18, 20, 24, 0.8)"
      w={"100%"}
      top={"0"}
      backdropFilter={"blur(10px)"}
      shadow={"lg"}
      zIndex={"10"}
    >
      {/* Left Side: Logo or Title */}
      <Flex
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"9px"}
        ref={faviconRef}
      >
        <Image
          src="/trogon-logo/SVG/Asset 1.svg"
          alt="Logo"
          w={{ md: "5vw", lg: "3vw", base: "10vw" }}
          rounded={"sm"}
        />
        <Flex direction={"column"} gap={"8px"} ref={faviconText}>
          <Image
            src="/trogon-logo/SVG/Asset 2.svg"
            alt="Logo"
            w={{ md: "150px", lg: "150px", base: "80px" }}
          />
        </Flex>
      </Flex>

      {/* Mobile Menu (Hamburger Icon) */}
      {isMobile && (
        <Box onClick={toggleMenu} ref={hamburgerIcon}>
          {isMenuOpen ? (
            <FaTimes size={30} color="white" /> // Show close icon when menu is open
          ) : (
            <FaBars size={30} color="white" /> // Show hamburger icon when menu is closed
          )}
        </Box>
      )}

      {/* Center: Navigation Links (Visible on larger screens) */}
      <Flex
        ref={linkRef}
        direction="row"
        gap="3vw"
        alignItems="center"
        boxShadow="lg"
        padding={{ md: "1.4vw 3vh", lg: "1vh 1vw" }}
        rounded="md"
        backgroundColor="rgba(18, 20, 24, 0.1)"
        backdropFilter="blur(1px)"
        border="2px"
        borderColor="rgba(255, 242, 0,0.4)"
        textColor="white"
        _hover={{
          borderColor: "rgba(255, 242, 0,0.6)",
        }}
        display={{ base: "none", md: "flex" }} // Hide links on mobile by default
      >
        {NavbarItems.map((item, index) => (
          <Button
            key={index}
            variant="link"
            color="white"
            fontSize={{ md: "2vw", lg: "1.3vw" }}
            onClick={() => {
              scrollToSection(item.name);
            }}
            _hover={{
              textDecoration: "none",
            }}
            onMouseEnter={(e) => onLinkHover(e)}
            onMouseLeave={(e) => onLinkHoverExit(e)}
            border={"none"}
            transition="all 0.3s ease"
          >
            {item.name}
          </Button>
        ))}
      </Flex>

      {/* Mobile Dropdown Menu */}
      {isMobile && isMenuOpen && (
        <Flex
          direction="column"
          position="absolute"
          top="100%"
          w={"100%"}
          left="0"
          right="0"
          backgroundColor="rgba(18, 20, 24, 0.9)"
          padding="2vh"
          zIndex="999"
          ref={dropdownRef}
        >
          {NavbarItems.map((item, index) => (
            <Button
              key={index}
              variant="link"
              color="white"
              fontSize="2xl"
              onClick={() => {
                scrollToSection(item.name);
                setIsMenuOpen(false); // Close menu after link click
              }}
              _hover={{
                textDecoration: "none",
              }}
              onMouseEnter={(e) => onLinkHover(e)}
              onMouseLeave={(e) => onLinkHoverExit(e)}
              border={"none"}
              transition="all 0.3s ease"
              marginBottom="1vh"
            >
              {item.name}
            </Button>
          ))}

          {/* Add Get Started button in mobile dropdown */}
          <Button
            variant="outline"
            colorScheme="blue"
            backgroundColor="#fff200"
            backdropFilter="blur(10px)"
            boxShadow="lg"
            border="none"
            _hover={{
              backgroundColor: "#fac914",
            }}
            onClick={() => {
              scrollToSection("signup");
              setIsMenuOpen(false); // Close menu after clicking "Get Started"
            }}
            textColor="#333"
            transition="all 0.5s ease"
            marginTop="1vh"
          >
            Sign Up Now
          </Button>
        </Flex>
      )}

      {/* Right Side: Actions (Visible on larger screens) */}
      <Flex
        gap="2vw"
        ref={loginRef}
        fontSize={{ md: "2vw", lg: "2vw" }}
        display={{ md: "flex", lg: "flex", base: "none" }}
      >
        <Button
          colorScheme="blue"
          variant="outline"
          backgroundColor="#fff200"
          backdropFilter="blur(10px)"
          boxShadow="lg"
          border="none"
          _hover={{
            backgroundColor: "#fac914",
          }}
          onClick={() => {
            scrollToSection("signup");
          }}
          textColor="#333"
          transition="all 0.5s ease"
        >
          Sign Up Now
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;
