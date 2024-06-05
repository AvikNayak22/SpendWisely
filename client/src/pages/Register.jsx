import { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import axios from "axios";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

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
    },
  });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Box className="register-page" p={5}>
      {loading && <Spinner thickness="4px" size="md" color="black" />}
      <Box width="400px" p="4">
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4} align="flex-center">
            <Heading as="h4" size="md">
              Register Form
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
                <div>{formik.errors.name}</div>
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
