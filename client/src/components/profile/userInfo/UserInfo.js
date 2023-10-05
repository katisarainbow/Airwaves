import React from 'react';

import EditMenu from '../edit/EditMenu';
import { Avatar, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';

import { followUser } from '../../../api';

const UserInfo = ({ userInfo, userLoggedInInfo }) => {
  const FollowingStatus = () => {
    if (userLoggedInInfo.following?.includes(userInfo._id)) {
      return 'Unfollow';
    } else {
      return 'Follow';
    }
  };

  const followButtonSubmit = () => {
    followUser(userInfo._id, userLoggedInInfo._id);
    FollowingStatus();
  };

  const convertISOtoReadable = (dateISO) => {
    const dateObject = new Date(dateISO);

    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const year = String(dateObject.getFullYear()).slice(-2);

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  return (
    <div>
      <Flex bg="secondary" w="100%" h="30wh" align="center" padding="2rem">
        <Avatar
          objectFit="cover"
          boxSize="12rem"
          src={userInfo.profileImage}
          borderRadius="100%"
        />
        <Flex
          color="text"
          ml="3rem"
          w="100%"
          h="12rem"
          direction="column"
          padding="1rem"
        >
          <Flex justify="space-between" align="center">
            <Flex direction="column">
              <Heading color="white">{userInfo.name}</Heading>
              <Flex align="center">
                <Text mb="0.5em">@{userInfo.username}</Text>
                {userInfo.pronouns && (
                  <Text ml="1rem" fontSize="2xs">
                    {userInfo.pronouns}
                  </Text>
                )}
              </Flex>
            </Flex>
            {userInfo._id === userLoggedInInfo._id && <EditMenu />}
          </Flex>

          {userInfo.description ? (
            <Text align="justify" ml="1rem">
              {userInfo.description}
            </Text>
          ) : (
            <Text color="primary">No description.</Text>
          )}
          <Flex justify="flex-end" mt="2rem">
            {userInfo.username !== userLoggedInInfo.username && (
              <Button
                variant="primary"
                size="xs"
                w="100px"
                alignSelf="flex-end"
                onClick={followButtonSubmit}
              >
                <FollowingStatus />
              </Button>
            )}
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default UserInfo;
