import React from 'react';
import {
  MenuItem,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

import EditForm from './EditForm';

const EditModal = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <MenuItem
        bg="secondary"
        color="text"
        _hover={{ background: 'background' }}
        onClick={onOpen}
      >
        Edit
      </MenuItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="background">
          <ModalHeader color="accent">Edit</ModalHeader>
          <ModalCloseButton color="primary" />
          <EditForm {...{ onClose, post }} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;
