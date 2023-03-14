import { Button, Heading, Image, Input, ModalBody } from "@chakra-ui/react";
import React, { useRef } from "react";
import iconShare from "../../../../assets/iconShare.png";

const FirstStep = ({ sendImage }) => {
  const inputRef = useRef();

  return (
    <ModalBody
      w="100%"
      align="center"
      justify="center"
      borderTop="1px"
      borderColor="#3c3d4e"
    >
      <Image boxSize="500px" src={iconShare} alt="iconShare" />
      <Heading as="h1">Share your art with the Bees</Heading>
      <Input
        type="file"
        style={{ display: "none" }}
        ref={inputRef}
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files[0];
          if (file && file.type.substr(0, 5) === "image") {
            sendImage(file);
          } else {
            sendImage(null);
          }
        }}
      />
      <Button
        variant="outline"
        border="1px"
        borderColor="#3c3d4e"
        type="button"
        width="20rem"
        align="center"
        mt="3rem"
        onClick={() => inputRef.current.click()}
      >
        Select file
      </Button>
    </ModalBody>
  );
};

export default FirstStep;
