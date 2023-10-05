import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Card,
  CardFooter,
  CardHeader,
  Flex,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react';
import { AiOutlineHeart } from 'react-icons/ai';

const Post = ({ post }) => {
  const navigate = useNavigate();

  return (
    <Flex w="100%" mb="1rem">
      <Avatar
        mr="1rem"
        src={post.creator.profileImage}
        borderRadius="0px"
        cursor="pointer"
      />

      <Card w="100%" h="50%" bg="secondary">
        <CardHeader w="100%" padding="0rem 1rem">
          <Flex w="100%" h="3rem" align="center">
            <Text
              color="white"
              _hover={{ color: 'primary' }}
              cursor="pointer"
              onClick={() => navigate(`/user/${post.username}`)}
            >
              @{post.creator.username ? post.creator.username : 'username'}
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

        <CardFooter h="3rem">
          <Flex w="100%" justify="flex-end" align="center">
            {post.likes > 0 && (
              <Text color="white">
                {post.likeCount === 1
                  ? `${post.likeCount} beat`
                  : `${post.likeCount} beats`}
              </Text>
            )}
            <IconButton
              variant="onlyIcon"
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
