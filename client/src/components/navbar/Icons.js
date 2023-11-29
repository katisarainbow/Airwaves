import { Avatar, Button, Flex, IconButton } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineHome, AiOutlinePoweroff } from 'react-icons/ai';
import { BiWorld } from 'react-icons/bi';
import ShareModal from '../modal/share/ShareModal';

const Icons = ({ logout, user, navigate }) => {
  return user ? (
    <Flex align="center" bg="background" borderRadius="20px" padding="1rem">
      <IconButton
        variant="icon"
        size="md"
        icon={<AiOutlineHome />}
        onClick={() => navigate('/')}
      />
      <IconButton
        ml="1rem"
        variant="icon"
        size="md"
        icon={<BiWorld />}
        onClick={() => navigate('/explore')}
      />
      <ShareModal />
      <IconButton
        ml="1rem"
        variant="icon"
        size="md"
        icon={<AiOutlinePoweroff />}
        onClick={() => logout()}
      />
      <Avatar
        cursor="pointer"
        src={user.result.profileImage}
        boxSize="40px"
        ml="1rem"
        onClick={() => navigate(`/user/${user.result.username}`)}
        _hover={{ filter: 'brightness(80%)' }}
      />
    </Flex>
  ) : (
    <Button
      onClick={() => navigate('/auth')}
      variant="primary"
      size="sm"
      ml="1rem"
    >
      Log in
    </Button>
  );
};

export default Icons;
