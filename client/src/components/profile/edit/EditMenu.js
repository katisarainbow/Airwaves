import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlineMore } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const EditMenu = () => {
  const navigate = useNavigate();
  return (
    <Menu>
      <MenuButton as={IconButton} variant="icon" icon={<AiOutlineMore />} />
      <MenuList bg="background" borderColor="secondary">
        <MenuItem bg="background" onClick={() => navigate(`/user/config`)}>
          Edit
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default EditMenu;
