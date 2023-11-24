import * as Yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const validationSchemaSignUp = Yup.object({
  email: Yup.string('Enter a email')
    .required('Email is required')
    .email('Invalid email'),

  name: Yup.string('Enter a name')
    .required('Name is required')
    .min(1, 'Too Short!')
    .max(10, 'Too Long!'),

  username: Yup.string('Enter a username')
    .required('Username is required')
    .min(3, 'Too Short!')
    .max(15, 'Too Long!'),

  password: Yup.string('Enter a password')
    .required('Password is required')
    .matches(passwordRules, { message: 'Please create a stronger password' }),

  profileImage: Yup.string('Select a Image').nullable(),

  repeatPassword: Yup.string('Retype your Password')
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Password is required'),
});

export const validationSchemaLogIn = Yup.object({
  username: Yup.string('Enter a username')
    .required('Username is required')
    .min(3, 'Too Short!')
    .max(15, 'Too Long!'),

  password: Yup.string('Enter a password').required('Password is required'),
});
