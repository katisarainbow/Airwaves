import React, { useState } from 'react';
import { Flex, IconButton, Textarea } from '@chakra-ui/react';
import { AiOutlineCheck } from 'react-icons/ai';

import Comment from './comment/Comment';
import { commentPost } from '../../../api';

const Comments = ({ post }) => {
  const [comment, setComment] = useState('');
  const comments = post.comments;
  const user = JSON.parse(localStorage.getItem('profile'));

  const handleSubmit = () => {
    const finalComment = {
      comment: comment,
      username: user?.result?.username,
      profileImage: user?.result?.profileImage,
    };
    commentPost(post._id, finalComment);
  };

  return (
    <Flex
      bg="background"
      w="100%"
      direction="column"
      align="center"
      padding="1rem"
      mt="1rem"
    >
      <Flex w="100%" align="center" justify="space-between">
        <Textarea
          variant="primary"
          w="93%"
          size="sm"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <IconButton
          variant="icon"
          disabled={!comment?.length}
          size="sm"
          icon={<AiOutlineCheck />}
          onClick={handleSubmit}
        />
      </Flex>
      {comments && (
        <Flex direction="column" w="100%">
          {comments?.map((comment) => (
            <Flex w="100%" direction="column-reverse" key={comment._id}>
              <Comment {...{ comment }} />
            </Flex>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default Comments;
