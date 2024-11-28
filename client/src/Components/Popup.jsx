import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { GoDownload } from "react-icons/go";
import gsap from "gsap";
import { scrollToSection } from "../Constant";

const Popup = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalContentRef = useRef(null);

  // Automatically open the modal when the component mounts
  useEffect(() => {
    onOpen();
  }, [onOpen]);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        modalContentRef.current,
        { opacity: 0, y: "-20vh" },
        { opacity: 1, y: 0, duration: 1, ease: "bounce" }
      );
    }
  }, [isOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontFamily={"montserrat"}>
            <ModalCloseButton
              backgroundColor="#fff200"
              my={"1vh"}
              shadow={"lg"}
              _hover={{
                backgroundColor: "#fac913",
              }}
              _active={{
                backgroundColor: "#fac913",
              }}
              outline={"none"}
              transition={"all 0.4s linear"}
            />
          </ModalHeader>
          <ModalBody>
            <Image
              src="https://res.cloudinary.com/dbsxojyxy/image/upload/v1731954584/tongston/TRIFOLD_BROCHURE_qb3dnq.png"
              alt=""
              rounded={"md"}
              dropShadow={"lg"}
              w={{ md: "100%", base: "90%", lg: "100%" }}
            />
          </ModalBody>
          <ModalFooter gap="2vw">
            <Button
              as="a"
              href="/ROLL UP BANNER-1.pdf" // Replace with your PDF path
              download="ROLL UP BANNER.pdf" // Set the filename for the downloaded file
              bgColor={"#fff200"}
              size="md"
              _hover={{
                backgroundColor: "#fac913",
              }}
            >
              <GoDownload />
            </Button>
            <Button
              _hover={{
                backgroundColor: "#fac913",
              }}
              transition={"all 0.4s linear"}
              bgColor={"#fff200"}
              onClick={() => {
                scrollToSection("signup2");
                setTimeout(() => {
                  onClose();
                }, 200);
              }}
            >
              Sign Up
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Popup;
