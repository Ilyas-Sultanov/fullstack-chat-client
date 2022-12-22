import { useState, useCallback } from 'react';

interface IMsg {
  type: 'success' | 'info' | 'warning' | 'error',
  text: string,
  duration?: number
}

export function useSnackbar(initialMsg?: IMsg) {
  const [msg, setMsg] = useState<IMsg>(initialMsg ?? {type: 'success', text: ''});

  const setMessage = useCallback(
    function(msg: IMsg) {
      setMsg(msg)
    },
    [setMsg]
  );

  const removeMessage = useCallback(
    function() {
      setMsg({type: msg.type, text: ''})
    },
    [setMsg, msg.type]
  );

  return {
    msg,
    setMessage,
    removeMessage
  }
}