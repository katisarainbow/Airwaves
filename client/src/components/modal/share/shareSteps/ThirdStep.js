import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { Flex, ModalBody, Button, Image, ButtonGroup } from '@chakra-ui/react';
import { createPost } from '../../../../actions/posts';
import { useNavigate } from 'react-router-dom';
import { Form } from './components/Form';

const validationSchema = Yup.object({
  title: Yup.string('Enter a title').required('Title is required'),
});

const ThirdStep = ({ previewImageForm, setImageToCrop, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));

  const formik = useFormik({
    initialValues: {
      title: '',
      selectedFile: '',
      description: '',
      tags: '',
    },
    onSubmit: (formData) => {
      dispatch(
        createPost({
          ...formData,
          tags: formData.tags.split(', '),
          selectedFile: previewImageForm,
        })
      );
      onClose();
      navigate('/');
    },
    validationSchema: validationSchema,
  });

  return (
    <ModalBody
      padding="1rem"
      bg="background"
      borderTop="1px"
      borderColor="secondary"
    >
      <form onSubmit={formik.handleSubmit}>
        <Flex direction="column" align="center">
          <Image src={previewImageForm} w="100%" alt="preview" bg="secondary" />
          <Form {...{ user, formik }} />
        </Flex>
        <Flex justify="space-between" mt="1rem">
          <Button
            variant="textOnly"
            type="button"
            width="200px"
            onClick={() => {
              setImageToCrop(null);
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit" width="200px">
            Post
          </Button>
        </Flex>
      </form>
    </ModalBody>
  );
};

export default ThirdStep;
