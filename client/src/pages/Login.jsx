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
  }, [navigate]);

  return (
    <Box className="login-page" p={5}>
      {isLoading && <Spinner thickness="4px" size="md" color="black" />}
      <Box width="400px" p="4">
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4} align="flex-center">
            <Heading as="h4" size="md">
              Login Form
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
                <div>{formik.errors.email}</div>
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
                <div>{formik.errors.password}</div>
              ) : null}
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
