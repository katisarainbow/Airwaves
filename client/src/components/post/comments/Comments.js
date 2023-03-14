import {
  Avatar,
  Flex,
  IconButton,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { commentPost } from "../../../actions/posts";

const Comment = ({ post, user }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post?.comments);

  const handleSubmit = () => {
    console.log(comment, post._id);
  };

  return (
    <Flex
      bg="#35343d"
      w="100%"
      direction="column"
      align="center"
      padding="1rem"
      mt="1rem"
    >
      <Flex w="100%" align="center" justify="space-between">
        <Textarea
          variant="outline"
          bg="white"
          w="93%"
          size="sm"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <IconButton
          disabled={!comment?.length}
          size="sm"
          icon={<AiOutlineCheck />}
          onClick={handleSubmit}
        />
      </Flex>
      {post.comments && (
        <Flex mt="1rem" w="90%" align="center">
          <Avatar size="xs" borderRadius="none" />
          <Flex bg="#818086" padding="5px 15px" ml="1rem" borderRadius="10px">
            <Text color="#e6e6e7" size="xs">
              this is a comment
            </Text>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default Comment;
