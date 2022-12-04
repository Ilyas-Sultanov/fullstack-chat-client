import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; 
import { Box, TextField, Button, FormHelperText, CircularProgress } from '@mui/material';
import { validationSchema } from './validationSchema';
import { IFormInputs } from './SignUpForm.types';
import { useRegistrationMutation } from '../../services/auth';
import { INewUser } from '../../types';
import { Snackbar } from '../../components';
import { useSnackbar } from '../../hooks';
import { isErrorWithMessage, isFetchBaseQueryError } from '../../helpers';

export function SignUpForm() {
  const [registration, {isLoading}] = useRegistrationMutation();
  const { msg, setMessage, removeMessage } = useSnackbar();

  const {
    register, 
    handleSubmit, 
    reset,
    formState,
  } = useForm<IFormInputs>({mode: 'onBlur', resolver: yupResolver(validationSchema)}); 

  const formSubmitHandler: SubmitHandler<IFormInputs> = async (data: IFormInputs) => {
    try {
      const newUser: INewUser = {
        name: data.name,
        email: data.email,
        password: data.password,
      }

      await registration(newUser).unwrap();
      setMessage('success', 'You have successfully registered!');
      reset();
    }
    catch (err) {
      if (isFetchBaseQueryError(err)) {
        const errMsg = 'error' in err ? err.error : (err.data as {message: string}).message;
        setMessage('error', errMsg);
      } 
      else if (isErrorWithMessage(err)) {
        setMessage('error', err.message);
      }
    }
  };

  function closeHandler() {
    removeMessage();
  }
  
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
          error={!!formState.errors.email?.message}
          
        />
        {
          formState.errors.email ?
          <FormHelperText error>{formState.errors.email.message}</FormHelperText> :
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
          error={!!formState.errors.name?.message}
        />
        {
          formState.errors.name ?
          <FormHelperText error>{formState.errors.name.message}</FormHelperText> :
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
          {...register('password')}
          error={!!formState.errors.password?.message}
        />
        {
          formState.errors.password ?
          <FormHelperText error>{formState.errors.password.message}</FormHelperText> :
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
          {...register('confirmPassword')}
        />
        {
          formState.errors.confirmPassword ?
          <FormHelperText error>{formState.errors.confirmPassword.message}</FormHelperText> :
          null
        }
      </Box>

      {
        isLoading ? 
        <CircularProgress /> :
        <Button 
          type='submit' 
          variant="contained" 
          fullWidth
          disabled={!formState.isValid}
        >Sign Up</Button>
      }      

      <Snackbar
        open={!!msg.text}
        autoHideDuration={6000} 
        onClose={closeHandler}
        message={msg.text}
        severity={msg.type}
      />
    </Box>
  )
}