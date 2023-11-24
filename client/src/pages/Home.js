import React, { useEffect, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { fetchFollowingPosts } from '../api';
import Posts from '../components/posts/Posts';
import { useNavigate } from 'react-router-dom';
import LoaderPost from '../components/posts/loader/LoaderPost';

const Home = ({ user }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState();
  const [postLength, setPostLength] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    if (user) {
      const getPosts = async () => {
        const followingPosts = await fetchFollowingPosts(
          currentPage,
          user.result._id
        );
        setPosts(followingPosts.data.data);
        setPostLength(followingPosts.data.postLength);
      };

      getPosts();
      setIsLoading(false);
    } else {
      navigate('/auth');
    }
  }, [currentPage, user.result]);

  if (isLoading) {
    <LoaderPost />;
  }

  return posts?.length > 0 ? (
    <Flex justify="center">
      <Posts {...{ posts, postLength, fetchPosts }} />
    </Flex>
  ) : (
    <Flex w="40%" align="center" justify="center">
      <Text>Follow artist for more</Text>
    </Flex>
  );
};

export default Home;
