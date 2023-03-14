import { Button, Flex, IconButton, Image } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ShareModal from "../modal/share/ShareModal";
import image from "../../assets/image.png";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";
import decode from "jwt-decode";
import { AiOutlinePoweroff } from "react-icons/ai";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logout = useCallback(() => {
    dispatch({ type: LOGOUT });
    navigate("/auth");
    setUser(null);
  }, [dispatch, navigate]);

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, logout, user?.token]);

  return (
    <Flex
      h="60px"
      bg="#24252f"
      justify={user ? "center" : "space-between"}
      align="center"
      padding="1.5rem"
    >
      <Image
        w="200px"
        src={image}
        onClick={() => navigate("/")}
        cursor="pointer"
      />
      {user ? (
        <>
          <ShareModal />
          <IconButton
            variant="outline"
            borderRadius="100%"
            color="white"
            icon={<AiOutlinePoweroff />}
            onClick={() => logout()}
          />
        </>
      ) : (
        <Button
          onClick={() => navigate("/auth")}
          color="#ececed"
          variant="outline"
          size="sm"
        >
          Log in
        </Button>
      )}
    </Flex>
  );
};

export default Navbar;
