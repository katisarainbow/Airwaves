import React from 'react';
import { useDispatch } from 'react-redux';
import { Flex, IconButton, Input, ModalBody, Textarea } from '@chakra-ui/react';
import { useFormik } from 'formik';

import { updatePost } from '../../../actions/posts';
import { AiOutlineCheck } from 'react-icons/ai';
import * as Yup from 'yup';

const EditForm = ({ post, onClose }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: post.title,
      description: post.description,
      tags: post.tags,
    },
    onSubmit: (formData) => {
      console.log(formData);
      dispatch(updatePost(post._id, formData));
      onClose();
    },
  });

  return (
    <>
      <ModalBody borderTopWidth="1px" borderColor="secondary">
        <form onSubmit={formik.handleSubmit}>
          <Flex direction="column">
            <Input
              variant="primary"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              placeholder="Title"
              mt="1rem"
              mb="1rem"
            />
            <Textarea
              variant="primary"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              placeholder="Description"
              mb="1rem"
            />
            <Input
              variant="primary"
              name="tags"
              value={formik.values.tags}
              onChange={formik.handleChange}
              placeholder="Tags"
            />
          </Flex>
          <Flex w="100%" justify="flex-end" padding="1rem">
            <IconButton
              variant="icon"
              type="submit"
              icon={<AiOutlineCheck />}
            />
          </Flex>
        </form>
      </ModalBody>
    </>
  );
};

export default EditForm;
