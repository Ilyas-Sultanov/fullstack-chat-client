import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../helpers/testUtils';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Chats from './Chats';
import { IUser } from '../../types';
import { IChat } from '../../types/chat';

const user: IUser = {
  _id: '1',
  name: 'test user',
  email: 'test email',
  avatar: '',
  roles: ['user'],
  isActivated: true,
  createdAt: '',
}

const user2: IUser = {
  _id: '2',
  name: 'test user2',
  email: 'test email2',
  avatar: '',
  roles: ['user'],
  isActivated: true,
  createdAt: '',
}

const selectedChat: IChat = {
  _id: '63972642f1adba5fb136df23',
  name: "Test group chat",
  isGroupChat: true,
  users: [user, user2],
  groupAdmin: user,
  createdAt: '2022-12-12T13:01:54.747',
}

describe('Chats page', () => {

  describe('Chat admin', () => {
    beforeEach(() => {
      renderWithProviders(
        <MemoryRouter initialEntries={['/chats']}>
          <Routes>
            <Route path='/chats' element={<Chats/>}></Route>
          </Routes>
        </MemoryRouter>,
        { 
          preloadedState: { 
            user: { user: user },
            chat: { selectedChat: selectedChat} 
          } 
        }
      )
    });

    test('Check chats page', () => {
      const chatsPage = screen.getByTestId('chats-page');
      expect(chatsPage).toBeInTheDocument();
    });
  
    test('Name of selected chat should be rendered.', () => {
      const chatName = screen.getByText(selectedChat.name);
      expect(chatName).toBeInTheDocument();
    });
  
    test('Leave chat button should be rendered.', () => {
      const btn = screen.getByRole('button', { name: /Leave chat/i });
      expect(btn).toBeInTheDocument();
    });
    
    test('Chat admin button should be rendered.', () => {
      const btn = screen.getByRole('button', { name: /chat admin button/i });
      expect(btn).toBeInTheDocument();
    });
  })
  
  describe('Chat member', () => {
    beforeEach(() => {
      renderWithProviders(
        <MemoryRouter initialEntries={['/chats']}>
          <Routes>
            <Route path='/chats' element={<Chats/>}></Route>
          </Routes>
        </MemoryRouter>,
        { 
          preloadedState: { 
            user: { user: user2 },
            chat: { selectedChat: selectedChat} 
          } 
        }
      )
    });

    test('Chat admin button should not be rendered.', () => {
      const btn = screen.queryByRole('button', { name: /chat admin button/i });
      expect(btn).not.toBeInTheDocument();
    });
  })
  
});