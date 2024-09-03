import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="gray.800"
      color="white"
      py={8}
      px={5}
      textAlign="center"
    >
      <Text fontSize="sm">
        &copy; {new Date().getFullYear()} SpendWisely™. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
