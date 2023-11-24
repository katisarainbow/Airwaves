import React from 'react';
import { useDispatch } from 'react-redux';
import { Flex, IconButton, Input, ModalBody, Textarea } from '@chakra-ui/react';
import { useFormik } from 'formik';

// import { updateComment } from "../../../actions/posts";

import { AiOutlineCheck } from 'react-icons/ai';
import { updateComment } from '../../../../../api';
import { useParams } from 'react-router-dom';
// import * as Yup from "yup";

const EditComment = ({ comment, commentId }) => {
  const { postId } = useParams();

  const formik = useFormik({
    initialValues: {
      comment: comment,
    },
    onSubmit: (formData) => {
      updateComment(formData, postId, commentId);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex padding="0.5rem 0rem">
        <Textarea
          variant="primaryInvert"
          w="93%"
          size="sm"
          name="comment"
          onChange={formik.handleChange}
          value={formik.values.comment}
        />
        <IconButton
          variant="secondaryInvert"
          type="submit"
          ml="1rem"
          size="sm"
          icon={<AiOutlineCheck />}
          alignSelf="end"
        />
      </Flex>
    </form>
  );
};

export default EditComment;
