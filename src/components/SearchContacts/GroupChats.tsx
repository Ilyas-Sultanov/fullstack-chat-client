import { useState, useRef, useCallback } from 'react';
import { Box, LinearProgress } from '@mui/material';
import SearchGroupForm from './SearchGroupForm';
import { IChat } from '../../types/chat';
import GroupChat from './GroupChat';
import { useLazySearchChatQuery } from '../../services/chat';
import { IPaginatedData } from '../../types/paginatedData';
import { isErrorWithMessage, isFetchBaseQueryError } from '../../helpers';
import { Snackbar } from '../../components';
import { useSnackbar } from '../../hooks';

function GroupChats() {
  const nameRef = useRef('');
  const pageRef = useRef(1);
  const limitRef = useRef(25);
  const [ search, {isLoading} ] = useLazySearchChatQuery();
  const [ responseData, setResponseData ] = useState<IPaginatedData<IChat> | null>(null);
  const { msg, setMessage, removeMessage } = useSnackbar(undefined);

  const searchGroupChat = useCallback(
    async function(name?: string) { 
      try {
        if (name) { // если сделали запрос с новым именем пользователя.
          nameRef.current = name;
          pageRef.current = 1;
        }
        const result = await search({name: name ?? nameRef.current, page: pageRef.current, limit: limitRef.current}).unwrap();
        const chats = responseData && !name ? [...responseData.data, ...result.data] : [...result.data];
        const newData = {...result, data: chats}
        setResponseData(newData);
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
    [search, responseData, setMessage]
  );

  const observer = useRef<IntersectionObserver>();
  const lastChatRef = useCallback((chat: Element) => { 
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((chats) => {
      if (responseData) {
        const hasNextPage = (responseData.totalNumberOfMatches / responseData.limit) > responseData.currentPage;
        if (chats[0].isIntersecting && hasNextPage) { 
          pageRef.current = pageRef.current + 1;
          searchGroupChat()
        }
      }
    })
    if (chat) observer.current.observe(chat);
  }, [isLoading, responseData, searchGroupChat]);

  function closeHandler() {
    removeMessage();
  }

  return (
    <Box className='group-chat-contacts'>
      <SearchGroupForm
        isLoading={isLoading}
        onSubmit={searchGroupChat}
      />
      <Box className='search-results' data-testid='search-results'>
        { 
          isLoading ? <LinearProgress/> :
          responseData && responseData.data.length > 0 ?
          responseData.data.map((chat, index) => {
            if (responseData.data.length === index + 1) {
              return <GroupChat key={chat._id} chat={chat} ref={lastChatRef}/>
            }
            return <GroupChat key={chat._id} chat={chat}/>
          }) : 
          responseData && responseData.data.length === 0 ?
          'Not found' : 
          null
        }
      </Box>      
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

export default GroupChats
