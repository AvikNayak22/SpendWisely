import {
  Box,
  Text,
  VStack,
  HStack,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <Box as="footer" bg="gray.800" color="white" py={10} px={5}>
      <VStack spacing={8}>
        {/* Footer Navigation Links */}
        <HStack spacing={10}>
          <Text cursor="pointer">About Us</Text>
          <Text cursor="pointer">Contact</Text>
          <Text cursor="pointer">Privacy Policy</Text>
          <Text cursor="pointer">Terms of Service</Text>
        </HStack>

        {/* Social Media Links */}
        <HStack spacing={4}>
          <IconButton
            as="a"
            href="https://facebook.com"
            aria-label="Facebook"
            icon={<FaFacebook />}
            variant="ghost"
            colorScheme="whiteAlpha"
          />
          <IconButton
            as="a"
            href="https://twitter.com"
            aria-label="Twitter"
            icon={<FaTwitter />}
            variant="ghost"
            colorScheme="whiteAlpha"
          />
          <IconButton
            as="a"
            href="https://linkedin.com"
            aria-label="LinkedIn"
            icon={<FaLinkedin />}
            variant="ghost"
            colorScheme="whiteAlpha"
          />
          <IconButton
            as="a"
            href="https://instagram.com"
            aria-label="Instagram"
            icon={<FaInstagram />}
            variant="ghost"
            colorScheme="whiteAlpha"
          />
        </HStack>

        {/* Divider */}
        <Divider />

        {/* Copyright Section */}
        <Text fontSize="sm">
          {" "}
          &copy; {new Date().getFullYear()} SpendWisely™. All rights reserved.
        </Text>
      </VStack>
    </Box>
  );
};

export default Footer;
