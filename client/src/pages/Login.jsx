import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Spinner,
  useToast,
  Heading,
} from "@chakra-ui/react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const { data } = await axios.post("api/v1/users/login", values);
        setLoading(false);
        toast({
          title: "Login success.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        localStorage.setItem(
          "user",
          JSON.stringify({ ...data.user, password: "" })
        );
        navigate("/");
      } catch (error) {
        setLoading(false);
        toast({
          title: "Something went wrong.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    },
  });

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Box className="login-page" p={5}>
      {loading && <Spinner thickness="4px" size="md" color="black" />}
      <Box width="400px" p="4">
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4} align="flex-center">
            <Heading as="h4" size="md">
              Login Form
            </Heading>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email address..."
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                placeholder="Enter your password..."
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="full">
              Login
            </Button>
            <Box textAlign="center" width="100%" textColor="blue.500">
              <Link to="/register">Not a user? Click Here to Register</Link>
            </Box>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
