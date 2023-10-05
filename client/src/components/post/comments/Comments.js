import React, { useEffect, useState } from 'react';
import { Flex, IconButton, Textarea } from '@chakra-ui/react';
import { AiOutlineCheck } from 'react-icons/ai';

import Comment from './comment/Comment';
import { getPostComments, commentPost } from '../../../api';

const Comments = ({ post }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    const fetchPostComments = async () => {
      const data = await getPostComments(post._id);
      setComments(data.data);
    };
    fetchPostComments();
  }, [post]);

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
          bg="secondary"
          borderColor="none"
          w="93%"
          size="sm"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <IconButton
          variant="secondary"
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
