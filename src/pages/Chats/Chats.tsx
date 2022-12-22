import './Chats.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AdminPanelSettingsOutlined } from '@mui/icons-material';
import Sidebar from './Sidebar';
import { selectUser } from '../../store/slices/user/selectors/selectUser';
import { selectSelectedChat } from '../../store/slices/chat/selectors/selectors';
import { setSelectedChat } from '../../store/slices/chat/chatSlice';
import { getChatName } from './helpers';
import { useDeleteUserFromChatMutation } from '../../services/chat';
import { Snackbar } from '../../components';
import { useSnackbar } from '../../hooks';
import { isErrorWithMessage, isFetchBaseQueryError } from '../../helpers/RTKQueryErrorTypePredicates';
import AdminChatModal from './AdminChatModal';
import { useState } from 'react';

function Chats() {
  const dispatch = useDispatch();
  const { msg, setMessage, removeMessage } = useSnackbar();
  const user = useSelector(selectUser);
  const selectedChat = useSelector(selectSelectedChat);
  const [ deleteUserFromChat, { isLoading } ] = useDeleteUserFromChatMutation();
  const [ openAdminChatModal, setOpenAdminChatModal ] = useState(false);

  async function leave() {
    try {
      if (user && selectedChat) {
        await deleteUserFromChat({chatId: selectedChat._id, userId: user._id}).unwrap();
        dispatch(setSelectedChat(null));
        setMessage({type: 'success', text: 'You have left the chat.', duration: 6000});
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

  function closeHandler() {
    removeMessage();
  }

  return (
    <Box className='chats' data-testid='chats-page'>
      <Sidebar/>
      <Box component='main' className='content'>
        {
          selectedChat && user &&
          <>
            <Box className='content__header'>
              <Typography component='h1' className='content__title'>{getChatName(user, selectedChat)}</Typography>
              <Box className='content__actions'>
                <LoadingButton 
                  className='btn' 
                  variant='contained' 
                  size='small'
                  loading={isLoading}
                  loadingIndicator={<CircularProgress size={16} />}
                  onClick={leave}
                >Leave Chat</LoadingButton>
                {
                  selectedChat.isGroupChat && user._id === selectedChat.groupAdmin._id &&
                  <Button 
                    className='btn' 
                    variant='contained' 
                    size='small'
                    onClick={() => setOpenAdminChatModal(true)}
                  >
                    <AdminPanelSettingsOutlined/>
                  </Button>
                }
              </Box>
            </Box>
            <Box className='content__messages'>
              777
            </Box>
          </>
        }
        
      </Box>
      <Snackbar
        open={!!msg.text}
        autoHideDuration={msg.duration} 
        onClose={closeHandler}
        message={msg.text}
        severity={msg.type}
      />
      <AdminChatModal
        open={openAdminChatModal}
        onClose={() => setOpenAdminChatModal(false) }
      />
    </Box>
  )
}

export default Chats;