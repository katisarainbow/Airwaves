import { extendTheme } from '@chakra-ui/react';
import { ButtonStyles as Button } from './components/buttonStyles';
import { InputStyles as Input } from './components/inputStyles';
import { TextareaStyles as Textarea } from './components/textareaStyles';

import parabolicRectangle from '../assets/parabolic-rectangle.png';

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#08020d',
        bgImage: parabolicRectangle,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
      },
    },
  },
  colors: {
    text: '#ecdbfa',
    background: '#08020d',
    primary: '#b090d0',
    secondary: '#100b14',
    accent: '#af4baf',
  },
  fonts: {
    body: 'Inter, sans-serif',
    heading: 'Montserrat Alternates, sans-serif',
    mono: 'Menlo, monospace',
  },
  components: {
    Button,
    Input,
    Textarea,
  },
});
