import { Modal, Box, TextField, Typography, FormHelperText, Button, CircularProgress, InputLabel, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'; 
import { validationSchema } from './validationSchema';
import { IFormInputs } from './CreateGroupChatForm.types';
import { useRenameGroupChatMutation, useDeleteGroupChatMutation } from '../../services/chat';
import { isErrorWithMessage, isFetchBaseQueryError } from '../../helpers';
import { Snackbar } from '../../components';
import { useSnackbar } from '../../hooks';
import { selectSelectedChat } from '../../store/slices/chat/selectors/selectors';
import { useSelector, useDispatch } from 'react-redux';
import ChatMember from './ChatMember';
import { setSelectedChat } from '../../store/slices/chat/chatSlice';

interface IAdminChatModalProps {
  open: boolean
  onClose: () => void
}

function CreateGroupChatModal({ open, onClose }: IAdminChatModalProps) {
  const dispatch = useDispatch();
  const chat = useSelector(selectSelectedChat);
  const { msg, setMessage, removeMessage } = useSnackbar(undefined);
  const [ renameGroupChat, { isLoading: renameGroupIsLoading } ] = useRenameGroupChatMutation();
  const [ deleteGroupChat, { isLoading: deleteGroupIsLoading } ] = useDeleteGroupChatMutation();
  
  const {
    register, 
    handleSubmit, 
    reset,
    formState,
  } = useForm<IFormInputs>({mode: 'onSubmit', resolver: yupResolver(validationSchema)}); 

  const formSubmitHandler: SubmitHandler<IFormInputs> = async (data: IFormInputs) => {
    try {
      if (chat) {
        await renameGroupChat({ groupChatId: chat._id, newName: data.name });
        reset();
        onClose();
      }
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

  async function deleteGroup() {
    try {
      if (chat) {
        await deleteGroupChat(chat._id).unwrap();
        dispatch(setSelectedChat(null));
        onClose();
      }
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
  }

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
        className='admin-chat-modal'
      >
        <Box className='admin-chat-modal__content'>
          <Box 
            component='form' 
            noValidate
            onSubmit={handleSubmit(formSubmitHandler)}
            display='flex' 
            rowGap={2} 
            flexWrap='wrap'
            justifyContent='center'
            className='rename-chat-form'
            data-testid='rename-chat-form'
          >
            <Box width='100%' display='flex'>
              <Box>
                <InputLabel shrink htmlFor="rename-chat-input">Rename Chat</InputLabel>
                <Box display='flex' alignItems='center'>
                  <TextField 
                    id="rename-chat-input"
                    label="New Name" 
                    variant="outlined" 
                    size="small" 
                    required
                    {...register('name')}
                    autoComplete='off'
                    error={!!formState.errors.name?.message}
                    className='name-input'
                    inputProps={{'data-testid': 'name-input'}}
                  />
                  <LoadingButton
                    type='submit'
                    className='btn'
                    variant='contained'
                    size="small"
                    color="success"
                    loading={renameGroupIsLoading}
                    loadingIndicator={<CircularProgress size={16} />}
                    sx={{alignSelf: 'stretch', marginLeft: '5px'}}
                  >Apply</LoadingButton>
                </Box>
                  {
                    formState.errors.name ?
                    <FormHelperText 
                      error
                      data-testid='name-validation-message'
                    >{formState.errors.name.message}</FormHelperText> :
                    null
                  }
              </Box>
            </Box>
          </Box>

          <LoadingButton
            variant='contained'
            color='error'
            size='small'
            onClick={deleteGroup}
            loading={deleteGroupIsLoading}
            loadingIndicator={<CircularProgress size={16} />}
          >Delete Chat</LoadingButton>

          <Box className='chat-members'>
            <Typography 
              component='p'
              className='memvers-list-title'
            >Chat Members</Typography>
            <Stack spacing={1} divider={<hr className='divider'></hr>} className='memvers-list'>
              {
                chat && 
                chat.users.map((user) => {
                  return (
                    <ChatMember 
                      key={user._id} 
                      chatId={chat._id}
                      {...user}
                    />
                  )
                })
              }
            </Stack>
          </Box>

          <Button
            type='button'
            className='btn'
            variant='contained'
            size="small"
            color='primary'
            onClick={cancelHandler}
          >Close</Button>
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