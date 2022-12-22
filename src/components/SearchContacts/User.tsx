import { forwardRef } from 'react'
import { Box, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAccessChatMutation } from '../../services/chat';
import { IUser } from '../../types/user';
import { isErrorWithMessage, isFetchBaseQueryError } from '../../helpers';
import { Snackbar } from '../../components';
import { useSnackbar } from '../../hooks';
import { useDispatch } from 'react-redux';
import { setSearchContactsDrawerIsOpen } from '../../store/slices/searchContactsDrawer/searchContactsDrawerSlice';

const User = forwardRef( ({user}: {user: IUser}, ref) => {
  // только последний <User/> должен иметь ref (если ref передан, значит это последний <User/>).
  const dispatch = useDispatch();
  const { msg, setMessage, removeMessage } = useSnackbar(undefined);
  const [ accessChat, { isLoading } ] = useAccessChatMutation();

  async function access() {
    try {
      await accessChat(user._id).unwrap();
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

  const content = 
    <>
      <Box ref={ref ?? undefined} className='user'>
        <LoadingButton
           type='button' 
           fullWidth 
           className='btn'
           onClick={access}
           loading={isLoading}
           loadingIndicator={<CircularProgress size={16} />}
        >
          <span>{user.name}</span>
          <span>{user.email}</span>
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
  return content;
})

export default User