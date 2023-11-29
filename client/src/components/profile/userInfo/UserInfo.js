import React from 'react';

import EditMenu from '../edit/EditMenu';
import { Avatar, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';

import { followUser } from '../../../api';

const UserInfo = ({ userInfo, userLoggedInInfo, user }) => {
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

  console.log(userInfo._id, user.result._id);
  return (
    <div>
      <Flex bg="secondary" w="100%" h="30wh" align="center" padding="2rem">
        <Avatar
          objectFit="cover"
          boxSize="15rem"
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
                <Text fontSize={{ base: '150%', xl: '100%' }} mb="0.5em">
                  @{userInfo.username}
                </Text>
                {userInfo.pronouns && (
                  <Text fontSize={{ base: '100%', xl: '80%' }} ml="1rem">
                    {userInfo.pronouns}
                  </Text>
                )}
              </Flex>
            </Flex>
            {userInfo._id === user.result._id && <EditMenu />}
          </Flex>

          {userInfo.description ? (
            <Text
              align="justify"
              ml="1rem"
              fontSize={{ base: '150%', xl: '100%' }}
            >
              {userInfo.description}
            </Text>
          ) : (
            <Text fontSize={{ base: '150%', xl: '100%' }} color="primary">
              No description.
            </Text>
          )}
          <Flex justify="flex-end" mt="2rem">
            {userInfo.username === userLoggedInInfo.username && (
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
