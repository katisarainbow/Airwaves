import { Box, Flex, Image } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import airwaves from '../../assets/Airwaves.png';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants/actionTypes';
import decode from 'jwt-decode';
import Search from './Search';
import Icons from './Icons';

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const logout = useCallback(() => {
    dispatch({ type: LOGOUT });
    navigate('/auth');
    setUser(null);
  }, [dispatch, navigate]);

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location, logout, user?.token, navigate]);

  return (
    <Flex
      h="60px"
      bg="background"
      borderBottom="1px"
      borderColor="secondary"
      justify="space-between"
      align="center"
      padding="1.5rem"
      position="sticky"
      top="0"
      zIndex="1"
    >
      <Box w="100%">
        <Image
          w="180px"
          src={airwaves}
          onClick={() => navigate('/')}
          cursor="pointer"
          mr="10rem"
        />
      </Box>
      <Flex w={user ? '100%' : '100%'} align="center">
        <Search />
      </Flex>
      <Flex w="100%" justify="flex-end">
        <Icons {...{ logout, user, navigate }} />
      </Flex>
    </Flex>
  );
};

export default Navbar;
