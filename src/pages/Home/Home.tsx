import './Home.scss';
import { useState, SyntheticEvent } from 'react';
import { Container, Grid, Card, CardContent, Typography, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { SignInForm, SignUpForm, RestoreForm } from '../../components';
import { useRedirectIfNotAuthorized } from '../../hooks';

function Home() {
  useRedirectIfNotAuthorized('/chats');
  const [value, setValue] = useState('1'); 
  
  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
    
  return (
    <Container maxWidth="xl" className='home' data-testid="home_page">

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
                  <TabList onChange={handleChange} centered data-testid='tab_list'>
                    <Tab label="Sign In" value='1'/>
                    <Tab label="Sign Up" value='2'/>
                    <Tab label="Restore" value='3'/>
                  </TabList>

                  <TabPanel value='1' sx={{padding: '15px 0 0 0'}}>
                    <SignInForm/>
                  </TabPanel>

                  <TabPanel value='2' sx={{padding: '15px 0 0 0'}}>
                    <SignUpForm/>
                  </TabPanel>

                  <TabPanel value='3' sx={{padding: '15px 0 0 0'}}>
                    <RestoreForm/>
                  </TabPanel>
                </TabContext>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

      </Grid>

    </Container>
  )
}

export default Home;