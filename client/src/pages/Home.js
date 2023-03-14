import React from "react";

import RightContent from "../components/rightContent/RightContent";
import Posts from "../components/posts/Posts";
import { Flex } from "@chakra-ui/react";

const Home = ({ posts, user, fetchPosts, currentPage }) => {
  return (
    <Flex bg="#03010c" direction="row" justify="center">
      <Posts {...{ posts, fetchPosts, currentPage }} />
      <RightContent {...{ user }} />
    </Flex>
  );
};

export default Home;
