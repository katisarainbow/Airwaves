import React, { useEffect, useRef, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
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
  VisuallyHiddenInput,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { Form, useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

import signupimage from '../../assets/signupimage.png';

import { login, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';

const validationSchemaSignUp = Yup.object({
  email: Yup.string('Enter a email')
    .required('Email is required')
    .email('Invalid email'),

  name: Yup.string('Enter a name')
    .required('Name is required')
    .min(1, 'Too Short!')
    .max(10, 'Too Long!'),

  username: Yup.string('Enter a username')
    .required('Username is required')
    .min(3, 'Too Short!')
    .max(15, 'Too Long!'),

  password: Yup.string('Enter a password'),

  profileImage: Yup.string('Select a Image'),

  repeatPassword: Yup.string('Retype your Password').oneOf(
    [Yup.ref('password')],
    'Passwords must match'
  ),
});

const validationSchemaLogIn = Yup.object({
  username: Yup.string('Enter a username')
    .required('Username is required')
    .min(3, 'Too Short!')
    .max(15, 'Too Long!'),

  password: Yup.string('Enter a password'),
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
      email: '',
      name: '',
      username: '',
      password: '',
      repeatPassword: '',
      profileImage: '',
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

  const googleSuccess = async (res) => {
    const token = res?.credential;
    const result = jwt_decode(token);
    // try {
    //   dispatch({ type: AUTH, data: { result, token } });
    //   navigate("/");
    // } catch (error) {
    //   console.log(error);
    // }

    console.log(result);
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log('Google Sign In Was Unsuccessful. Try Again Later.');
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue('profileImage', reader.result.toString());
        setShowImage(reader.result.toString());
      };
      reader.readAsDataURL(image);
    } else {
      formik.setFieldValue('profileImage', null);
    }
  }, [image]);

  return (
    <Flex
      direction="column"
      bg="secondary"
      w="30%"
      h={isSignUp ? '80vh' : '50vh'}
      justify="center"
      align="center"
      borderRadius="20px"
      color="white"
    >
      <Flex mb="1rem">{isSignUp && <Image src={signupimage} w="400px" />}</Flex>

      <form align="end" onSubmit={formik.handleSubmit}>
        {isSignUp && (
          <Flex direction="column">
            <FormLabel>Image</FormLabel>
            <VisuallyHiddenInput
              type="file"
              ref={inputRef}
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files[0];
                if (file && file.type.substr(0, 5) === 'image') {
                  setImage(file);
                } else {
                  setImage(null);
                }
              }}
            />
            <Flex w="100%" align="center">
              {showImage && <Avatar src={showImage} borderRadius="0%" />}
              <Button
                variant="primary"
                w={showImage ? '80%' : '100%'}
                onClick={() => inputRef.current.click()}
                ml={showImage ? '1rem' : 'none'}
              >
                Select a Image
              </Button>
            </Flex>
          </Flex>
        )}
        {isSignUp && (
          <>
            <FormControl>
              <FormLabel mt="0.5em">Email</FormLabel>
              <Input
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                text-align="initial"
                resize="none"
              />
            </FormControl>
            <FormControl mt="0.5em">
              <FormLabel>Name</FormLabel>
              <Input
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
        <FormControl mt={isSignUp ? '0.5rem' : '0rem'}>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            text-align="initial"
            resize="none"
          />
        </FormControl>
        <FormControl mt="0.5em">
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={seePassword ? 'text' : 'password'}
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
          <FormControl mt="0.5em">
            <FormLabel>Repeat Password</FormLabel>
            <InputGroup>
              <Input
                type={seeRepeatPassword ? 'text' : 'password'}
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

        <Button
          w="30%"
          variant="primary"
          type="submit"
          mt="1rem"
          mb={!isSignUp ? '2rem' : '0px'}
        >
          Send
        </Button>
      </form>
      {!isSignUp && (
        <GoogleLogin onSuccess={googleSuccess} onError={googleFailure} />
      )}
      <Button
        mt="1rem"
        onClick={() => setIsSignUp(!isSignUp)}
        variant="none"
        color="accent"
      >
        {isSignUp
          ? 'Already have an account? Sign in'
          : "Don't have an account? Sign up"}
      </Button>
    </Flex>
  );
};

export default AuthForm;
