import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { theme } from './styles/theme';

import Auth from './pages/Auth';
import Home from './pages/Home';
import Explore from './pages/Explore';
import PostPage from './pages/PostPage';
import Profile from './pages/Profile';
import Search from './pages/Search';

import EditProfile from './components/profile/edit/EditProfile';
import Navbar from './components/navbar/Navbar';

import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <ChakraProvider theme={theme}>
      <GoogleOAuthProvider clientId="950699349001-nklij99kr900m8dtr2isi1vafsfcpti9.apps.googleusercontent.com">
        <BrowserRouter>
          <Navbar {...{ user }} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/user/:username" element={<Profile />} />
            <Route path="/user/config" element={<EditProfile />} />
            <Route path="/search" element={<Search />} />
            <Route path="/:postId" element={<PostPage />} />
            <Route path="/explore" element={<Explore {...{ user }} />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </ChakraProvider>
  );
};

export default App;
