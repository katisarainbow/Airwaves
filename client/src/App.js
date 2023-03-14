import React, { useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import theme from "./chakra/theme";

import Navbar from "./components/navbar/Navbar";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import NotFound from "./pages/NotFound";

import { getPosts } from "./actions/posts";

const App = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post);
  const user = JSON.parse(localStorage.getItem("profile"));

  const [currentPage, setCurrentPage] = useState(1);

  const fetchPosts = () => {
    console.log("siii!");
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    console.log("getting posts");
    dispatch(getPosts(currentPage));
  }, [dispatch, currentPage]);

  console.log(currentPage);

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Navbar {...{ user }} />
        <Routes>
          <Route
            path="/"
            element={<Home {...{ posts, user, fetchPosts, currentPage }} />}
          />
          <Route path="/auth" element={<Auth />} />
          <Route path="/:postId" element={<PostPage {...{ posts }} />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
