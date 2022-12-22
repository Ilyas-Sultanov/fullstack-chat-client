import './Header.scss';
import { useState } from 'react';
import { Box, Typography, Button, Menu, MenuItem, Drawer } from '@mui/material';
import { selectUser } from '../../store/slices/user/selectors/selectUser';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutQuery } from'../../services/auth';
import { logOut } from '../../store/slices/user';
import SearchContacts from '../SearchContacts/SearchContacts';
import { setSearchContactsDrawerIsOpen } from '../../store/slices/searchContactsDrawer/searchContactsDrawerSlice';
import { selectSearchContactsDrawerIsOpen } from '../../store/slices/searchContactsDrawer/selectors/selectors';
import { apiSlice } from '../../api';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [skip, setSkip] = useState(true);
  useLogoutQuery('', {skip});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const drawerIsOpen = useSelector(selectSearchContactsDrawerIsOpen);
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function signOut() {
    localStorage.removeItem('token');
    dispatch(logOut());
    dispatch(apiSlice.util.resetApiState()); // удаляет весь кеш, если этого не сделать то данные одного пользователя окажутся видны для другого пользователя (вошедшего с этого же устройства), который вошол в течении времени когда кеш еще не удалился.
    setAnchorEl(null);
    setSkip(false);
    navigate('/');
  }

  return (
    <header className='header'>
      {
        user ? 
        <>
          <Button 
            className='search-btn'
            variant='text'
            sx={{ color: '#fff'}}
            disableRipple={true}
            onClick={() => dispatch(setSearchContactsDrawerIsOpen(true)) }
          >Search Contacts</Button>
          <Drawer
            className='search-contacts-drawer'
            anchor='left'
            open={drawerIsOpen}
            onClose={() => dispatch(setSearchContactsDrawerIsOpen(false)) }
          >
            <SearchContacts/>
          </Drawer>
        </>
        : 
        null
      }
      <Typography component='span' className='logo'>My chat</Typography>
      {
        user ?
        <Box className='user-btn'>
          <Button
            className='auth-btn'
            id="basic-button"
            aria-controls={openMenu ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? 'true' : undefined}
            onClick={handleClick}
            disableRipple={true}
          >
            {user?.name}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          > 
            {
              user?.roles.includes('admin') ?
              <MenuItem onClick={handleClose}>Admin panel</MenuItem> :
              null
            }
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={signOut}>Sign out</MenuItem>
          </Menu>
        </Box> : 
        null
      }
    </header>
  )
}

export default Header;