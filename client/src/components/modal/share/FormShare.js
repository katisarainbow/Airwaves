import React, { useState, useEffect } from 'react';
import {
  Flex,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from '@chakra-ui/react';

import FirstStep from './shareSteps/FirstStep';
import SecondStep from './shareSteps/SecondStep';

const FormShare = ({ onClose }) => {
  const [imageToCrop, setImageToCrop] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageToCrop(reader.result.toString());
      };
      reader.readAsDataURL(image);
    } else {
      setImageToCrop(null);
    }
  }, [image]);

  const sendImage = (image) => {
    setImage(image);
  };

  return (
    <ModalContent bg="background" align="center">
      <ModalHeader color="text">Create a post</ModalHeader>
      <ModalCloseButton color="primary" _hover={{ color: 'text' }} />
      <Flex flexDirection="column" align="center">
        {!imageToCrop ? (
          <FirstStep {...{ sendImage }} />
        ) : (
          <SecondStep {...{ imageToCrop, setImageToCrop, onClose }} />
        )}
      </Flex>
    </ModalContent>
  );
};

export default FormShare;
