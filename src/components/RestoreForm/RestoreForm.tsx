import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; 
import { Box, TextField, Button, FormHelperText, CircularProgress } from '@mui/material';
import { validationSchema } from './validationSchema';
import { IFormInputs } from './RestoreForm.types';
import { useRestoreMutation } from '../../services/auth';
import { Snackbar } from '../../components';
import { useSnackbar } from '../../hooks';
import { isErrorWithMessage, isFetchBaseQueryError } from '../../helpers';

export function RestoreForm() {
  const [ restore, {isLoading} ] = useRestoreMutation();  
  const { msg, setMessage, removeMessage } = useSnackbar();
  
  const {
    register, 
    handleSubmit, 
    reset,
    formState,
  } = useForm<IFormInputs>({mode: 'onBlur', resolver: yupResolver(validationSchema)});

  const formSubmitHandler: SubmitHandler<IFormInputs> = async (data: IFormInputs) => {
    try {
      await restore({email: data.email}).unwrap();
      reset();
      setMessage('success', 'Check your email!');
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
      >
        <Box width='100%'>
          <TextField 
            label="Email" 
            variant="outlined" 
            fullWidth 
            size="small" 
            required
            placeholder='Your email'
            {...register('email')}
            error={!!formState.errors.email?.message}
          />
          {
            formState.errors.email ?
            <FormHelperText error>{formState.errors.email.message}</FormHelperText> :
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
          >Send Email</Button>
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