import { Modal, Box, TextField, FormHelperText, Button, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; 
import { createGroupValidationSchema } from './validationSchemas';
import { IFormInputs } from './CreateGroupChatForm.types';
import { useCreateGroupChatMutation } from '../../services/chat';
import { isErrorWithMessage, isFetchBaseQueryError } from '../../helpers';
import { Snackbar } from '../../components';
import { useSnackbar } from '../../hooks';

interface CreateGroupChatModalProps {
  open: boolean
  onClose: () => void
}

function CreateGroupChatModal({ open, onClose }: CreateGroupChatModalProps) {
  const { msg, setMessage, removeMessage } = useSnackbar(undefined);
  const [ createGroupChat, { isLoading } ] = useCreateGroupChatMutation();

  const {
    register, 
    handleSubmit, 
    reset,
    formState,
  } = useForm<IFormInputs>({mode: 'onSubmit', resolver: yupResolver(createGroupValidationSchema)}); 

  const formSubmitHandler: SubmitHandler<IFormInputs> = async (data: IFormInputs) => {
    try {
      await createGroupChat(data.name);
      reset();
      onClose();
    }
    catch (err) {
      if (isFetchBaseQueryError(err)) {
        const errMsg = 'error' in err ? err.error : (err.data as {message: string}).message;
        setMessage({type: 'error', text: errMsg, duration: 6000});
      } 
      else if (isErrorWithMessage(err)) {
        setMessage({type: 'error', text: err.message, duration: 6000});
      }
    }
  };

  function cancelHandler() {
    reset();
    onClose();
  }

  function closeHandler() {
    removeMessage();
  }

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='create-group-chat-modal'
        data-testid='create-group-chat-modal'
      >
        <Box 
          component='form' 
          onSubmit={handleSubmit(formSubmitHandler)}
          display='flex' 
          rowGap={2} 
          flexWrap='wrap'
          justifyContent='center'
          className='form'
          data-testid='create-group-form'
        >
          <Box width='100%'>
            <TextField 
              label="Chat Name" 
              variant="outlined" 
              fullWidth 
              size="small" 
              required
              {...register('name')}
              autoComplete='off'
              error={!!formState.errors.name?.message}
              className='name-input'
              inputProps={{'data-testid': 'name-input'}}
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

          <Box className='buttons'>
            <Button
              type='button'
              className='btn'
              variant='contained'
              size="small"
              color='error'
              onClick={cancelHandler}
            >Cancel</Button>

            <LoadingButton
              type='submit'
              className='btn'
              variant='contained'
              size="small"
              color="success"
              loading={isLoading}
              loadingIndicator={<CircularProgress size={16} />}
            >Create</LoadingButton>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={!!msg.text}
        autoHideDuration={msg.duration} 
        onClose={closeHandler}
        message={msg.text}
        severity={msg.type}
      />
    </>
    
  )
}

export default CreateGroupChatModal;