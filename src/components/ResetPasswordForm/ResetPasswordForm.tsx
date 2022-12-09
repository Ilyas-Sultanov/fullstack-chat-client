import { Box, Button, TextField, FormHelperText, CircularProgress } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; 
import { IFormInputs } from './ResetPasswordForm.types';
import { validationSchema } from './validationSchema';

interface IResetFormProps {
  onSubmit: (password: string) => void
  isLoading: boolean
}

export function ResetPasswordForm({onSubmit, isLoading}: IResetFormProps) {
  const {
    register, 
    handleSubmit, 
    reset,
    formState,
  } = useForm<IFormInputs>({mode: 'onBlur', resolver: yupResolver(validationSchema)});

  const formSubmitHandler: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
    onSubmit(data.password);
    reset();
  };

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
          >Reset</Button>
        }      
      </Box>
    </>
  )
}