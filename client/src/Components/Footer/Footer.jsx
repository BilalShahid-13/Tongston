import React from "react";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  Link,
  Icon,
  Button,
  VStack,
  List,
  ListItem,
  Divider,
} from "@chakra-ui/react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { scrollToSection } from "../../Constant";

const Footer = () => {
  return (
    <Box as="footer" bg="black" color="white" py="12" id="Contact">
      <Box maxW="container.lg" mx="auto" px="4">
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap="8">
          {/* Social Media Links */}
          <VStack
            align="start"
            spacing="4"
            justifyContent={{ md: "left", lg: "left", base: "center" }}
            alignItems={{ md: "flex-start", lg: "flex-start", base: "center" }}
          >
            <Heading as="h3" size="md" color="yellow.400" mb="4">
              Connect With Tongston
            </Heading>
            <Flex gap="4">
              <Link href="https://facebook.com/tongston" isExternal>
                <Icon
                  as={FaFacebook}
                  boxSize="6"
                  _hover={{ color: "yellow.400" }}
                />
                <Text srOnly>Tongston on Facebook</Text>
              </Link>
              <Link href="https://twitter.com/tongston" isExternal>
                <Icon
                  as={FaTwitter}
                  boxSize="6"
                  _hover={{ color: "yellow.400" }}
                />
                <Text srOnly>Tongston on Twitter</Text>
              </Link>
              <Link href="https://instagram.com/tongston" isExternal>
                <Icon
                  as={FaInstagram}
                  boxSize="6"
                  _hover={{ color: "yellow.400" }}
                />
                <Text srOnly>Tongston on Instagram</Text>
              </Link>
              <Link href="https://linkedin.com/company/tongston" isExternal>
                <Icon
                  as={FaLinkedin}
                  boxSize="6"
                  _hover={{ color: "yellow.400" }}
                />
                <Text srOnly>Tongston on LinkedIn</Text>
              </Link>
            </Flex>
          </VStack>

          {/* Contact Information */}
          <VStack
            align="start"
            spacing="4"
            justifyContent={{ md: "left", lg: "left", base: "center" }}
            alignItems={{ md: "flex-start", lg: "flex-start", base: "center" }}
          >
            <Heading as="h3" size="md" color="yellow.400" mb="4">
              Contact Tongston
            </Heading>
            <Flex align="center" gap="2">
              <Icon as={FaEnvelope} boxSize="5" />
              <Text>support@tongston.com</Text>
            </Flex>
            <Flex align="center" gap="2">
              <Icon as={FaPhoneAlt} boxSize="5" />
              <Text>+1 (123) 456-7890</Text>
            </Flex>
          </VStack>

          {/* Sign-up Benefits */}
          <VStack
            align="start"
            spacing="4"
            justifyContent={{ md: "left", lg: "left", base: "center" }}
            alignItems={{ md: "flex-start", lg: "flex-start", base: "center" }}
          >
            <Heading as="h3" size="md" color="yellow.400" mb="4">
              Why Join Tongston?
            </Heading>
            <List spacing="2">
              <ListItem display="flex" alignItems="center">
                <Icon as={FaEnvelope} boxSize="4" color="red.600" mr="2" />
                Get free toins upon sign-up
              </ListItem>
              <ListItem display="flex" alignItems="center">
                <Icon as={FaEnvelope} boxSize="4" color="red.600" mr="2" />
                Unlock exclusive Tongston rewards
              </ListItem>
              <ListItem display="flex" alignItems="center">
                <Icon as={FaEnvelope} boxSize="4" color="red.600" mr="2" />
                Earn bonuses through referrals
              </ListItem>
            </List>
            <Button
              colorScheme="red"
              w="full"
              mt="4"
              onClick={() => {
                scrollToSection("signup");
              }}
            >
              Join Tongston Now
            </Button>
          </VStack>
        </Grid>

        {/* Copyright */}
        <Divider my="8" borderColor="gray.700" />
        <Text textAlign="center" color="gray.400">
          &copy; {new Date().getFullYear()} Tongston. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
