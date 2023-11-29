import React, { useEffect, useRef, useState } from 'react';
import {
  Avatar,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Text,
  VisuallyHiddenInput,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login, signup } from '../../actions/auth';

import {
  validationSchemaLogIn,
  validationSchemaSignUp,
} from './ValidationSchema';
import InputComponent from './InputComponent';
import Error from './Error';

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();
  const [isSignUp, setIsSignUp] = useState(false);
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
      } else {
        dispatch(login(formData, navigate));
      }
    },
    validationSchema: isSignUp ? validationSchemaSignUp : validationSchemaLogIn,
  });

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
      w={{ base: '80%', xl: '30%' }}
      justify="center"
      align="center"
      borderRadius="20px"
      color="white"
      padding="2rem"
      mt="4rem"
    >
      {isSignUp ? (
        <Flex mb="2rem">
          <Text fontSize="2rem">Sign Up</Text>
        </Flex>
      ) : (
        <Flex>
          <Text fontSize="2rem">Sign In</Text>
        </Flex>
      )}

      <form padding="1rem" align="end" onSubmit={formik.handleSubmit}>
        {isSignUp && (
          <Flex w="100%" direction="column">
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
            <Flex w="100%" align="center" direction="column">
              {showImage && <Avatar src={showImage} borderRadius="0%" />}
              <Button
                variant="primary"
                w={showImage ? '80%' : '100%'}
                onClick={() => inputRef.current.click()}
                ml={showImage ? '1rem' : 'none'}
              >
                Select a Image
              </Button>
              {formik.errors.profileImage && formik.touched.profileImage ? (
                <Error error={formik.errors.profileImage} />
              ) : null}
            </Flex>
          </Flex>
        )}
        {isSignUp && (
          <>
            <InputComponent
              label="Email"
              type="text"
              name="email"
              value={formik.values.email}
              handleChange={formik.handleChange}
            />
            {formik.errors.email && formik.touched.email ? (
              <Error error={formik.errors.email} />
            ) : null}
            <InputComponent
              label="Name"
              type="text"
              name="name"
              value={formik.values.name}
              handleChange={formik.handleChange}
            />
            {formik.errors.name && formik.touched.name ? (
              <Error error={formik.errors.name} />
            ) : null}
          </>
        )}

        <InputComponent
          label="Username"
          type="text"
          name="username"
          value={formik.values.username}
          handleChange={formik.handleChange}
        />
        {formik.errors.username && formik.touched.username ? (
          <Error error={formik.errors.username} />
        ) : null}
        <InputComponent
          label="Password"
          name="password"
          value={formik.values.password}
          handleChange={formik.handleChange}
        />
        {formik.errors.password && formik.touched.password ? (
          <Error error={formik.errors.password} />
        ) : null}

        {isSignUp && (
          <>
            <InputComponent
              label="Repeat Password"
              name="repeatPassword"
              value={formik.values.repeatPassword}
              handleChange={formik.handleChange}
            />
            {formik.errors.repeatPassword && formik.touched.repeatPassword ? (
              <Error error={formik.errors.repeatPassword} />
            ) : null}
          </>
        )}

        <Button
          variant="primary"
          type="submit"
          mt="1rem"
          mb={!isSignUp ? '2rem' : '0px'}
          size="sm"
        >
          Send
        </Button>
      </form>
      <Button
        mt="2rem"
        onClick={() => setIsSignUp(!isSignUp)}
        variant="textOnly"
        mb={isSignUp && '2rem'}
      >
        {isSignUp
          ? 'Already have an account? Sign in'
          : "Don't have an account? Sign up"}
      </Button>
    </Flex>
  );
};

export default AuthForm;
