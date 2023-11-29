import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Flex,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { likePost } from '../../../actions/posts';

const Post = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const user = useState(JSON.parse(localStorage.getItem('profile')));

  // console.log(post);

  // const like = () => {
  //   dispatch(likePost(post._id));
  // };

  // const Likes = () => {
  //   if (post.likes.length > 0) {
  //     return post.likes.find((like) => like === user?.result?._id) ? (
  //       <AiFillHeart />
  //     ) : (
  //       <AiOutlineHeart />
  //     );
  //   }
  //   return <AiOutlineHeart />;
  // };

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
              onClick={() => navigate(`/user/${post.creator.username}`)}
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
        <Flex m="1rem">
          {post.tags.map((tag) => (
            <Button
              size={{ base: '100%', md: '25%' }}
              variant="secondaryInvert"
              key={`${post._id}${tag}`}
              onClick={() => navigate(`/search?searchQuery=${tag}`)}
              mr={{ base: '20px', md: '10px' }}
            >
              {tag}
            </Button>
          ))}
        </Flex>
        <CardFooter h="3rem" mb="1rem">
          <Flex w="100%" justify="flex-end">
            <Flex align="center">
              {post.likes.length > 0 && (
                <Text color="white" fontSize={{ base: '120%', xl: '80%' }}>
                  {post.likes.length === 1
                    ? `${post.likes.length} beat`
                    : `${post.likes.length} beats`}
                </Text>
              )}
              <IconButton
                variant="onlyIcon"
                fontSize={{ base: '150%', xl: '100%' }}
                onClick={() => {
                  navigate(`/${post._id}`);
                }}
                icon={<AiOutlineHeart />}
              />
            </Flex>
            <Flex align="center">
              {post.comments.length > 0 && (
                <Text color="text" fontSize={{ base: '120%', xl: '80%' }}>
                  {post.comments.length}
                </Text>
              )}
              <IconButton
                variant="onlyIcon"
                fontSize={{ base: '150%', xl: '100%' }}
                onClick={() => {
                  navigate(`/${post._id}`);
                }}
                icon={<AiOutlineMessage />}
              />
            </Flex>
          </Flex>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default Post;
