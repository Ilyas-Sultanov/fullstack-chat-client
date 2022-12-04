import { useState } from 'react';

type MsgType = 'success' | 'info' | 'warning' | 'error'

export function useSnackbar() {
  const [msg, setMsg] = useState<{type: MsgType, text: string}>({type: 'success', text: ''});

  function setMessage(type: MsgType, text: string) {
    setMsg({type, text})
  }

  function removeMessage() {
    setMsg({type: msg.type, text: ''})
  }

  return {
    msg,
    setMessage,
    removeMessage
  }
}