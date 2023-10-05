import { Avatar, Button, Flex, IconButton } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineHome, AiOutlinePoweroff } from 'react-icons/ai';
import { BiWorld } from 'react-icons/bi';
import ShareModal from '../modal/share/ShareModal';

const Icons = ({ logout, user, navigate }) => {
  return (
    <Flex>
      {user ? (
        <Flex>
          <IconButton
            ml="1rem"
            variant="icon"
            size="sm"
            icon={<AiOutlineHome />}
            onClick={() => navigate('/')}
          />
          <IconButton
            ml="1rem"
            variant="icon"
            size="sm"
            icon={<BiWorld />}
            onClick={() => navigate('/explore')}
          />
          <ShareModal />
          <IconButton
            ml="1rem"
            variant="icon"
            size="sm"
            icon={<AiOutlinePoweroff />}
            onClick={() => logout()}
          />
          <Avatar
            cursor="pointer"
            src={user.result.profileImage}
            size="sm"
            ml="1rem"
            onClick={() => navigate(`/user/${user.result.username}`)}
            _hover={{ filter: 'brightness(80%)' }}
          />
        </Flex>
      ) : (
        <Button
          onClick={() => navigate('/auth')}
          variant="secondary"
          size="sm"
          ml="1rem"
        >
          Log in
        </Button>
      )}
    </Flex>
  );
};

export default Icons;
