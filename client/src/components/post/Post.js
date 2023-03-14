import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";

import {
  AiOutlineMessage,
  AiOutlineHeart,
  AiOutlineCheck,
  AiFillHeart,
} from "react-icons/ai";

import MoreMenu from "../menu/more/MoreMenu";
import { likePost, commentPost } from "../../actions/posts";
import Comments from "./comments/Comments";
import { useNavigate } from "react-router-dom";

const Post = ({ postView }) => {
  const post = postView[0];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [comments, setComments] = useState(false);
  const user = JSON.parse(localStorage.getItem("profile"));

  if (!post) {
    return <h1>Loading</h1>;
  }

  const like = () => {
    dispatch(likePost(post._id));
  };

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === user?.result?._id) ? (
        <AiFillHeart />
      ) : (
        <AiOutlineHeart />
      );
    }
    return <AiOutlineHeart />;
  };

  return (
    <Flex w="100%" bg="#03010c" padding="2rem" align="center" justify="center">
      <Flex
        bg="#1c1a24"
        h="auto"
        align="center"
        justify="center"
        padding="1rem 2rem"
        direction="column"
      >
        <Flex
          w="100%"
          padding="0rem 1rem"
          align="center"
          justify="space-between"
          mb="1rem"
        >
          <Flex justify="center" align="center">
            <Avatar src={post.profileImage} size="md" borderRadius="none" />
            <Flex direction="column">
              <Text color="white" ml="1rem">
                {post.name ? post.name : "Name"}
              </Text>
              <Text fontSize="xs" color="white" ml="1rem">
                @{post.username ? post.username : "username"}
              </Text>
            </Flex>
          </Flex>
          {user?.result?._id === post?.creator && <MoreMenu {...{ post }} />}
        </Flex>
        <Image w="50rem" src={post.image ? post.image : post.selectedFile} />

        <Flex w="100%" padding="1rem" direction="column">
          <Heading color="white">{post.title}</Heading>
          <Text color="white" mt="1rem">
            {post.description}
          </Text>
        </Flex>
        <Flex w="100%" padding="0rem 1rem" mt="1rem">
          {post.tags.map((tag) => (
            <Button
              color="white"
              size="xs"
              variant="outline"
              key={`${post._id}${tag}`}
              mr="10px"
            >
              {tag}
            </Button>
          ))}
        </Flex>
        <Flex w="100%" justify="flex-end" padding="1rem">
          <ButtonGroup gap={1}>
            {post.likes.length > 0 && (
              <Text color="white">
                {post.likes.length === 1
                  ? `${post.likes?.length} beat`
                  : `${post.likes?.length} beats`}
              </Text>
            )}
            <Button
              size="sm"
              onClick={() => {
                user ? like() : navigate("/auth");
              }}
            >
              <Likes />
            </Button>
            <IconButton
              size="sm"
              onClick={() => {
                user ? setComments(!comments) : navigate("/auth");
              }}
              icon={<AiOutlineMessage />}
            />
          </ButtonGroup>
        </Flex>
        {comments && user && <Comments {...{ post, user }} />}
      </Flex>
    </Flex>
  );
};

export default Post;
