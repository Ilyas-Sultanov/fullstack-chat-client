import './Chats.scss';
import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
// import { useLogoutQuery, logOut } from '../../store/slices/auth';
import { logOut } from '../../store/slices/user';
import { useLogoutQuery } from'../../services/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Chats() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [skip, setSkip] = useState(true);
  const {data, isSuccess} = useLogoutQuery('', {skip});

  useEffect(
    function() {
      if (isSuccess) {
        localStorage.removeItem('token');
        dispatch(logOut());
        navigate('/');
      }
    },
    [isSuccess, navigate, dispatch]
  );

  return (
    <Box className='chats'>
      Chats
      <Button 
          type='submit' 
          variant="contained" 
          onClick={() => setSkip(false)}
        >Log out</Button>
    </Box>
  )
}

export default Chats;