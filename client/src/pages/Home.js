import React, { useEffect, useState } from 'react';

import Posts from '../components/posts/Posts';
import { Flex } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/posts';

const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPosts = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    dispatch(getPosts(currentPage));
  }, [dispatch, currentPage]);

  return (
    <Flex w="100%" direction="row" justify="center">
      <Posts {...{ posts, fetchPosts, currentPage }} />
    </Flex>
  );
};

export default Home;
