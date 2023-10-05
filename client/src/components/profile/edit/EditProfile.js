import { Flex, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { fetchUser } from '../../../api';
import { useNavigate } from 'react-router-dom';
import EditForm from './EditForm';

const EditProfile = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [userInfo, setUserInfo] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfo = async () => {
      const data = await fetchUser(user.result.username);

      setUserInfo(data.data);
    };
    getUserInfo();
  }, []);

  if (!userInfo) {
    <Text>Loading...</Text>;
  }

  if (userInfo && user.result._id !== userInfo._id) {
    return navigate('/auth');
  }

  return userInfo ? (
    <Flex w="100%" justify="center">
      <Flex
        bg="background"
        border="4px"
        borderColor="secondary"
        borderRadius="20px"
        w="30%"
        mt="5rem"
        justify="center"
        padding="4rem"
        color="white"
      >
        <EditForm {...{ user, userInfo }} />
      </Flex>
    </Flex>
  ) : (
    <Text>Loading...</Text>
  );
};

export default EditProfile;
