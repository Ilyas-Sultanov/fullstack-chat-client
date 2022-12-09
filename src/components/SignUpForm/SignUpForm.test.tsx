import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from '../../helpers/testUtils';
import { SignUpForm } from "./SignUpForm";

const mockSignUp = jest.fn((name, email, password) => {});

describe('SignUpForm', () => {
  
  beforeEach(() => {
    renderWithProviders(
      <SignUpForm onSubmit={mockSignUp} isLoading={false}/>
    )
  });

  test('Submit button is disabled', async () => {
    const submitBtn = screen.getByTestId('submit-btn');
    expect(submitBtn).toBeDisabled();
  });

  test('Invalid name', async () => {
    const submitBtn = screen.getByTestId('submit-btn');
    const nameInput = screen.getByTestId('name-input') as HTMLInputElement;
    const name = 'a';
    fireEvent.input(nameInput, {target: {value: name}});
    fireEvent.blur(nameInput);
    expect(screen.getByDisplayValue(name)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('name-validation-message')).toBeInTheDocument();
      expect(submitBtn).toBeDisabled();
    });
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

  test('Invalid confirm password', async () => {
    const submitBtn = screen.getByTestId('submit-btn');

    const passwordInput = screen.getByTestId('password-input') as HTMLInputElement;
    const password = 'test1';
    fireEvent.input(passwordInput, {target: {value: password}});
    fireEvent.blur(passwordInput);
    expect(screen.getByDisplayValue(password)).toBeInTheDocument();

    const confirmPasswordInput = screen.getByTestId('confirm-password-input') as HTMLInputElement;
    const confirmPassword = 'test2';
    fireEvent.input(confirmPasswordInput, {target: {value: confirmPassword}});
    fireEvent.blur(confirmPasswordInput);
    expect(screen.getByDisplayValue(confirmPassword)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('confirm-password-validation-message')).toBeInTheDocument();
      expect(submitBtn).toBeDisabled();
    });
  });

  test('Submit', async () => {
    const submitBtn = screen.getByTestId('submit-btn');

    const nameInput = screen.getByTestId('name-input') as HTMLInputElement;
    const name = 'test';
    fireEvent.input(nameInput, {target: {value: name}});
    fireEvent.blur(nameInput);
    expect(screen.getByDisplayValue(name)).toBeInTheDocument();

    const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
    const email = 'test@mail.ru';
    fireEvent.input(emailInput, {target: {value: email}});
    expect(screen.getByDisplayValue(email)).toBeInTheDocument();

    const passwordInput = screen.getByTestId('password-input') as HTMLInputElement;
    const password = '12345';
    fireEvent.input(passwordInput, {target: {value: password}});
    expect(screen.getByDisplayValue(password)).toBeInTheDocument();

    const confirmPasswordInput = screen.getByTestId('confirm-password-input') as HTMLInputElement;
    const confirmPassword = password;
    fireEvent.input(confirmPasswordInput, {target: {value: confirmPassword}});
    fireEvent.blur(confirmPasswordInput);
    expect(confirmPasswordInput.value).toBe(confirmPassword);

    await waitFor(() => {
      expect(submitBtn).toBeEnabled();
    });
    
    fireEvent.submit(submitBtn);  

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledTimes(1)
      expect(mockSignUp).toBeCalledWith(name, email, password);
    });
  });    
});