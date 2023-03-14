import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {
  Box,
  Flex,
  Textarea,
  ModalBody,
  Input,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Avatar,
  Text,
  Image,
  ButtonGroup,
} from "@chakra-ui/react";
import { createPost } from "../../../../actions/posts";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  title: Yup.string("Enter a title").required("Title is required"),
});

const ThirdStep = ({ previewImageForm, setImageToCrop, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  const formik = useFormik({
    initialValues: {
      title: "",
      selectedFile: "",
      description: "",
      tags: "",
    },
    onSubmit: (formData) => {
      dispatch(
        createPost({
          ...formData,
          tags: formData.tags.split(", "),
          selectedFile: previewImageForm,
          username: user?.result?.username,
          name: user?.result?.name,
          profileImage: user?.result?.profileImage,
        })
      );
      onClose();
      navigate("/");
    },
    validationSchema: validationSchema,
  });

  return (
    <ModalBody
      w="100%"
      h="100%"
      padding="1rem"
      bg="#ececed"
      borderTop="1px"
      borderColor="#3c3d4e"
    >
      <form onSubmit={formik.handleSubmit}>
        <Flex
          direction="row"
          w="100%"
          h="35rem"
          align="center"
          justify="space-around"
        >
          <Flex
            bg="#3c3d4e"
            direction="column"
            h="80%"
            padding="2rem 1rem"
            borderRadius="20px"
          >
            <Flex flexDirection="row" align="center" justify="flex-end">
              <Text color="#ececed" mr="1rem">
                {user?.result?.username}
              </Text>
              <Avatar src={user?.result?.profileImage} size="sm" />
            </Flex>
            <Input
              variant="filled"
              placeholder="Title"
              type="text"
              width="15rem"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              text-align="initial"
              resize="none"
              mt="1rem"
            />
            <Textarea
              variant="filled"
              width="15rem"
              type="text"
              placeholder="Description"
              height="10rem"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              resize="none"
              mt="1rem"
            />
            <Accordion allowToggle mt="1rem" width="15rem">
              <AccordionItem>
                <h2>
                  <AccordionButton variant="filled">
                    <Box flex="1" textAlign="left">
                      <Text color="#ececed">Add Tags </Text>
                    </Box>
                    <AccordionIcon color="#ececed" />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Input
                    variant="filled"
                    type="text"
                    placeholder="Tags"
                    name="tags"
                    value={formik.values.tags}
                    onChange={formik.handleChange}
                    resize="none"
                  />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Flex>
          <Image
            src={previewImageForm}
            boxSize="30rem"
            alt="preview"
            objectFit="cover"
            bg="#3c3d4e"
          />
        </Flex>
        <ButtonGroup
          mt="1rem"
          w="100%"
          justifyContent="space-between"
          padding="0rem 1rem"
          variant="outline"
        >
          <Button
            border="1px"
            borderColor="#3c3d4e"
            type="button"
            width="200px"
            onClick={() => {
              setImageToCrop(null);
            }}
          >
            Cancel
          </Button>
          <Button
            border="1px"
            borderColor="#3c3d4e"
            type="submit"
            width="200px"
          >
            Post
          </Button>
        </ButtonGroup>
      </form>
    </ModalBody>
  );
};

export default ThirdStep;
