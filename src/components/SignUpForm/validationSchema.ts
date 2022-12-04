import { string, object, ref } from 'yup';

export const validationSchema = object().shape({
  name: string().required().min(2).max(50),
  email: string().required().email(),
  password: string().required().min(5).max(50),
  confirmPassword: string().required().oneOf([ref('password')], 'Passwords must match'),
})