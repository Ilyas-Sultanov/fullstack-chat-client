import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; 
import { Box, TextField, Button, FormHelperText, CircularProgress } from '@mui/material';
import { validationSchema } from './validationSchema';
import { IFormInputs } from './SignUpForm.types';

interface ISignUpFormProps {
  onSubmit: (name: string, email: string, password: string) => void
  isLoading: boolean
}

export function SignUpForm({ onSubmit, isLoading }: ISignUpFormProps) {

  const {
    register, 
    handleSubmit, 
    reset,
    formState,
  } = useForm<IFormInputs>({mode: 'onBlur', resolver: yupResolver(validationSchema)}); 

  const formSubmitHandler: SubmitHandler<IFormInputs> = async (data: IFormInputs) => {
    onSubmit(data.name, data.email, data.password);
    reset();
  };
  
  return (
    <Box 
      component='form' 
      onSubmit={handleSubmit(formSubmitHandler)}
      display='flex' 
      rowGap={2} 
      flexWrap='wrap'
      justifyContent='center'
      data-testid='sign-up-form'
    >
      <Box width='100%'>
        <TextField 
          label="Email" 
          variant="outlined" 
          fullWidth 
          size="small" 
          required
          {...register('email')}
          autoComplete='off'
          error={!!formState.errors.email?.message}
          inputProps={{ 'data-testid': 'email-input' }}
        />
        {
          formState.errors.email ?
          <FormHelperText 
            error
            data-testid='email-validation-message'
          >{formState.errors.email.message}</FormHelperText> :
          null
        }
      </Box>

      <Box width='100%'>
        <TextField 
          label="Name" 
          variant="outlined" 
          fullWidth 
          size="small" 
          required
          {...register('name')}
          autoComplete='off'
          error={!!formState.errors.name?.message}
          inputProps={{ 'data-testid': 'name-input' }}
        />
        {
          formState.errors.name ?
          <FormHelperText 
            error
            data-testid='name-validation-message'
          >{formState.errors.name.message}</FormHelperText> :
          null
        }
      </Box>

      <Box width='100%'>
        <TextField 
          type='password'
          label="Password"
          variant="outlined" 
          fullWidth 
          size="small" 
          required
          autoComplete='off'
          {...register('password')}
          error={!!formState.errors.password?.message}
          inputProps={{ 'data-testid': 'password-input' }}
        />
        {
          formState.errors.password ?
          <FormHelperText 
            error
            data-testid='password-validation-message'
          >{formState.errors.password.message}</FormHelperText> :
          null
        }
      </Box>

      <Box width='100%'>
        <TextField 
          type='password'
          label="Confirm Password"
          variant="outlined" 
          fullWidth 
          size="small" 
          required
          autoComplete='off'
          {...register('confirmPassword')}
          inputProps={{ 'data-testid': 'confirm-password-input' }}
        />
        {
          formState.errors.confirmPassword ?
          <FormHelperText 
            error
            data-testid='confirm-password-validation-message'
          >{formState.errors.confirmPassword.message}</FormHelperText> :
          null
        }
      </Box>

      {
        isLoading ? 
        <CircularProgress data-testid='spiner'/> :
        <Button 
          type='submit' 
          variant="contained" 
          fullWidth
          disabled={!formState.isValid}
          data-testid='submit-btn'
        >Sign Up</Button>
      }      
    </Box>
  )
}