import React, { useEffect, useRef, useState } from 'react';
import { Form, useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Button,
  Flex,
  Input,
  Text,
  Textarea,
  VisuallyHidden,
} from '@chakra-ui/react';

import { updateUserData } from '../../../api';

import 'react-datepicker/dist/react-datepicker.css';

const EditForm = ({ userInfo }) => {
  const [image, setImage] = useState();
  const [previewImage, setPreviewImage] = useState(userInfo.profileImage);
  const inputRef = useRef();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: userInfo.username,
      name: userInfo.name,
      description: userInfo.description,
      birthday: userInfo.birthday ? new Date(userInfo.birthday) : new Date(),
      pronouns: userInfo.pronouns || '',
      profileImage: userInfo.profileImage,
    },
    onSubmit: (formData) => {
      updateUserData(formData, userInfo._id);
      navigate(`/user/${userInfo.username}`);
    },
  });

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue('profileImage', reader.result.toString());
        setPreviewImage(reader.result.toString());
      };
      reader.readAsDataURL(image);
    } else {
      formik.setFieldValue('profileImage', userInfo.profileImage);
    }
  }, [image]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Text mb="0.5rem">Profile Image</Text>
      <Flex>
        {previewImage ? <Avatar src={previewImage} /> : <Avatar />}
        <VisuallyHidden>
          <Input
            type="file"
            ref={inputRef}
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files[0];
              if (file && file.type.substr(0, 5) === 'image') {
                setImage(file);
                console.log(file);
              } else {
                setImage(null);
              }
            }}
          />
        </VisuallyHidden>

        <Button
          variant="primary"
          w="80%"
          onClick={() => inputRef.current.click()}
          ml="1rem"
        >
          Select a Image
        </Button>
      </Flex>

      <Text mt="1rem" mb="0.5rem">
        Username
      </Text>
      <Input
        variant="primary"
        name="username"
        value={formik.values.username}
        onChange={formik.handleChange}
        placeholder="Username"
        mb="1rem"
      />

      <Text mb="0.5rem">Name</Text>
      <Input
        variant="primary"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        placeholder="Name"
        mb="1rem"
      />

      <Text mb="0.5rem">Description</Text>
      <Textarea
        variant="primary"
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        placeholder="Description"
        mb="1rem"
      />

      <Text mb="0.5rem">Birthday</Text>
      <Input
        variant="primary"
        type="date"
        name="birthday"
        value={formik.values.birthday}
        onChange={formik.handleChange}
      />

      <Text mt="1rem" mb="0.5rem">
        Pronouns
      </Text>
      <Input
        variant="primary"
        name="pronouns"
        value={formik.values.pronouns}
        onChange={formik.handleChange}
        placeholder="Pronouns"
        mb="1rem"
      />

      <Button variant="primary" mt="2rem" type="submit">
        Save
      </Button>
    </form>
  );
};

export default EditForm;
