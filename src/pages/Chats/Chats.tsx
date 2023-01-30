import './Chats.scss';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AdminPanelSettingsOutlined } from '@mui/icons-material';
import Sidebar from './Sidebar';
import { selectUser } from '../../store/slices/user/selectors/selectUser';
import { selectSelectedChat } from '../../store/slices/chat/selectors/selectors';
import { setSelectedChat } from '../../store/slices/chat/chatSlice';
import { getChatName, debounce } from './helpers';
import { useDeleteUserFromChatMutation } from '../../services/chat';
import { useLazyGetMessagesQuery, useSendMessageMutation } from '../../services/message'; 
import { IPaginatedData } from '../../types/paginatedData';
import { Snackbar } from '../../components';
import { useSnackbar } from '../../hooks';
import { isErrorWithMessage, isFetchBaseQueryError } from '../../helpers/RTKQueryErrorTypePredicates';
import AdminChatModal from './AdminChatModal';
import { IMessage } from '../../types/message';
import MessageForm from './MessageForm';
import Messages from './Messages';
import io, {Socket} from 'socket.io-client';
import { apiUrl } from '../../api/baseUrl';
import { IChat } from '../../types/chat';

let socket: Socket | null = null;
let selectedChatCompare: IChat | null = null;

function Chats() {
  const dispatch = useDispatch();
  const { msg, setMessage, removeMessage } = useSnackbar();
  const user = useSelector(selectUser);
  const selectedChat = useSelector(selectSelectedChat);
  const [ deleteUserFromChat, { isLoading: deleteUserIsLoading } ] = useDeleteUserFromChatMutation();
  const [ openAdminChatModal, setOpenAdminChatModal ] = useState(false);

  const pageRef = useRef(1);
  const limitRef = useRef(25);
  const [ responseData, setResponseData ] = useState<IPaginatedData<IMessage> | null>(null);
  const [ fetchMessages, { isLoading: fetchMessagesIsLoading } ] = useLazyGetMessagesQuery(); 
  const [ sendMessage, {isLoading: sendMessageIsLoading} ] = useSendMessageMutation();

  const [ isTyping, setIsTyping ] = useState(false);

  useEffect(() => {
    socket = io(apiUrl);
    socket.emit('setup', user?._id);
    // socket.on( 'connected', () => console.log('Connected to server'));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, [user?._id]);

  useEffect(() => {
    if (socket) {
      socket.on('message recieved', (msg: IMessage) => { 
        if (selectedChatCompare?._id === msg.chatId) {
          setResponseData((prev) => {
            let newData: IPaginatedData<IMessage> | null;
            if (!prev) {
              newData = {
                currentPage: 1,
                limit: 25,
                link: '',
                totalNumberOfMatches: 1,
                data: [msg]
              }
            }
            else {
              newData = { ...prev, data: [...prev.data, msg] }
            }
            return newData;
          });
        }
      })
    }
    return () => { // без этого, у всех получателей (но не у отправителя) сообщения, оно отображается несколько раз, т.е. на каждый ререндер.
      if (socket) {
        socket.off('message recieved')
      }
    }
  }); // Внимание, массива зависимостей нет. 
  
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

  const getMessages = useCallback(
    async function() { 
      try {
        if (selectedChat && socket) {
          const result = await fetchMessages({chatId: selectedChat._id, page: pageRef.current, limit: limitRef.current}).unwrap();
          setResponseData((prev) => {
            const messages = prev && prev.data.length > 0 && prev.data[0].chatId === selectedChat._id ? [...result.data, ...prev.data] : [...result.data]; 
            const newData = {...result, data: messages};
            return newData;
          });

          socket.emit('connect to chat', selectedChat._id)
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
    },
    [fetchMessages, setMessage, selectedChat]
  );

  const sendMsg = useCallback(
    async function(message: string) {
      try {
        if (socket && selectedChat) {
          socket.emit("stop typing", selectedChat._id);
        }
        if (selectedChat && user && socket) {
          const msg = await sendMessage( {chatId: selectedChat._id, content: message} ).unwrap();
          socket.emit('new message', { chat: selectedChat, msg });
          setResponseData((prev) => {
            let newData: IPaginatedData<IMessage> | null;
            if (!prev) {
              newData = {
                currentPage: 1,
                limit: 25,
                link: '',
                totalNumberOfMatches: 1,
                data: [msg]
              }
            }
            else {
              newData = { ...prev, data: [...prev.data, msg] }
            }
            return newData;
          });
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
    }, 
    [selectedChat, setMessage, sendMessage, user]
  );

  const hideTypingIndicator = debounce(
    function() {
      if (socket && selectedChat) {
        socket.emit("stop typing", selectedChat._id);
        setIsTyping(false);
      }
    },
    3000
  );

  const typingHandler = () => {
    if (socket && selectedChat) {
      if (!isTyping) {
        setIsTyping(true);
        socket.emit("typing", selectedChat._id);
      }

      hideTypingIndicator();
    }
  };

  useEffect(() => {
    getMessages();
    selectedChatCompare = selectedChat;
  }, [getMessages, selectedChat]);

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
                  loading={deleteUserIsLoading}
                  loadingIndicator={<CircularProgress size={16} />}
                  onClick={leave}
                >Leave Chat</LoadingButton>
                {
                  selectedChat.isGroupChat && user._id === selectedChat.groupAdmin?._id &&
                  <Button 
                    className='btn' 
                    variant='contained' 
                    size='small'
                    onClick={() => setOpenAdminChatModal(true)}
                    aria-label='chat admin button' // это вместо текста кнопки (т.к. иконка вместо текста), чтобы найти эту кнопку в тестах.
                  >
                    <AdminPanelSettingsOutlined/>
                  </Button>
                }
              </Box>
            </Box>

            <Messages 
              isLoading={fetchMessagesIsLoading}
              isTyping={isTyping}
              messages={responseData ? responseData.data : []}
            /> 

            <MessageForm
              onSubmit={sendMsg}
              isLoading={sendMessageIsLoading}
              onTyping={typingHandler}
            />
            
          </>
        }
        
      </Box>
      <Snackbar
        open={!!msg.text}
        autoHideDuration={msg.duration} 
        onClose={removeMessage}
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