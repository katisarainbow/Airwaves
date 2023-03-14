import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import {
  IconButton,
  Modal,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import FormShare from "./FormShare";

const ShareModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <IconButton size="md" variant="ghost" color="#ececed" onClick={onOpen}>
        <IoMdAddCircleOutline size="1.5rem" />
      </IconButton>
      <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <FormShare isOpen={isOpen} onClose={onClose} />
      </Modal>
    </div>
  );
};

export default ShareModal;
