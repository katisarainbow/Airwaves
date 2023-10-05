import { Button, Link } from "@chakra-ui/react";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const AuthWithSpotify = () => {
  const navigate = useNavigate();
  const clientId = "16cea4df1ebc4349872a1e25b05bf6c1";
  const redirectURI = "http://localhost:3000";

  const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectURI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-read-playback-state%20user-modify-playback-state`;

  return <Link href={AUTH_URL}>AuthWithSpotify</Link>;
};

export default AuthWithSpotify;
