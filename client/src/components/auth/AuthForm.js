import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

import { login, signup } from "../../actions/auth";

const validationSchemaSignUp = Yup.object({
  email: Yup.string("Enter a email")
    .required("Email is required")
    .email("Invalid email"),

  name: Yup.string("Enter a name")
    .required("Name is required")
    .min(1, "Too Short!")
    .max(10, "Too Long!"),

  username: Yup.string("Enter a username")
    .required("Username is required")
    .min(3, "Too Short!")
    .max(15, "Too Long!"),

  password: Yup.string("Enter a password"),

  profileImage: Yup.string("Select a Image"),

  repeatPassword: Yup.string("Retype your Password").oneOf(
    [Yup.ref("password")],
    "Passwords must match"
  ),
});

const validationSchemaLogIn = Yup.object({
  username: Yup.string("Enter a username")
    .required("Username is required")
    .min(3, "Too Short!")
    .max(15, "Too Long!"),

  password: Yup.string("Enter a password"),
});

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();
  const [isSignUp, setIsSignUp] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const [seeRepeatPassword, setSeeRepeatPassword] = useState(false);
  const [image, setImage] = useState();
  const [showImage, setShowImage] = useState();

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      username: "",
      password: "",
      repeatPassword: "",
      profileImage: "",
    },
    onSubmit: (formData) => {
      if (isSignUp) {
        dispatch(signup({ ...formData }, navigate));
        console.log({ ...formData });
      } else {
        dispatch(login(formData, navigate));
        console.log(formData);
      }
    },
    validationSchema: isSignUp ? validationSchemaSignUp : validationSchemaLogIn,
  });

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue("profileImage", reader.result.toString());
        setShowImage(reader.result.toString());
      };
      reader.readAsDataURL(image);
    } else {
      formik.setFieldValue("profileImage", null);
    }
  }, [image]);

  return (
    <Flex
      direction="column"
      bg="#1c1a24"
      w="50%"
      h={isSignUp ? "80%" : "60%"}
      justify="center"
      align="center"
      borderRadius="20px"
    >
      <Heading color="white" mb="3rem">
        {isSignUp ? "Sign Up" : "Sign In"}
      </Heading>

      <form
        mt="1rem"
        w="100%"
        padding="2rem"
        align="center"
        onSubmit={formik.handleSubmit}
      >
        {isSignUp && (
          <Flex direction="column">
            <FormLabel color="white">Image</FormLabel>
            <Input
              type="file"
              style={{ display: "none" }}
              ref={inputRef}
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files[0];
                if (file && file.type.substr(0, 5) === "image") {
                  setImage(file);
                } else {
                  setImage(null);
                }
              }}
            />
            <Flex w="100%" align="center">
              {showImage && <Avatar src={showImage} borderRadius="0%" />}
              <Button
                w={showImage ? "80%" : "100%"}
                onClick={() => inputRef.current.click()}
                ml={showImage ? "1rem" : "none"}
              >
                Select a Image
              </Button>
            </Flex>
          </Flex>
        )}
        {isSignUp && (
          <>
            <FormControl>
              <FormLabel color="white" mt="1rem">
                Email
              </FormLabel>
              <Input
                variant="filled"
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                text-align="initial"
                resize="none"
              />
            </FormControl>
            <FormControl mt="1rem">
              <FormLabel color="white">Name</FormLabel>
              <Input
                variant="filled"
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                text-align="initial"
                resize="none"
              />
            </FormControl>
          </>
        )}
        <FormControl mt={isSignUp ? "1rem" : "0rem"}>
          <FormLabel color="white">Username</FormLabel>
          <Input
            variant="filled"
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            text-align="initial"
            resize="none"
          />
        </FormControl>
        <FormControl mt="1rem">
          <FormLabel color="white">Password</FormLabel>
          <InputGroup>
            <Input
              variant="filled"
              type={seePassword ? "text" : "password"}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              text-align="initial"
              resize="none"
            />
            <InputRightElement
              onClick={() => setSeePassword(!seePassword)}
              children={
                seePassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />
              }
            />
          </InputGroup>
        </FormControl>
        {isSignUp && (
          <FormControl mt="1rem">
            <FormLabel color="white">Repeat Password</FormLabel>
            <InputGroup>
              <Input
                variant="filled"
                type={seeRepeatPassword ? "text" : "password"}
                name="repeatPassword"
                value={formik.values.repeatPassword}
                onChange={formik.handleChange}
                text-align="initial"
                resize="none"
              />
              <InputRightElement
                onClick={() => setSeeRepeatPassword(!seeRepeatPassword)}
                children={
                  seeRepeatPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )
                }
              />
            </InputGroup>
          </FormControl>
        )}
        <Button w="30%" type="submit" mt="2rem">
          Send
        </Button>
      </form>

      <Button
        mt="1rem"
        onClick={() => setIsSignUp(!isSignUp)}
        variant="none"
        color="#4fc5ee"
      >
        {isSignUp
          ? "Already have an account? Sign in"
          : "Don't have an account? Sign up"}
      </Button>
    </Flex>
  );
};

export default AuthForm;
