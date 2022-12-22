import { IUser } from '../../types';
import { useDispatch } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { PersonRemove } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import { isErrorWithMessage, isFetchBaseQueryError } from '../../helpers';
import { useDeleteUserFromChatMutation } from '../../services/chat';
import { deleteUserFromState } from '../../store/slices/chat/chatSlice';
import { Snackbar } from '../../components';
import { useSnackbar } from '../../hooks';

interface IChatMemberProps extends IUser {
  chatId: string
  children?: never
}

function ChatMember({chatId, _id, name, email }: IChatMemberProps) {
  const dispatch = useDispatch();
  const { msg, setMessage, removeMessage } = useSnackbar(undefined);
  const [ deleteUserFromChat, { isLoading } ] = useDeleteUserFromChatMutation();

  async function deleteFromChat() {
    try {
      await deleteUserFromChat({chatId, userId: _id}).unwrap();
      dispatch(deleteUserFromState(_id));
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

  function closeHandler() {
    removeMessage();
  }

  return (
    <Box className='chat-member'>
      <Typography component='span'>{name}</Typography>
      <LoadingButton  
        className='btn-delete' 
        variant='text' 
        size='small'
        loading={isLoading}
        loadingIndicator={<CircularProgress size={16} />}
        onClick={deleteFromChat}
        disableRipple
        color='error'
      ><PersonRemove/></LoadingButton>
      <Snackbar
        open={!!msg.text}
        autoHideDuration={msg.duration} 
        onClose={closeHandler}
        message={msg.text}
        severity={msg.type}
      />
    </Box>
  )
}

export default ChatMember;