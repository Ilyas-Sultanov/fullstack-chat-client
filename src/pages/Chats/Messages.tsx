import { useRef, useEffect, memo } from 'react';
import { Box, LinearProgress } from '@mui/material';
import { IMessage } from '../../types/message';
import { TypingIndicator } from '../../components';

interface IMessagesProps {
  isLoading: boolean
  isTyping: boolean
  messages: Array<IMessage>
}

function Messages({ isLoading, isTyping, messages }: IMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  return (
    <Box className='content__messages' data-testid='messages'>
      {
        isLoading ? <LinearProgress/> :
        messages && messages.length > 0 ?
        messages.map((msg) => {
          return (
            <p key={msg._id}>{msg.content}</p>
          )
        }) : 
        null
      }
      {
        isTyping ? 
        <TypingIndicator/> : 
        null
      }
      <div ref={bottomRef}></div>
    </Box>
  )
}

export default memo(Messages);