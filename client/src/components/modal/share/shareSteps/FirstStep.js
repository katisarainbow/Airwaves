import { Button, Heading, Image, Input, ModalBody } from '@chakra-ui/react';
import React, { useRef } from 'react';
import iconShare from '../../../../assets/iconShare.png';

const FirstStep = ({ sendImage }) => {
  const inputRef = useRef();

  return (
    <ModalBody
      align="center"
      justify="center"
      borderTop="1px"
      borderColor="secondary"
    >
      <Image boxSize="500px" src={iconShare} alt="iconShare" margin="1rem" />

      <Input
        type="file"
        style={{ display: 'none' }}
        ref={inputRef}
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files[0];
          if (file && file.type.substr(0, 5) === 'image') {
            sendImage(file);
          } else {
            sendImage(null);
          }
        }}
      />
      <Button
        variant="primary"
        type="button"
        width="20rem"
        align="center"
        mt="2rem"
        mb="2rem"
        onClick={() => inputRef.current.click()}
      >
        Select file
      </Button>
    </ModalBody>
  );
};

export default FirstStep;
