import React, { useEffect } from "react";
import { Avatar, Button, Flex, IconButton, Text } from "@chakra-ui/react";

import { AiOutlineHome, AiOutlinePoweroff } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";

const RightContent = ({ user }) => {
  return (
    user && (
      <Flex w="20rem" padding="1rem">
        <Flex
          bg="#1c1a24"
          direction="column"
          w="100%"
          h="16rem"
          borderRadius="20px"
          mt="1rem"
          align="center"
          padding="2rem 1rem"
          position="sticky"
          top="1rem"
        >
          <Flex w="100%" padding="0.5rem" align="center" justify="space-around">
            <Avatar
              src={user.result.profileImage}
              size="lg"
              borderRadius="none"
            />
            <Flex direction="column" mr="1rem" color="white" ml="1rem">
              <Text>{user.result.name}</Text>
              <Text fontSize="xs">@{user.result.username}</Text>
            </Flex>
          </Flex>
          <Flex
            w="100%"
            direction="column"
            padding="1rem"
            justify="space-around"
            align="center"
          >
            <Button
              w="100%"
              padding="0.5rem"
              align="center"
              color="#190d12"
              children={
                <Flex>
                  <AiOutlineHome />
                  <Text ml="0.5rem">Home</Text>
                </Flex>
              }
            />
            <Button
              w="100%"
              padding="0.5rem"
              align="center"
              justify="center"
              color="#190d12"
              children={
                <Flex align="center">
                  <BiWorld />
                  <Text ml="0.5rem">Explore</Text>
                </Flex>
              }
              mt="1rem"
            />
          </Flex>
        </Flex>
      </Flex>
    )
  );
};

export default RightContent;
