/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
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
  useToast,
  Text,
} from "@chakra-ui/react";
import { useRegisterUserMutation } from "../redux/apiSlice";
import { useSelector } from "react-redux";

const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const validUser = useSelector((state) => state.authSlice.validUser);
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.number()
      .required("Password is required")
      .min(4, "Password must be at least 4 characters"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await registerUser(values).unwrap();
        toast({
          title: "Registration Successful",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/login");
      } catch (error) {
        toast({
          title: error.data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    },
  });

  useEffect(() => {
    if (validUser) {
      navigate("/");
    }
  }, [navigate, validUser]);

  return (
    <Box
      className="register-page"
      p={5}
      bg="gray.50"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={"column"}
    >
      {isLoading && (
        <Spinner thickness="4px" size="md" color="purple.500" mb={4} />
      )}
      <Box width="400px" p={6} boxShadow="lg" bg="white" borderRadius="xl">
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={6} align="flex-start">
            <Heading
              as="h4"
              size="lg"
              textAlign="center"
              w="full"
              color="purple.600"
            >
              Register
            </Heading>
            <FormControl
              id="name"
              isInvalid={formik.errors.name && formik.touched.name}
            >
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                placeholder="Enter your full name..."
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.errors.name && formik.touched.name ? (
                <Text color="red.500" fontSize="sm">
                  {formik.errors.name}
                </Text>
              ) : null}
            </FormControl>
            <FormControl
              id="email"
              isInvalid={formik.errors.email && formik.touched.email}
            >
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email address..."
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email ? (
                <Text color="red.500" fontSize="sm">
                  {formik.errors.email}
                </Text>
              ) : null}
            </FormControl>
            <FormControl
              id="password"
              isInvalid={formik.errors.password && formik.touched.password}
            >
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                placeholder="Enter your password..."
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && formik.touched.password ? (
                <Text color="red.500" fontSize="sm">
                  {formik.errors.password}
                </Text>
              ) : null}
            </FormControl>
            <Button type="submit" colorScheme="purple" width="full">
              Register
            </Button>
            <Box
              display="flex"
              justifyContent="center"
              gap={1}
              textAlign="center"
              width="100%"
              textColor="purple.500"
            >
              <Text textColor="black">Already Registered?</Text>
              <Link to="/login"> Click Here to login</Link>
            </Box>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
