import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; 
import { Box, TextField, Button, FormHelperText, CircularProgress } from '@mui/material';
import { validationSchema } from './validationSchema';
import { IFormInputs } from './RestoreForm.types';

interface IRestoreFormProps {
  onSubmit: (email: string) => void
  isLoading: boolean
}

export function RestoreForm({ onSubmit, isLoading }: IRestoreFormProps) {
  const {
    register, 
    handleSubmit, 
    reset,
    formState,
  } = useForm<IFormInputs>({mode: 'onBlur', resolver: yupResolver(validationSchema)});

  const formSubmitHandler: SubmitHandler<IFormInputs> = async (data: IFormInputs) => {
    onSubmit(data.email);
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
        data-testid='restore-form'
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

        {
          isLoading ? 
          <CircularProgress data-testid='spiner'/> :
          <Button 
            type='submit' 
            variant="contained" 
            fullWidth
            disabled={!formState.isValid}
            data-testid='submit-btn'
          >Send Email</Button>
        }      
      </Box>
    </>
  )
}