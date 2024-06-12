/* eslint-disable react/prop-types */
import { Box } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <Box
      as="main"
      className="Layout"
      display="flex"
      flexDirection="column"
      minH="100vh"
    >
      <Header />
      <Box className="content" flexGrow={1} padding="4">
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
