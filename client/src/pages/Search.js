import React from 'react';

import { Flex } from '@chakra-ui/react';
import SearchPosts from '../components/post/SearchPosts';

const Search = () => {
  return (
    <Flex w="100%" direction="row" justify="center">
      <SearchPosts />
    </Flex>
  );
};

export default Search;
