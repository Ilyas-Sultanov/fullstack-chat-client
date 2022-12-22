import { string, object } from 'yup';

export const searchUserValidationSchema = object().shape({
  name: string().required('required').min(1).max(50),
})

export const searchGroupValidationSchema = object().shape({
  name: string().required('required').min(1).max(50),
})