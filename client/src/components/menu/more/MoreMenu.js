import { IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineMore } from 'react-icons/ai';
import DeleteAlert from '../../alertDialog/DeleteAlert';
import EditModal from '../../modal/edit/EditModal';

const MoreMenu = ({ post }) => {
  return (
    <Menu>
      <MenuButton as={IconButton} variant="icon" icon={<AiOutlineMore />} />
      <MenuList bg="secondary" borderColor="background">
        <EditModal {...{ post }} />
        <DeleteAlert {...{ post }} />
      </MenuList>
    </Menu>
  );
};

export default MoreMenu;
