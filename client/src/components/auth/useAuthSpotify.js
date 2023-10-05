import { useEffect, useState } from "react";
import { loginSpotify, refreshSpotifyToken } from "../../api";
import { useNavigate } from "react-router-dom";

const useAuthSpotify = (code) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const data = loginSpotify(code);
    console.log(data);
    // setAccessToken(data.data.accessToken);
    // setRefreshToken(data.data.refreshToken);
    // setExpiresIn(data.data.expiresIn);

    // navigate("/");
  }, []);

  // useEffect(() => {
  //   if (!refreshToken || !expiresIn) {
  //     const interval = setInterval(() => {
  //       const data = refreshSpotifyToken(refreshToken);

  //       setAccessToken(data.data.accessToken);
  //       setExpiresIn(data.data.expiresIn);
  //     }, (expiresIn - 60) * 1000);

  //     return () => clearInterval(interval);
  //   }
  // }, [refreshToken, expiresIn]);

  // return accessToken;
};

export default useAuthSpotify;
