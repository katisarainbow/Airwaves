export const TextareaStyles = {
  variants: {
    primary: {
      color: 'text',
      border: 'none',
      bg: 'secondary',
      _focus: { border: '1px', borderColor: 'accent' },
      _hover: { border: '1px', borderColor: 'primary' },
    },
    primaryInvert: {
      color: 'text',
      border: 'none',
      bg: 'background',
      _focus: { border: '1px', borderColor: 'accent' },
      _hover: { border: '1px', borderColor: 'primary' },
    },
  },
  defaultProps: {},
};
