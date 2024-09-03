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
  VStack,
  Divider,
  Avatar,
  useBreakpointValue,
  HStack,
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
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

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
      <Flex h={20} alignItems="center" justifyContent="space-between">
        <RouterLink to="/">
          <Flex alignItems="center">
            <Icon as={FaWallet} mr={2} boxSize={6} />
            <Heading as="h1" size="lg">
              SpendWisely
            </Heading>
          </Flex>
        </RouterLink>

        {/* Desktop Navigation Links */}
        <Flex
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          gap={4}
        >
          {validUser && (
            <HStack spacing={4}>
              <Avatar size="md" name={validUser.name} />
              <Text>{validUser.name}</Text>
              <Button
                colorScheme="red"
                size={buttonSize}
                onClick={logoutHandler}
              >
                Logout
              </Button>
            </HStack>
          )}
        </Flex>

        {/* Mobile Menu Button */}
        <IconButton
          size="md"
          variant="ghost"
          color={color}
          icon={<Icon as={GiHamburgerMenu} boxSize={6} />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={onToggle}
        />
      </Flex>

      {/* Mobile Drawer */}
      <Drawer placement="right" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={bg} p={4} borderRadius="md" boxShadow="md">
          <DrawerCloseButton color={color} mt={2} />
          <DrawerHeader borderBottomWidth="1px" color={color}>
            {validUser ? `Welcome, ${validUser.name}` : "Menu"}
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={6} align="stretch">
              {validUser && (
                <>
                  <VStack spacing={2} align="center">
                    <Avatar
                      size="lg"
                      name={validUser.name}
                      src={validUser.avatarUrl}
                    />
                    <Text fontWeight="bold" fontSize="lg" color={color}>
                      {validUser.name}
                    </Text>
                  </VStack>
                  <Divider />
                </>
              )}
              <Button
                colorScheme="red"
                width="full"
                size={buttonSize}
                variant="solid"
                onClick={logoutHandler}
                _hover={{ bg: "red.600" }}
                _active={{ bg: "red.700" }}
                transition="background-color 0.2s"
              >
                Logout
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Header;
