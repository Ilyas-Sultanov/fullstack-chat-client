import { forwardRef } from 'react'
import { IChat } from '../../types/chat';
import { Box, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useJoinToGroupChatMutation } from '../../services/chat';
import { isErrorWithMessage, isFetchBaseQueryError } from '../../helpers';
import { Snackbar } from '../../components';
import { useSnackbar } from '../../hooks';
import { useDispatch } from 'react-redux';
import { setSearchContactsDrawerIsOpen } from '../../store/slices/searchContactsDrawer/searchContactsDrawerSlice';

const GroupChat = forwardRef(
  function({chat}: {chat: IChat}, ref) {
    const dispatch = useDispatch();
    const { msg, setMessage, removeMessage } = useSnackbar(undefined);
    const [ joinToGroupToChat, { isLoading } ] = useJoinToGroupChatMutation();

    async function join() {
      try {
        await joinToGroupToChat(chat._id).unwrap();
        dispatch(setSearchContactsDrawerIsOpen(false));
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
      <>
        <Box ref={ref ?? undefined} className='chat' data-testid='chat'>
          <LoadingButton
            type='button' 
            fullWidth 
            className='btn'
            onClick={join}
            loading={isLoading}
            loadingIndicator={<CircularProgress size={16} />}
          >
            <span>{chat.name}</span>
            <span>{chat.users.length} members</span>
          </LoadingButton>
        </Box>
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
);

export default GroupChat;
