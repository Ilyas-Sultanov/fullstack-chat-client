import { string, object } from 'yup';

export const adminModalValidationSchema = object().shape({
  name: string().required().min(2).max(50),
})

export const createGroupValidationSchema = object().shape({
  name: string().required().min(2).max(50),
})

export const messageValidationSchema = object().shape({
  msg: string().required().min(1).max(500),
})