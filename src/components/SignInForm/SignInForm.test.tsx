import { screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { renderWithProviders } from '../../helpers/testUtils';
import { rest } from 'msw';
import { SignInForm } from "./SignInForm";
import Chats from '../../pages/Chats/Chats';
import { act } from "react-dom/test-utils";

const mockLogin = jest.fn((email, password) => {
  return Promise.resolve({ email, password });
});

describe('SignInForm', () => {
  
  beforeEach(() => {
    renderWithProviders(
      <SignInForm onSubmit={mockLogin} isLoading={false}/>
    )
  });

  test('Submit button is disabled', async () => {
    const submitBtn = screen.getByTestId('submit-btn');
    expect(submitBtn).toBeDisabled();
  });

  test('Invalid email', async () => {
    const submitBtn = screen.getByTestId('submit-btn');
    const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
    const email = 'test';
    fireEvent.input(emailInput, {target: {value: email}});
    fireEvent.blur(emailInput);
    expect(screen.getByDisplayValue(email)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('email-validation-message')).toBeInTheDocument();
      expect(submitBtn).toBeDisabled();
    });
  });

  test('Invalid password', async () => {
    const submitBtn = screen.getByTestId('submit-btn');
    const passwordInput = screen.getByTestId('password-input') as HTMLInputElement;
    const password = 'test';
    fireEvent.input(passwordInput, {target: {value: password}});
    fireEvent.blur(passwordInput);
    expect(screen.getByDisplayValue(password)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('password-validation-message')).toBeInTheDocument();
      expect(submitBtn).toBeDisabled();
    });
  });

  test('Submit', async () => {
    const submitBtn = screen.getByTestId('submit-btn');

    const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
    const email = 'test@mail.ru';
    fireEvent.input(emailInput, {target: {value: email}});
    expect(screen.getByDisplayValue(email)).toBeInTheDocument();

    const passwordInput = screen.getByTestId('password-input') as HTMLInputElement;
    const password = '12345';
    fireEvent.input(passwordInput, {target: {value: password}});
    expect(screen.getByDisplayValue(password)).toBeInTheDocument();

    await waitFor(() => {
      expect(submitBtn).toBeEnabled();
    });
    
    fireEvent.submit(submitBtn);  

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledTimes(1)
      expect(mockLogin).toBeCalledWith(email, password);
    });
  });    
});