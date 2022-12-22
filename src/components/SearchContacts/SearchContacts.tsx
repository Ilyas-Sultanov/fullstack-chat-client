import './SearchContacts.scss';
import { SyntheticEvent, useState } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Users from './Users';
import GroupChats from './GroupChats';

function SearchContacts() {
  const [tab, setTab] = useState('users'); 

  function changeTab(event: SyntheticEvent, newValue: string) {
    setTab(newValue);
  };

  return (
    <Box className='search-contacts'>
      <TabContext value={tab}>
        <TabList onChange={changeTab} centered data-testid='tab_list'>
          <Tab label="Users" value='users' data-testid='tab_btn-1'/>
          <Tab label="Group Chats" value='group Chats' data-testid='tab_btn-2'/>
        </TabList>

        <TabPanel value='users' sx={{padding: '15px 0 0 0'}}>
          <Users/>
        </TabPanel>

        <TabPanel value='group Chats' sx={{padding: '15px 0 0 0'}}>
          <GroupChats/>
        </TabPanel>
      </TabContext>     
    </Box>
  )
}

export default SearchContacts;