import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Avatar,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react';

import { AiOutlineMessage, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

import MoreMenu from '../menu/more/MoreMenu';
import { likePost } from '../../actions/posts';
import Comments from './comments/Comments';
import { useNavigate } from 'react-router-dom';

const Post = ({ postView }) => {
  const post = postView;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [comments, setComments] = useState(false);
  const user = JSON.parse(localStorage.getItem('profile'));

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
    <Flex w="100%" padding="2rem" align="center" justify="center">
      <Flex
        bg="secondary"
        h="auto"
        align="center"
        justify="center"
        padding="1rem 2rem"
        direction="column"
        borderRadius="30px"
      >
        <Flex w="100%" align="center" justify="space-between" mb="1rem">
          <Flex
            justify="center"
            align="center"
            cursor="pointer"
            onClick={() => navigate(`/user/${post.creator.username}`)}
          >
            <Avatar
              src={post.creator.profileImage}
              size="md"
              borderRadius="none"
            />
            <Flex direction="column">
              <Text color="white" ml="1rem">
                {post.creator.name ? post.creator.name : 'Name'}
              </Text>
              <Text fontSize="xs" color="text" ml="1rem">
                @{post.creator.username ? post.creator.username : 'username'}
              </Text>
            </Flex>
          </Flex>
          {user?.result?._id === post?.creator._id && (
            <MoreMenu {...{ post }} />
          )}
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
              size="xs"
              variant="secondaryInvert"
              key={`${post._id}${tag}`}
              onClick={() => navigate(`/search?searchQuery=${tag}`)}
              mr="10px"
            >
              {tag}
            </Button>
          ))}
        </Flex>
        <Flex w="100%" justify="flex-end" padding="1rem">
          <ButtonGroup gap={1}>
            {post.likes.length > 0 && (
              <Text fontSize="sm" color="white" alignSelf="center">
                {post.likes.length === 1
                  ? `${post.likes?.length} beat`
                  : `${post.likes?.length} beats`}
              </Text>
            )}
            <IconButton
              variant="secondaryInvert"
              size="sm"
              onClick={() => {
                user ? like() : navigate('/auth');
              }}
            >
              <Likes />
            </IconButton>
            <IconButton
              variant="secondaryInvert"
              size="sm"
              onClick={() => {
                user ? setComments(!comments) : navigate('/auth');
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
