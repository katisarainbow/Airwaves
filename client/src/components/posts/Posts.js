import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import Post from "./post/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { getPostsLength } from "../../actions/posts";

const Posts = ({ posts, fetchPosts, currentPage }) => {
  return !posts?.length ? (
    <Text>no posts</Text>
  ) : (
    <Flex w="50%" bg="#03010c" direction="column" padding="2rem 2rem">
      <Flex direction="column-reverse" w="100%" columns={1}>
        <InfiniteScroll
          dataLength="13"
          next={fetchPosts}
          hasMore={true}
          loader={<h1>loading</h1>}
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
