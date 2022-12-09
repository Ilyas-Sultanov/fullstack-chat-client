import './Chats.scss';
import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { logOut } from '../../store/slices/user';
import { useLogoutQuery } from'../../services/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../store/slices/user/selectors/selectUser';

function Chats() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
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
    <Box className='chats' data-testid='chats-page'>

      <Box>
        Chats
        <Button 
            type='submit' 
            variant="contained" 
            onClick={() => setSkip(false)}
          >Log out</Button>
      </Box>
      {
        user ? <Box>{user.name}</Box> : null
      }
    </Box>
  )
}

export default Chats;