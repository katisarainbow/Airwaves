import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Card,
  CardFooter,
  CardHeader,
  Flex,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { AiOutlineHeart } from "react-icons/ai";

const Post = ({ post }) => {
  const navigate = useNavigate();

  return (
    <Flex w="100%" mb="1rem">
      <Flex w="15%" justify="center">
        <Avatar
          src={post.profileImage}
          position="sticky"
          borderRadius="5px"
          top="1rem"
        />
      </Flex>
      <Card w="100%" bg="#1c1a24">
        <CardHeader w="100%" padding="0rem 1rem">
          <Flex w="100%" h="3rem" align="center">
            <Text color="white">
              @{post.username ? post.username : "username"}
            </Text>
          </Flex>
        </CardHeader>

        <Image
          src={post.image ? post.image : post.selectedFile}
          cursor="pointer"
          onClick={() => {
            navigate(`/${post._id}`);
          }}
        />

        <CardFooter>
          <Flex w="100%" justify="space-between" align="center">
            {post.likes > 0 && (
              <Text color="white">
                {post.likeCount === 1
                  ? `${post.likeCount} beat`
                  : `${post.likeCount} beats`}
              </Text>
            )}
            <IconButton
              color="white"
              variant="ghost"
              onClick={() => {
                navigate(`/${post._id}`);
              }}
              icon={<AiOutlineHeart />}
            />
          </Flex>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default Post;
