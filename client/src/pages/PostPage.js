import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

import Post from '../components/post/Post';
import { fetchPostsById } from '../api';

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [noPost, setNoPost] = useState(false);

  useEffect(() => {
    const getPostById = async () => {
      const data = await fetchPostsById(postId);

      if (!data) return setNoPost(true);
      console.log(data);
      setPost(data);
    };

    getPostById();
  }, [postId]);

  if (noPost) {
    return 'MENTIRA';
  }

  return (
    <Flex>{post ? <Post {...{ postView: post.data }} /> : 'Loading'}</Flex>
  );
};

export default PostPage;
