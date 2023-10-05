import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlineMore } from 'react-icons/ai';
import DeleteCommentAlert from '../../post/comments/comment/delete/DeleteCommentAlert';

const MoreComments = ({ comment, getId }) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        size="xs"
        variant="iconPost"
        transition="all 0.2s"
        _hover={{ bg: 'gray.400' }}
        _expanded={{ bg: 'background' }}
        icon={<AiOutlineMore />}
      />
      <MenuList bg="secondary" borderColor="text">
        <MenuItem
          bg="secondary"
          color="text"
          _hover={{ background: 'background' }}
          onClick={() => getId(comment._id)}
        >
          Edit
        </MenuItem>
        <DeleteCommentAlert {...{ commentId: comment._id }} />
      </MenuList>
    </Menu>
  );
};

export default MoreComments;
