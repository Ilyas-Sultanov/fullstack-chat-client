import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../helpers/testUtils';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
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

const admin: IUser = {
  _id: '1',
  name: 'test user',
  email: 'test email',
  avatar: '',
  roles: ['user', 'admin'],
  isActivated: true,
  createdAt: '',
}

describe('Header tests', () => {

  test('Render Header', () => {
    renderWithProviders(<MemoryRouter><Header/></MemoryRouter>)
    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });

  describe('Not authenticated', () => {
    beforeEach(() => { // После каждого теста, автоматически зачищается все что отрендерилось, поэтомы используем beforeEach.
      renderWithProviders(<MemoryRouter><Header/></MemoryRouter>)
    })

    test('Search contacts button should not be rendered', () => {
      const searchBtn = screen.queryByRole('button', { name: `/Search Contacts/i` })
      expect(searchBtn).not.toBeInTheDocument();
    });
  
    test('Auth button should not be rendered', () => {
      const authBtn = screen.queryByTestId('auth-btn');
      expect(authBtn).not.toBeInTheDocument();
    });
  });

  describe('Authenticated user', () => {
    beforeEach(() => { 
      renderWithProviders(
        <MemoryRouter><Header/></MemoryRouter>,
        {
          preloadedState: { user: { user: user } },
          // смотри файл testUtils.tsx
        }
      )
    });

    test('Search contacts button should be rendered', () => {
      const searchBtn = screen.getByRole('button', { name: /Search Contacts/i });
      expect(searchBtn).toBeInTheDocument();
    });

    test('Auth button should be rendered', () => {
      const authBtn = screen.getByTestId('auth-btn');
      expect(authBtn).toBeInTheDocument();
    }); 

    test('Search contacts drawer should be rendered', () => {
      const searchBtn = screen.getByRole('button', { name: /Search Contacts/i });
      fireEvent.click(searchBtn);
      const drawer = screen.getByTestId('search-contacts');
      expect(drawer).toBeInTheDocument();
    });

    test('Admin button should not be rendered', () => {
      const authBtn = screen.getByTestId('auth-btn');
      fireEvent.click(authBtn);
      const adminBtn = screen.queryByText(/Admin panel/i, { selector: 'li' });
      expect(adminBtn).not.toBeInTheDocument();
    });

    test('Profile button should be rendered', () => {
      const authBtn = screen.getByTestId('auth-btn');
      fireEvent.click(authBtn);
      const profileBtn = screen.getByText(/Profile/i, { selector: 'li' });
      expect(profileBtn).toBeInTheDocument();
    });

    test('Sign Out button should be rendered', () => {
      const authBtn = screen.getByTestId('auth-btn');
      fireEvent.click(authBtn);
      const signOutBtn = screen.getByText(/Sign out/i, { selector: 'li' });
      expect(signOutBtn).toBeInTheDocument();
    });
  });


  describe('Authenticated admin', () => {
    beforeEach(() => { 
      renderWithProviders(
        <MemoryRouter><Header/></MemoryRouter>,
        {
          preloadedState: { user: { user: admin } },
          // смотри файл testUtils.tsx
        }
      )
    });

    test('Admin button should be rendered', () => {
      const authBtn = screen.getByTestId('auth-btn');
      fireEvent.click(authBtn);
      const adminBtn = screen.getByText(/Admin panel/i, { selector: 'li' });
      expect(adminBtn).toBeInTheDocument();
    });
  })

});