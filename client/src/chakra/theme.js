import { extendTheme } from "@chakra-ui/react";
import { buttonTheme } from "./components/buttonStyles";

const theme = extendTheme({
  components: {
    buttonTheme,
  },
});

export default theme;
