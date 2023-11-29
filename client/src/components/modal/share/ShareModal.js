import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import {
  IconButton,
  Modal,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

import FormShare from './FormShare';

const ShareModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        ml="1rem"
        size="md"
        variant="icon"
        borderRadius="100%"
        onClick={onOpen}
      >
        <AiOutlinePlus />
      </IconButton>
      <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <FormShare isOpen={isOpen} onClose={onClose} />
      </Modal>
    </>
  );
};

export default ShareModal;
