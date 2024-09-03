/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useLoginUserMutation } from "../redux/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setValidUser } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
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
  Text,
} from "@chakra-ui/react";

const Login = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const validUser = useSelector((state) => state.authSlice.validUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.number()
      .required("Password is required")
      .min(4, "Password must be at least 4 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const { existingUser } = await loginUser(values).unwrap();
        toast({
          title: "Login success.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        dispatch(setValidUser(existingUser));
        navigate("/");
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
      className="login-page"
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
      <Box width="350px" p={6} boxShadow="lg" bg="white" borderRadius="xl">
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={6} align="flex-start">
            <Heading
              as="h4"
              size="lg"
              textAlign="center"
              w="full"
              color="purple.600"
            >
              Login
            </Heading>
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
              Login
            </Button>
            <Box
              display="flex"
              justifyContent="center"
              gap={1}
              textAlign="center"
              width="100%"
              textColor="purple.500"
            >
              <Text textColor="black">Not a user? </Text>
              <Link to="/register">Click Here to Register</Link>
            </Box>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
