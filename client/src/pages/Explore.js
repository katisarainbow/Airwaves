import React, { useEffect, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { fetchFollowingPosts } from '../api';
import ExplorePosts from '../components/posts/ExplorePosts';

const Explore = ({ user }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState();
  const [postLength, setPostLength] = useState();

  const fetchPosts = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const getPosts = async () => {
      const followingPosts = await fetchFollowingPosts(
        currentPage,
        user.result._id
      );
      setPosts(followingPosts.data.data);
      setPostLength(followingPosts.data.postLength);
    };

    getPosts();
  }, [currentPage, user.result._id]);
  console.log(posts);

  return posts?.length > 0 ? (
    <Flex>
      <ExplorePosts {...{ posts, postLength, fetchPosts }} />
    </Flex>
  ) : (
    <Text>No hay</Text>
  );
};

export default Explore;
