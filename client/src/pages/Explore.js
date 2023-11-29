import React, { useEffect, useState } from 'react';

import ExplorePosts from '../components/posts/ExplorePosts';
import { Flex } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/posts';
import LoaderPost from '../components/posts/loader/LoaderPost';

const Explore = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    dispatch(getPosts(currentPage));
    setIsLoading(false);
  }, [dispatch, currentPage]);

  if (isLoading) {
    <LoaderPost />;
  }

  return (
    <Flex
      w="100%"
      direction="row"
      justify="center"
      mt={{ base: '80px', xl: '60px' }}
    >
      <ExplorePosts {...{ posts, fetchPosts, currentPage }} />
    </Flex>
  );
};

export default Explore;
