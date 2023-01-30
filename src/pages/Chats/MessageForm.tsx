import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; 
import { messageValidationSchema } from './validationSchemas';
import { Box, TextField, FormHelperText, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';

interface IMessageFormProps {
  onSubmit: (message: string) => void
  isLoading: boolean
  onTyping: () => void
}

interface IFormInputs {
  msg: string
}

function MessageForm({ onSubmit, isLoading, onTyping }: IMessageFormProps) {

  const {
    register, 
    handleSubmit, 
    reset,
    formState,
  } = useForm<IFormInputs>({mode: 'onSubmit', resolver: yupResolver(messageValidationSchema)}); 

  const formSubmitHandler: SubmitHandler<IFormInputs> = async (data: IFormInputs) => {
    onSubmit(data.msg);
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
      data-testid='msg-form'
      className='msg-form'
    >
      <Box className='wrapper'>
        <TextField 
          // label="Message" 
          placeholder='Your message'
          variant="outlined" 
          fullWidth 
          size="small" 
          required
          {...register(
            'msg',
            {
              onChange: onTyping
            }
          )}
          autoComplete='off'
          error={!!formState.errors.msg?.message}
          inputProps={{ 'data-testid': 'msg-input' }}
        />

        <LoadingButton 
          type='submit'
          className='btn' 
          variant='contained' 
          size='small'
          loading={isLoading}
          loadingIndicator={<CircularProgress size={16} />}
        >Send</LoadingButton>
      </Box>
      {
        formState.errors.msg ?
        <FormHelperText 
          error
          data-testid='msg-validation-message'
        >{formState.errors.msg.message}</FormHelperText> :
        null
      }
    </Box>
  )
}

export default MessageForm