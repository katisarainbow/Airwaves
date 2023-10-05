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
    <div>
      <IconButton
        ml="1rem"
        size="sm"
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
    </div>
  );
};

export default ShareModal;
