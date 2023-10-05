import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  MenuItem,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { deleteComment } from '../../../../../api';

// import { deletePost } from "../../actions/posts";

const DeleteCommentAlert = ({ commentId }) => {
  const { postId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();
  const cancelRef = React.useRef();

  const deleteButton = () => {
    deleteComment(postId, commentId);
    toast({
      title: 'Your post has been successfully removed',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <div>
      <MenuItem
        bg="secondary"
        color="text"
        _hover={{ background: 'background' }}
        onClick={onOpen}
      >
        Delete
      </MenuItem>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="secondary">
            <AlertDialogHeader color="accent" fontSize="lg" fontWeight="bold">
              Delete Post
            </AlertDialogHeader>

            <AlertDialogBody color="white">
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button variant="secondary" ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={deleteButton} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default DeleteCommentAlert;
