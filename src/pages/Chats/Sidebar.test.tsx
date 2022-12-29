import { screen, fireEvent, waitFor, getByTestId } from '@testing-library/react';
import { renderWithProviders } from '../../helpers/testUtils';
import { IUser } from '../../types';
import Sidebar from './Sidebar';

const user: IUser = {
  _id: "63909605ff8e15df6eec4c82",
  name: "user1",
  email: "zerocool174@mail.ru",
  avatar: "img/no-avatar.jpg",
  roles: ["user"],
  isActivated: true,
  createdAt: "2022-12-07T13:32:53.483Z"
}

describe('Chats page sidebar', () => {
  beforeEach(() => {
    renderWithProviders(
      <Sidebar/>,
      { 
        preloadedState: {
          user: {user: user}
        }
      }
    )
  });

  test('Sidebar sould be rendered.', () => {
    const sidebar = screen.getByTestId('chats-sidebar');
    expect(sidebar).toBeInTheDocument();
  });

  test('One on one chats count should be 2', async () => {
    // ждём рендер чатов, т.к. http запрос асинхронный 
    // await waitFor(() => { 
    //   screen.getAllByTestId('user-chat');
    // });
    
    // ждём рендер чатов, т.к. http запрос асинхронный 
    // (ВНИМАНИЕ: использован метод find он асинхронный и В ЭТОМ ОТЛИЧИЕ от способа выше, где приходилось оборачивать в асинхронную функцию).
    const chats = await screen.findAllByTestId('user-chat');  

    expect(chats.length).toEqual(2);
    expect(screen.getByText('user2')).toBeInTheDocument();
    expect(screen.getByText('admin')).toBeInTheDocument();
  });

  test('One on one chats. The name of the current user should not be displayed in the chat list.', async () => {
    const chats = await screen.findAllByTestId('user-chat');
    expect(chats.length).toEqual(2);
    expect(screen.getByText('user2')).toBeInTheDocument();
    expect(screen.getByText('admin')).toBeInTheDocument();
    expect(screen.queryByText('user1')).not.toBeInTheDocument();
  });

  test('Chat should not have css class "active"', async () => {
    const chatBtn = await screen.findByText(/user2/i);
    expect(chatBtn).toBeInTheDocument();
    expect(chatBtn).not.toHaveClass('active');
  })

  test('Chat should have css class "active"', async () => {
    let chatBtn = await screen.findByText(/user2/i);
    fireEvent.click(chatBtn);
    chatBtn = await screen.findByText(/user2/i);
    expect(chatBtn).toHaveClass('active');
  })

  test('Displaying group chats', async () => {
    const radioGroupChats = screen.getByLabelText(/Group Chats/i);
    fireEvent.click(radioGroupChats, { target: { value: 'groups' } });

    await waitFor(() => { 
      expect(screen.getByText('First group chat')).toBeInTheDocument();
      expect(screen.getByText('Second group chat')).toBeInTheDocument();
      expect(screen.queryByText('user1')).not.toBeInTheDocument();
    })
  });

  test('Show create group chat modal', async () => {
    const radioGroupChats = screen.getByLabelText(/Group Chats/i);
    fireEvent.click(radioGroupChats, { target: { value: 'groups' } });
    
    const createGroupChatBtn = await screen.findByRole('button', { name: /Create Group/i });
    fireEvent.click(createGroupChatBtn);
    await screen.findByTestId('create-group-chat-modal');

    const modal = screen.getByTestId('create-group-chat-modal');
    expect(modal).toBeInTheDocument();
  });

  test('Create group chat', async () => {
    const radioGroupChats = screen.getByLabelText(/Group Chats/i);
    fireEvent.click(radioGroupChats, { target: { value: 'groups' } });
    
    const createGroupChatBtn = await screen.findByRole('button', { name: /Create Group/i });
    fireEvent.click(createGroupChatBtn);
    await screen.findByTestId('create-group-chat-modal');

    const form = screen.getByTestId('create-group-form');
    const input = screen.getByTestId('name-input');
    fireEvent.input(input, {target: {value: 'New group chat'}});
    fireEvent.submit(form);
    
    await waitFor(() => {
      const modal = screen.queryByTestId('create-group-chat-modal');
      expect(modal).not.toBeInTheDocument();
    });

    // const newGroupChat = await screen.findByText(/New group chat/i);
    // expect(newGroupChat).toBeInTheDocument(); 
    /**
     * После создания нового чата, делается запрос всех чатов пользователя (теги RTK Query), 
     * а там уже моковые данные того запроса, как замокать данные для этого случая 
     * (или не нужно т.к. тот запрос уже тестируется)?
     */
  });
});