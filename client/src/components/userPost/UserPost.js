import { SimpleGrid, Image } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserPost = ({ userInfo }) => {
  const navigate = useNavigate();

  return (
    userInfo && (
      <SimpleGrid mt="1rem" h="30rem" columns={4}>
        {userInfo.posts?.map((post) => (
          <Image
            src={post.selectedFile}
            key={post._id}
            cursor="pointer"
            onClick={() => navigate(`/${post._id}`)}
            _hover={{ filter: 'brightness(50%)' }}
            _active={{ transform: 'translateY(2px)' }}
          />
        ))}
      </SimpleGrid>
    )
  );
};

export default UserPost;
