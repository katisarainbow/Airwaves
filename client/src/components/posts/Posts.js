import React from 'react';
import LoaderPost from './loader/LoaderPost';
import { Flex, Text } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from './post/Post';

const Posts = ({ posts, fetchPosts, postLength }) => {
  return posts.length === 0 ? (
    <Flex w="50%" padding="2rem" direction="column">
      <LoaderPost />
      <LoaderPost />
      <LoaderPost />
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
          endMessage={
            <Text align="center" color="accent" m="2rem">
              Yay! You have seen it all! Follow more artists for more
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

export default Posts;
