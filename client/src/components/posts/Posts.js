import React from 'react';
import { useSelector } from 'react-redux';

import { Flex, Text } from '@chakra-ui/react';
import Post from './post/Post';
import InfiniteScroll from 'react-infinite-scroll-component';

import LoaderPost from './loader/LoaderPost';

const Posts = ({ posts, fetchPosts }) => {
  const { postLength, isLoading } = useSelector((state) => state.post);

  return posts.length === 0 && isLoading ? (
    <Flex w="50%" padding="2rem" direction="column">
      <LoaderPost />
    </Flex>
  ) : (
    <Flex w="40%" direction="column" padding="2rem 2rem">
      <Flex direction="column-reverse" w="100%" columns={1}>
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchPosts}
          hasMore={posts.length < postLength ? true : false}
          loader={<LoaderPost />}
          endMessage={<Text>Yay! You have seen it all!</Text>}
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

export default Posts;
