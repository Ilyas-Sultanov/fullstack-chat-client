import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, TextField, FormHelperText, CircularProgress } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; 
import { IFormInputs } from './ResetPasswordForm.types';
import { validationSchema } from './validationSchema';
import { useResetPasswordMutation } from '../../services/auth';
import { Snackbar } from '../../components';
import { useSnackbar } from '../../hooks';
import { isErrorWithMessage, isFetchBaseQueryError } from '../../helpers';

export function ResetPasswordForm() {
  const navigate = useNavigate();
  const { link } = useParams();
  const [resetPassword, {isLoading}] = useResetPasswordMutation();
  const { msg, setMessage, removeMessage } = useSnackbar();
  
  const {
    register, 
    handleSubmit, 
    reset,
    formState,
  } = useForm<IFormInputs>({mode: 'onBlur', resolver: yupResolver(validationSchema)});

  const formSubmitHandler: SubmitHandler<IFormInputs> = async (data: IFormInputs) => {
    try {
      if (link) {
        await resetPassword({
          resetLink: link,
          newPassword: data.password,
        }).unwrap();

        reset();
        navigate('/');
      }
      else {
        throw new Error('Link is required');
      }
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
    <>
      <Box 
        component='form' 
        onSubmit={handleSubmit(formSubmitHandler)}
        display='flex' 
        rowGap={2} 
        flexWrap='wrap'
        justifyContent='center'
        data-testid='reset-password-form'
      >
        <Box width='100%'>
          <TextField 
            type='password'
            label="New password"
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
          >Reset</Button>
        }      
      </Box>

      <Snackbar
        open={!!msg.text}
        autoHideDuration={6000} 
        onClose={closeHandler}
        message={msg.text}
        severity={msg.type}
      />
    </>
  )
}