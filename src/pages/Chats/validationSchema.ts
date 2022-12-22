import { string, object } from 'yup';

export const validationSchema = object().shape({
  name: string().required().min(2).max(50),
})