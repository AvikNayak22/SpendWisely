/* eslint-disable react/prop-types */
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Button,
  Text,
  useColorModeValue,
  useToast,
  IconButton,
  useDisclosure,
  Icon,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";

import { GiHamburgerMenu } from "react-icons/gi";
import { FaWallet } from "react-icons/fa6";
import { useLogoutUserMutation } from "../../redux/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setValidUser } from "../../redux/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();
  const validUser = useSelector((state) => state.authSlice.validUser);
  const bg = useColorModeValue("purple.500", "purple.900");
  const color = useColorModeValue("white", "gray.100");
  const { isOpen, onClose, onToggle } = useDisclosure();

  const [logoutUser] = useLogoutUserMutation();

  const logoutHandler = async () => {
    await logoutUser().unwrap();
    toast({
      title: "Logout Successful",
      description: "You have been logged out successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    dispatch(setValidUser(null));
    navigate("/login");
  };

  return (
    <Box bg={bg} color={color} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <RouterLink to="/">
          <Flex alignItems="center">
            <Icon as={FaWallet} mr={2} mb={2} boxSize={6} />
            <Heading as="h1" size="lg" fontFamily="Karla">
              SpendWisely
            </Heading>
          </Flex>
        </RouterLink>

        <Flex
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          justifyContent="center"
        >
          {validUser && (
            <Text mr={4} textAlign="center">
              <strong>Welcome</strong> {validUser.name}
            </Text>
          )}
          <Button colorScheme="red" onClick={logoutHandler}>
            Logout
          </Button>
        </Flex>

        <IconButton
          size="md"
          backgroundColor="white"
          color="black"
          icon={<Icon as={GiHamburgerMenu} />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={onToggle}
        />
      </Flex>

      <Drawer placement="right" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={bg}>
          <DrawerCloseButton bg="white" mt={2} />
          <DrawerHeader color={color}>
            {validUser && (
              <Text color="white">
                <strong>Welcome</strong> {validUser.name}
              </Text>
            )}
          </DrawerHeader>
          <DrawerBody>
            <Button colorScheme="red" onClick={logoutHandler}>
              Logout
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Header;
