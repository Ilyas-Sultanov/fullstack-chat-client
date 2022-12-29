import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../helpers/testUtils';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { IUser } from '../../types';

const user: IUser = {
  _id: '1',
  name: 'test user',
  email: 'test email',
  avatar: '',
  roles: ['user'],
  isActivated: true,
  createdAt: '',
}

describe('Search contacts', () => {
  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;

    renderWithProviders(
      <MemoryRouter><Header/></MemoryRouter>,
      {
        preloadedState: { user: { user: user } },
        // смотри файл testUtils.tsx
      }
    )
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Search group chat', () => {
    test('Fetch and find', async () => {
      const searchBtn = screen.getByRole('button', { name: /Search Contacts/i });
      fireEvent.click(searchBtn);
      const groupsTabBtn = screen.getByTestId('tab_btn-chats');
      fireEvent.click(groupsTabBtn);
      const searchGroupForm = screen.getByTestId('search-group-form');
      const nameInput = screen.getByTestId('name-input');
      fireEvent.input(nameInput, {target: {value: 'test group chat'}});
      fireEvent.submit(searchGroupForm);
      await waitFor(() => {
        const chats = screen.getAllByTestId('chat');
        expect(chats.length).toEqual(25);
      });
      // Как протестировать infinite scroll !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // const resultBox = screen.getByTestId('search-results');
      // fireEvent.scroll(resultBox, { target: { scrollY: resultBox.offsetHeight } });
      // await waitFor(() => {
      //   const chats = screen.getAllByTestId('chat');
      //   expect(chats.length).toEqual(27);
      // });
    });

    test('Fetch and not find', async () => {
      const searchBtn = screen.getByRole('button', { name: /Search Contacts/i });
      fireEvent.click(searchBtn);
      const groupsTabBtn = screen.getByTestId('tab_btn-chats');
      fireEvent.click(groupsTabBtn);
      const searchGroupForm = screen.getByTestId('search-group-form');
      const nameInput = screen.getByTestId('name-input');
      fireEvent.input(nameInput, {target: {value: 'not existing group chat'}});
      fireEvent.submit(searchGroupForm);
      await waitFor(() => {
        expect(screen.getByText(/Not found/i)).toBeInTheDocument();
      });
    });
  })

  describe('Search User contact', () => {
    test('Fetch and find', async () => {
      const searchBtn = screen.getByRole('button', { name: /Search Contacts/i });
      fireEvent.click(searchBtn);
      const searchUserContactsForm = screen.getByTestId('search-user__form');
      const nameInput = screen.getByTestId('name-input');
      fireEvent.input(nameInput, {target: {value: 'user'}});
      fireEvent.submit(searchUserContactsForm);
      await waitFor(() => {
        const chats = screen.getAllByTestId('user');
        expect(chats.length).toEqual(25);
      });
    });

    test('Fetch and not find', async () => {
      const searchBtn = screen.getByRole('button', { name: /Search Contacts/i });
      fireEvent.click(searchBtn);
      const searchUserContactsForm = screen.getByTestId('search-user__form');
      const nameInput = screen.getByTestId('name-input');
      fireEvent.input(nameInput, {target: {value: 'not existing user'}});
      fireEvent.submit(searchUserContactsForm);
      await waitFor(() => {
        expect(screen.getByText(/Not found/i)).toBeInTheDocument();
      });
    });
  });

  describe('Auth menu', () => {
    test('Sign out', async () => {
      const authBtn = screen.getByTestId('auth-btn');
      fireEvent.click(authBtn);
      const signOutBtn = screen.getByText(/Sign out/i, { selector: 'li' });
      fireEvent.click(signOutBtn);
      await waitFor(() => {
        expect(screen.queryByTestId('auth-btn')).not.toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /Search Contacts/i })).not.toBeInTheDocument();
      })
    });
  });

});