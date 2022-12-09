import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; 
import { Box, TextField, Button, FormHelperText, CircularProgress } from '@mui/material';
import { validationSchema } from './validationSchema';
import { IFormInputs } from './SignInForm.types';

interface ISignInFormProps {
  onSubmit: (email: string, password: string) => void
  isLoading: boolean
}

export function SignInForm({ onSubmit, isLoading }: ISignInFormProps) {

  const {
    register, 
    handleSubmit, 
    reset,
    formState,
  } = useForm<IFormInputs>({mode: 'onBlur', resolver: yupResolver(validationSchema)}); 

  const formSubmitHandler: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
    onSubmit(data.email, data.password);
    reset();
  };
  
  return (
    <Box 
      component='form' 
      onSubmit={handleSubmit(formSubmitHandler)}
      display='flex' 
      rowGap={2} 
      flexWrap='wrap'
      data-testid='sign-in-form'
    >
      <Box width='100%'>
        <TextField 
          label="Email" 
          variant="outlined" 
          fullWidth 
          size="small" 
          required
          autoComplete='off'
          {...register('email')}
          error={!!formState.errors.email?.message}
          inputProps={{ 'data-testid': 'email-input' }} // свойство inputProps передает все атрибуты настоящему инпуту, и передав data-testid, мы можем без ошибок передать value инпуту в тестах
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
      
      {
        isLoading ? 
        <CircularProgress data-testid='spiner'/> :
        <Button 
          type='submit' 
          variant="contained" 
          fullWidth
          disabled={!formState.isValid}
          data-testid='submit-btn'
        >Sign In</Button>
      }      
    </Box>
  )
}