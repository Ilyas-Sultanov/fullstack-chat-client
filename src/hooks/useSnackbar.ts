import { useState } from 'react';

interface IMsg {
  type: 'success' | 'info' | 'warning' | 'error',
  text: string,
  duration?: number
}

export function useSnackbar(initialMsg?: IMsg) {
  const [msg, setMsg] = useState<IMsg>(initialMsg ?? {type: 'success', text: ''});

  function setMessage(msg: IMsg) {
    setMsg(msg)
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