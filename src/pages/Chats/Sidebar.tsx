import { memo, useState, ChangeEvent } from 'react';
import { Box, Button, FormControl, RadioGroup, FormControlLabel, Radio, Stack, LinearProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { selectSelectedChat } from '../../store/slices/chat/selectors/selectors';
import { setSelectedChat } from '../../store/slices/chat/chatSlice';
import { useGetUserChatsQuery } from '../../services/chat';
import { IChat } from '../../types/chat';
import { isErrorWithMessage, isFetchBaseQueryError } from '../../helpers';
import { selectUser } from '../../store/slices/user/selectors/selectUser';
import { getChatName } from './helpers';
import CreateGroupChatModal from './CreateGroupChatModal';

function Sidebar() {
  const currentUser = useSelector(selectUser)!;
  const dispatch = useDispatch();
  const [ value, setValue ] = useState('users');
  const [ modalIsOpen, setModalIsOpen ] = useState(false);
  const selectChat = useSelector(selectSelectedChat);

  const { oneOnOneChats, groupChats, getUserChatIsLoading, error } = useGetUserChatsQuery(null, {
    selectFromResult: ({data, isLoading: getUserChatIsLoading, error}) => {
      if (data) {
        const oneOnOneChats: Array<IChat> = [];
        const groupChats: Array<IChat> = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].isGroupChat) groupChats.push(data[i])
          else oneOnOneChats.push(data[i])
        }
        return {oneOnOneChats, groupChats, getUserChatIsLoading, error}
      }
      return {data, getUserChatIsLoading, error}
    }
  });

  const changeChatType = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  if (error) {
    let message = '';
    if (isFetchBaseQueryError(error)) {
      const because = 'error' in error ? error.error : (error.data as {message: string}).message;
      console.log(because);
      message = 'Fetch chats error';
    } 
    else if (isErrorWithMessage(error)) {
      message = error.message;
    }
    return <Box>{message}</Box>
  }

  const chats = value === 'users' ? oneOnOneChats : groupChats;

  return (
    <Box component='aside' className='sidebar' data-testid='chats-sidebar'>
      <Box className='sidebar__header'>
        <FormControl>
          <RadioGroup
            value={value}
            onChange={changeChatType}
            className='radio-group'
          >
            <FormControlLabel value="users" control={<Radio size="small"/>} label="Users" />
            <FormControlLabel value="groups" control={<Radio size="small"/>} label="Group Chats" />
          </RadioGroup>
          {
            value === 'groups' ? 
            <Button 
              className='create-btn'
              onClick={() => setModalIsOpen(true)}
            >Create Group</Button> :
            null
          }
        </FormControl>
      </Box>
      {
        getUserChatIsLoading ? <LinearProgress/> :
        <Stack className='sidebar__chat-list'>
          {
            chats ? chats.map((chat) => {
              return (
                <Button
                  key={chat._id}
                  data-testid='user-chat'
                  className={`sidebar__chat ${selectChat && selectChat._id === chat._id ? 'active' : ''}`}
                  onClick={() => dispatch(setSelectedChat(chat))}
                >{getChatName(currentUser, chat)}</Button> // Для чата один на один имя собеседника является названием чата, поэтому нужно выбрать имя не текущего пользователя. Для группового чата имя остается как есть.
              )
            }) : null
          }
        </Stack>
      }
      <CreateGroupChatModal 
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      />
    </Box>
  )
}

export default memo(Sidebar);