import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../helpers/testUtils';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Chats from './Chats';
import { IUser } from '../../types';
import { IChat } from '../../types/chat';

window.setImmediate = window.setTimeout  as unknown as typeof setImmediate; // Без этого, получаем следующую ошибку: ReferenceError: setImmediate is not defined
window.HTMLElement.prototype.scrollIntoView = function() {}; // Без этого, получаем следующую ошибку:  TypeError: _bottomRef$current.scrollIntoView is not a function

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

  describe('Messages', () => {
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

    test('Messages container should be rendered', () => {
      const messagesContainer = screen.getByTestId('messages');
      expect(messagesContainer).toBeInTheDocument();
    })

  })
  
});




/**
 * https://medium.com/@tozwierz/testing-socket-io-with-jest-on-backend-node-js-f71f7ec7010f
 * How to test Socket.io with Jest on backend (Node.js)?
 * In one of our projects we’ve decided to use Socket.io to handle webscockets and to use a Jest to write BDD/TDD tests. Simply because on frontend we are using Jest too. And we wanted to use one test framework in all project.
 * This has proven to be a challenge. We cannot find any working example. Documentation did not cover our use case.
 * So for all of you with this problem I’ve created a boilerplate. I hope it will save you a couple of hours.
 * 
 * 
 * const io = require('socket.io-client');
const http = require('http');
const ioBack = require('socket.io');

let socket;
let httpServer;
let httpServerAddr;
let ioServer;

/**
 * Setup WS & HTTP servers
 */
// beforeAll((done) => {
//   httpServer = http.createServer().listen();
//   httpServerAddr = httpServer.listen().address();
//   ioServer = ioBack(httpServer);
//   done();
// });

/**
 *  Cleanup WS & HTTP servers
 */
// afterAll((done) => {
//   ioServer.close();
//   httpServer.close();
//   done();
// });

/**
 * Run before each test
 */
// beforeEach((done) => {
  // Setup
  // Do not hardcode server port and address, square brackets are used for IPv6
//   socket = io.connect(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`, {
//     'reconnection delay': 0,
//     'reopen delay': 0,
//     'force new connection': true,
//     transports: ['websocket'],
//   });
//   socket.on('connect', () => {
//     done();
//   });
// });

/**
 * Run after each test
 */
// afterEach((done) => {
//   // Cleanup
//   if (socket.connected) {
//     socket.disconnect();
//   }
//   done();
// });


// describe('basic socket.io example', () => {
//   test('should communicate', (done) => {
//     // once connected, emit Hello World
//     ioServer.emit('echo', 'Hello World');
//     socket.once('echo', (message) => {
//       // Check that the message matches
//       expect(message).toBe('Hello World');
//       done();
//     });
//     ioServer.on('connection', (mySocket) => {
//       expect(mySocket).toBeDefined();
//     });
//   });
//   test('should communicate with waiting for socket.io handshakes', (done) => {
//     // Emit sth from Client do Server
//     socket.emit('examlpe', 'some messages');
//     // Use timeout to wait for socket.io server handshakes
//     setTimeout(() => {
//       // Put your server side expect() here
//       done();
//     }, 50);
//   });
// });
//  */