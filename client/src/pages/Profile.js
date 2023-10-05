import React, { useEffect, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import UserPost from '../components/userPost/UserPost';
import { useParams } from 'react-router-dom';
import { fetchUser } from '../api';

import UserInfo from '../components/profile/userInfo/UserInfo';

const Profile = () => {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [userLoggedInInfo, setUserLoggedInInfo] = useState('');

  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    const getUserProfileInfo = async () => {
      const userProfile = await fetchUser(username);
      setUserInfo(userProfile.data);
    };

    getUserProfileInfo();

    const getUserLoggedIn = async () => {
      const userLoggedIn = await fetchUser(user.result.username);

      setUserLoggedInInfo(userLoggedIn.data);
    };

    getUserLoggedIn();
  }, [username, user.result.username]);

  return userInfo ? (
    <Flex h="100vh" justify="center">
      <Flex w="80vw" h="auto" mt="2rem" direction="column">
        <UserInfo {...{ userInfo, userLoggedInInfo }} />
        <UserPost {...{ userInfo }} />
      </Flex>
    </Flex>
  ) : (
    <Text>No existe este usuario</Text>
  );
};

export default Profile;
