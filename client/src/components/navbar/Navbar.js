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
    <Flex w="100%">
      <Flex
        w="100%"
        h={{ base: '80px', xl: '60px' }}
        bg="background"
        borderBottom="1px"
        borderColor="secondary"
        justify="space-between"
        align="center"
        padding="1.5rem"
        position="fixed"
        top="0"
        zIndex="1"
      >
        <Box>
          <Image
            w="180px"
            S
            src={airwaves}
            onClick={() => navigate('/')}
            cursor="pointer"
          />
        </Box>
        <Flex w={{ base: '70%', xl: '50%' }}>
          <Search />
        </Flex>
        <Flex display={{ base: 'none', xl: 'flex' }}>
          <Icons {...{ logout, user, navigate }} />
        </Flex>
      </Flex>
      <Flex
        display={{ base: 'flex', xl: 'none' }}
        w="100%"
        h="60px"
        position="fixed"
        bottom="2"
        justify="center"
        zIndex="1"
      >
        <Icons {...{ logout, user, navigate }} />
      </Flex>
    </Flex>
  );
};

export default Navbar;
