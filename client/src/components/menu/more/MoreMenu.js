import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineMore } from "react-icons/ai";
import DeleteAlert from "../../alertDialog/DeleteAlert";
import EditModal from "../../modal/edit/EditModal";

const MoreMenu = ({ post }) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        variant="ghost"
        color="#e6e6e7"
        transition="all 0.2s"
        _hover={{ bg: "gray.400" }}
        _expanded={{ bg: "blue.400" }}
        _focus={{ boxShadow: "outline" }}
        icon={<AiOutlineMore />}
      />
      <MenuList>
        <EditModal {...{ post }} />
        <DeleteAlert {...{ post }} />
      </MenuList>
    </Menu>
  );
};

export default MoreMenu;
