import React from "react";
import { useParams } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

import Post from "../components/post/Post";

const PostPage = ({ posts }) => {
  const { postId } = useParams();

  const postView = posts.filter((post) => {
    return post._id === postId;
  });

  return (
    <Flex>{postView ? <Post {...{ postView }} /> : "no hay post :p"}</Flex>
  );
};

export default PostPage;
