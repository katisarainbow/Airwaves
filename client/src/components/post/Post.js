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
import LoaderPost from '../posts/loader/LoaderPost';

const Post = ({ postView }) => {
  const post = postView;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [comments, setComments] = useState(false);
  const user = JSON.parse(localStorage.getItem('profile'));

  console.log(postView);
  if (!post) {
    return <LoaderPost />;
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
    <Flex
      bg="red"
      w="100%"
      padding={{ base: '0px', xl: '2rem' }}
      align="center"
      justify="center"
    >
      <Flex
        bg="secondary"
        h="auto"
        w={{ base: '100%', xl: '50%' }}
        align="center"
        justify="center"
        padding="1rem 2rem"
        direction="column"
        borderRadius={{ base: '0px', xl: '30px' }}
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
              size={{ base: 'lg', xl: 'md' }}
              borderRadius="none"
            />
            <Flex direction="column">
              <Text
                color="white"
                ml="1rem"
                fontSize={{ base: '150%', xl: '100%' }}
              >
                {post.creator.name ? post.creator.name : 'Name'}
              </Text>
              <Text
                color="text"
                ml="1rem"
                fontSize={{ base: '120%', xl: '100%' }}
              >
                @{post.creator.username ? post.creator.username : 'username'}
              </Text>
            </Flex>
          </Flex>
          {user?.result?._id === post?.creator._id && (
            <MoreMenu {...{ post }} />
          )}
        </Flex>
        <Image w="100%" src={post.image ? post.image : post.selectedFile} />

        <Flex w="100%" padding="1rem" direction="column">
          <Heading color="white">{post.title}</Heading>
          <Text fontSize={{ base: '150%', xl: '100%' }} color="white" mt="1rem">
            {post.description}
          </Text>
        </Flex>
        <Flex w="100%" padding="0rem 1rem" mt="1rem">
          {post.tags.map((tag) => (
            <Button
              size={{ base: '150%', xl: '50%' }}
              variant="secondaryInvert"
              key={`${post._id}${tag}`}
              onClick={() => navigate(`/search?searchQuery=${tag}`)}
              mr={{ base: '20px', xl: '10px' }}
            >
              {tag}
            </Button>
          ))}
        </Flex>
        <Flex w="100%" justify="flex-end" padding="1rem">
          <ButtonGroup gap={1}>
            {post.likes.length > 0 && (
              <Text
                fontSize={{ base: '150%', xl: '100%' }}
                color="white"
                alignSelf="center"
              >
                {post.likes.length === 1
                  ? `${post.likes?.length} beat`
                  : `${post.likes?.length} beats`}
              </Text>
            )}
            <IconButton
              variant="secondaryInvert"
              fontSize={{ base: '150%', xl: '100%' }}
              onClick={() => {
                user ? like() : navigate('/auth');
              }}
            >
              <Likes />
            </IconButton>
            <IconButton
              variant="secondaryInvert"
              fontSize={{ base: '150%', xl: '100%' }}
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
