import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { theme } from './styles/theme';

import Auth from './pages/Auth';
import PostPage from './pages/PostPage';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Home from './pages/Home';
import Explore from './pages/Explore';

import EditProfile from './components/profile/edit/EditProfile';
import Navbar from './components/navbar/Navbar';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Navbar {...{ user }} />

        <Routes>
          {user ? (
            <Route path="/" element={<Home {...{ user }} />} />
          ) : (
            <Route path="/" element={<Explore />} />
          )}
          <Route path="/explore" element={<Explore />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/user/:username" element={<Profile />} />
          <Route path="/user/config" element={<EditProfile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/:postId" element={<PostPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
