export const ButtonStyles = {
  baseStyles: {},
  sizes: {},
  variants: {
    primary: {
      bg: 'primary',
      color: 'secondary',
      padding: '1em 2em',
      _hover: {
        bg: 'text',
      },
      _active: {
        bg: 'accent',
      },
    },
    secondaryInvert: {
      color: 'text',
      borderRadius: '100',
      bg: 'background',
      _hover: { bg: 'gray.600' },
      _active: { bg: 'black' },
    },
    icon: {
      color: 'text',
      bg: 'secondary',
      borderRadius: '100%',
      _hover: { bg: 'gray.600' },
      _active: {
        bg: 'background',
      },
    },
    onlyIcon: {
      borderRadius: '100%',
      color: 'primary',
      _hover: { color: 'text' },
      _active: { color: 'accent' },
    },
    textOnly: {
      color: 'primary',
      _hover: { color: 'text' },
    },
  },
  defaultProps: {},
};
