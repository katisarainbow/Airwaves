import { Flex, Image, Link, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { fetchUser } from '../../../api';
import { useNavigate } from 'react-router-dom';
import EditForm from './EditForm';

const EditProfile = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [userInfo, setUserInfo] = useState();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserInfo = async () => {
      const data = await fetchUser(user.result.username);

      setUserInfo(data.data);
    };
    getUserInfo();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    <Text>Loading...</Text>;
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
    <Flex>
      <Text>This user doesnt exist</Text>
      <Link>return Home</Link>
    </Flex>
  );
};

export default EditProfile;
