import { Flex, Text } from '@chakra-ui/react';
import { GoAlert } from 'react-icons/go';
import React from 'react';

const Error = ({ error }) => {
  return (
    <Flex align="center" color="accent" mt="0.5rem">
      <GoAlert />
      <Text ml="0.5rem" fontSize="xs">
        {error}
      </Text>
    </Flex>
  );
};

export default Error;
