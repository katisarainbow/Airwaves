import React, { useEffect, useState } from 'react';

import { Flex, Text } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { fetchPostsBySearch } from '../../api';
import Post from '../posts/post/Post';

const SearchPosts = () => {
  const [posts, setPosts] = useState();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const searchQuery = query.get('searchQuery');

  const getPost = async () => {
    const data = await fetchPostsBySearch(searchQuery);

    setPosts(data.data.data);
  };

  useEffect(() => {
    getPost();
  }, [searchQuery]);

  return posts ? (
    <Flex direction="column-reverse" w="40%" padding="2rem 2rem">
      {posts.map((post) => (
        <div key={post._id}>
          <Post {...{ post }} />
        </div>
      ))}
    </Flex>
  ) : (
    <Text color="white"> Not found</Text>
  );
};

export default SearchPosts;
