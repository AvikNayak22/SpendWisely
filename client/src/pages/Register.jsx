import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Heading,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  // Form submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("api/v1/users/register", values);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast({
        title: "Something went wrong",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  // Prevent for logged-in user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Box className="register-page" p={5}>
      {loading && <Spinner thickness="4px" size="md" color="black" />}
      <Box width="400px" p="4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const values = Object.fromEntries(formData.entries());
            submitHandler(values);
          }}
        >
          <VStack spacing={4} align="flex-center">
            <Heading as="h4" size="md">
              Register Form
            </Heading>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input name="name" placeholder="Enter your full name..." />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email address..."
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                placeholder="Enter your password..."
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="full">
              Register
            </Button>
            <Box textAlign="center" width="100%" textColor="blue.500">
              <Link to="/login">Already Registered? Click Here to login</Link>
            </Box>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
