import './Home.scss';
import { useState, useEffect, SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, Tab, Box } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { SignInForm, SignUpForm, RestoreForm } from '../../components';
import { isErrorWithMessage, isFetchBaseQueryError } from '../../helpers';
import { INewUser } from '../../types';
import { Snackbar } from '../../components';
import { useSnackbar } from '../../hooks';
import { setUser } from '../../store/slices/user';
import { useLoginMutation } from '../../services/auth';
import { useRegistrationMutation } from '../../services/auth';
import { useRestoreMutation } from '../../services/auth';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [ value, setValue ] = useState('1'); 
  const { msg, setMessage, removeMessage } = useSnackbar(location.state ?? undefined);
  const [ login, {isLoading: loginIsLoading} ] = useLoginMutation();
  const [ registration, {isLoading: regIsLoading} ] = useRegistrationMutation();
  const [ restore, {isLoading: resIsLoading} ] = useRestoreMutation(); 
  
  useEffect(
    function() {
      if (location.state) {
        // если есть location.state, то удаляем его, 
        // чтобы при перезагрузке страницы, сообщение снова не появлялось.
        // Удаление происхолит без ререндера.
        window.history.replaceState({}, document.title);
      }
    },
    [location.state]
  );
   
  function changeTab(event: SyntheticEvent, newValue: string) {
    setValue(newValue);
  };

  function closeHandler() {
    removeMessage();
  }

  async function signIn(email: string, password: string) {
    try {
      const responseData = await login({email, password}).unwrap();
      dispatch(setUser(responseData.user));
      localStorage.setItem('token', responseData.accessToken);
      navigate('/chats');
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
  };

  async function signUp(name: string, email: string, password: string) {
    try {
      const newUser: INewUser = {name, email, password}
      await registration(newUser).unwrap();
      setMessage({type: 'success', text: 'You have successfully registered!', duration: 6000});
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
  };

  async function restorePassword(email: string) {
    try {
      await restore({email}).unwrap();
      setMessage({type: 'success', text: 'Check your email!', duration: 6000});
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
  };
    
  return (
    <Box className='home-page' data-testid="home_page">
      <Grid container display='flex' flexDirection='column' rowGap={2}>

        <Grid container justifyContent='center'>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography textAlign='center'>My Chat</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container justifyContent='center'>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <TabContext value={value}>
                  <TabList onChange={changeTab} centered data-testid='tab_list'>
                    <Tab label="Sign In" value='1' data-testid='tab_btn-1'/>
                    <Tab label="Sign Up" value='2' data-testid='tab_btn-2'/>
                    <Tab label="Restore" value='3' data-testid='tab_btn-3'/>
                  </TabList>

                  <TabPanel value='1' sx={{padding: '15px 0 0 0'}}>
                    <SignInForm onSubmit={signIn} isLoading={loginIsLoading}/>
                  </TabPanel>

                  <TabPanel value='2' sx={{padding: '15px 0 0 0'}}>
                    <SignUpForm onSubmit={signUp} isLoading={regIsLoading}/>
                  </TabPanel>

                  <TabPanel value='3' sx={{padding: '15px 0 0 0'}}>
                    <RestoreForm onSubmit={restorePassword} isLoading={resIsLoading}/>
                  </TabPanel>
                </TabContext>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

      </Grid>

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

export default Home;