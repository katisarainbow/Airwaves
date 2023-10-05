import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Flex,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React from 'react';

export const Form = ({ user, formik }) => {
  return (
    <Flex direction="column" w="100%" mt="1rem">
      <Flex flexDirection="row" align="center">
        <Avatar src={user?.result?.profileImage} size="sm" mr="1rem" />
        <Text color="white">{user?.result?.username}</Text>
      </Flex>
      <Input
        variant="primary"
        placeholder="Title"
        type="text"
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        text-align="initial"
        resize="none"
        mt="1rem"
      />
      <Textarea
        variant="primary"
        type="text"
        placeholder="Description"
        height="5rem"
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        resize="none"
        mt="1rem"
      />
      <Accordion allowToggle mt="1rem" width="100%" borderColor="secondary">
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Text color="primary">Add Tags </Text>
              </Box>
              <AccordionIcon color="primary" />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <Input
              variant="primary"
              type="text"
              placeholder="Tags e.g.(1, 2, 3)"
              name="tags"
              value={formik.values.tags}
              onChange={formik.handleChange}
              resize="none"
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};
