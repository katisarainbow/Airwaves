import React from 'react';
import { Flex } from '@chakra-ui/react';

import AuthForm from '../components/auth/AuthForm';

const Auth = () => {
  return (
    <Flex
      w="100%"
      align="center"
      justify="center"
      mt={{ base: '80px', xl: '60px' }}
    >
      <AuthForm />
    </Flex>
  );
};

export default Auth;
