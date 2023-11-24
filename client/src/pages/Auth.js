import React from 'react';
import { Flex } from '@chakra-ui/react';

import AuthForm from '../components/auth/AuthForm';

const Auth = () => {
  return (
    <Flex w="100%" align="center" justify="center">
      <AuthForm />
    </Flex>
  );
};

export default Auth;
