import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const InputComponent = ({ label, type, name, value, handleChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl mt="0.5rem">
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input
          variant="secondary"
          text-align="initial"
          resize="none"
          type={
            name === 'password' || name === 'repeatPassword'
              ? showPassword
                ? 'text'
                : 'password'
              : type
          }
          name={name}
          value={value}
          onChange={handleChange}
        />
        {name === 'password' || name === 'repeatPassword' ? (
          <InputRightElement>
            <IconButton variant="icon" size="xs" onClick={handleShowPassword}>
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </IconButton>
          </InputRightElement>
        ) : null}
      </InputGroup>
    </FormControl>
  );
};

export default InputComponent;
