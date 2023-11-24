import React from 'react';
import { useSelector } from 'react-redux';

import { Flex, Text } from '@chakra-ui/react';
import Post from './post/Post';
import InfiniteScroll from 'react-infinite-scroll-component';

import LoaderPost from './loader/LoaderPost';

const ExplorePosts = ({ posts, fetchPosts }) => {
  const { postLength, isLoading } = useSelector((state) => state.post);

  return posts.length === 0 && isLoading ? (
    <Flex width="50%" padding="2rem" direction="column">
      <LoaderPost />
      <LoaderPost />
    </Flex>
  ) : (
    <Flex
      w={{ base: '100%', xl: '40%' }}
      direction="column"
      padding="2rem 2rem"
      s
    >
      <Flex direction="column-reverse" w="100%">
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchPosts}
          hasMore={posts.length < postLength ? true : false}
          loader={<LoaderPost />}
          endMessage={
            <Text align="center" m="2rem" color="accent">
              Yay! You have seen it all!
            </Text>
          }
        >
          {posts.map((post) => (
            <div key={post._id}>
              <Post {...{ post }} />
            </div>
          ))}
        </InfiniteScroll>
      </Flex>
    </Flex>
  );
};

export default ExplorePosts;
