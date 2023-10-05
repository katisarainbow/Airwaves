import React, { useState } from 'react';
import { Avatar, Flex, IconButton, Text } from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import MoreComments from '../../../menu/more/MoreComments';
import EditComment from './edit/EditComment';
import { likeComment } from '../../../../api';
import { useNavigate, useParams } from 'react-router-dom';

const Comment = ({ comment }) => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [editComment, setEditComment] = useState(false);
  const [commentId, setCommentId] = useState('');

  const getId = (id) => {
    setCommentId(id);
    setEditComment(true);
  };

  const like = () => {
    likeComment(postId, comment._id);
  };

  const Likes = () => {
    if (comment.likes.length > 0) {
      return comment.likes.find((like) => like === user?.result?._id) ? (
        <AiFillHeart />
      ) : (
        <AiOutlineHeart />
      );
    }
    return <AiOutlineHeart />;
  };

  return (
    <Flex mt="1rem" w="90%">
      <Avatar
        size="sm"
        borderRadius="none"
        src={comment.profileImage}
        mt="5px"
      />
      <Flex
        bg="secondary"
        direction="column"
        padding="5px 15px"
        ml="1rem"
        borderRadius="10px"
        w="60%"
      >
        <Flex justify="space-between" align="center">
          <Text
            fontSize="sm"
            color="white"
            _hover={{ color: 'primary' }}
            cursor="pointer"
          >
            @{comment.username}
          </Text>
          {user?.result?._id === comment.creator && (
            <MoreComments {...{ comment: comment, getId }} />
          )}
        </Flex>
        {commentId === comment._id && editComment ? (
          <EditComment
            {...{
              comment: comment.comment,
              commentId: comment._id,
            }}
          />
        ) : (
          <Text fontSize="sm" margin="0.5rem" color="white">
            {comment.comment}
          </Text>
        )}
        <Flex direction="row" alignSelf="end" justify="center">
          {comment.likes.length > 0 && (
            <Text fontSize="xs" alignSelf="center" color="white">
              {comment.likes.length === 1
                ? `1 beat`
                : `${comment.likes?.length} beats`}
            </Text>
          )}
          <IconButton
            isRound={true}
            size="xs"
            variant="iconPost"
            alignSelf="end"
            margin="0.5rem "
            icon={<Likes />}
            onClick={() => {
              user ? like() : navigate('/auth');
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Comment;
