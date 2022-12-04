import { string, object } from 'yup';

export const validationSchema = object().shape({
  email: string().required().email(),
  password: string().required().min(5).max(50),
})