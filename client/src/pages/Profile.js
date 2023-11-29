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
  const [isLoading, setIsLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    const getUserProfileInfo = async () => {
      const userProfile = await fetchUser(username);
      setUserInfo(userProfile.data);
    };

    getUserProfileInfo();

    if (username !== user.result.username) {
      const getUserLoggedIn = async () => {
        const userLoggedIn = await fetchUser(user.result.username);

        setUserLoggedInInfo(userLoggedIn.data);
      };

      getUserLoggedIn();
    }

    setIsLoading(false);
  }, [username]);

  if (isLoading) {
    <Text>Laoding</Text>;
  }

  return userInfo ? (
    <Flex h="100vh" justify="center" mt={{ base: '80px', xl: '60px' }}>
      <Flex
        w={{ base: '100%', xl: '80%' }}
        h="auto"
        mt="2rem"
        direction="column"
      >
        <UserInfo {...{ userInfo, userLoggedInInfo, user }} />
        <UserPost {...{ userInfo }} />
      </Flex>
    </Flex>
  ) : null;
};

export default Profile;
