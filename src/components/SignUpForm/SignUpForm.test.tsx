import { screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { renderWithProviders } from '../../helpers/testUtils';
import Home from '../../pages/Home/Home';

describe('SignUpForm', () => {
  beforeEach(() => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </MemoryRouter>
    )
  });

  test('Submit button is disabled', async () => {
    const tabBtn2 = screen.getByTestId('tab_btn-2');
    fireEvent.click(tabBtn2, {target: {value: '2'}});
    const signUpForm = screen.getByTestId('sign-up-form');
    expect(signUpForm).toBeInTheDocument();
    
    const submitBtn = screen.getByTestId('submit-btn');
    expect(submitBtn).toBeDisabled();
  });

  test('Invalid name', async () => {
    const tabBtn2 = screen.getByTestId('tab_btn-2');
    fireEvent.click(tabBtn2, {target: {value: '2'}});
    const signUpForm = screen.getByTestId('sign-up-form');
    expect(signUpForm).toBeInTheDocument();

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
    const tabBtn2 = screen.getByTestId('tab_btn-2');
    fireEvent.click(tabBtn2, {target: {value: '2'}});
    const signUpForm = screen.getByTestId('sign-up-form');
    expect(signUpForm).toBeInTheDocument();

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
    const tabBtn2 = screen.getByTestId('tab_btn-2');
    fireEvent.click(tabBtn2, {target: {value: '2'}});
    const signUpForm = screen.getByTestId('sign-up-form');
    expect(signUpForm).toBeInTheDocument();

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
    const tabBtn2 = screen.getByTestId('tab_btn-2');
    fireEvent.click(tabBtn2, {target: {value: '2'}});
    const signUpForm = screen.getByTestId('sign-up-form');
    expect(signUpForm).toBeInTheDocument();

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

  // test('Submit', async () => {
  //   const submitBtn = screen.getByTestId('submit-btn');

  //   const nameInput = screen.getByTestId('name-input') as HTMLInputElement;
  //   const name = 'test';
  //   fireEvent.input(nameInput, {target: {value: name}});
  //   fireEvent.blur(nameInput);
  //   expect(screen.getByDisplayValue(name)).toBeInTheDocument();

  //   const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
  //   const email = 'test@mail.ru';
  //   fireEvent.input(emailInput, {target: {value: email}});
  //   expect(screen.getByDisplayValue(email)).toBeInTheDocument();

  //   const passwordInput = screen.getByTestId('password-input') as HTMLInputElement;
  //   const password = '12345';
  //   fireEvent.input(passwordInput, {target: {value: password}});
  //   expect(screen.getByDisplayValue(password)).toBeInTheDocument();

  //   const confirmPasswordInput = screen.getByTestId('confirm-password-input') as HTMLInputElement;
  //   const confirmPassword = password;
  //   fireEvent.input(confirmPasswordInput, {target: {value: confirmPassword}});
  //   fireEvent.blur(confirmPasswordInput);
  //   expect(confirmPasswordInput.value).toBe(confirmPassword);

  //   await waitFor(() => {
  //     expect(submitBtn).toBeEnabled();
  //   });
    
  //   fireEvent.submit(submitBtn);  

  //   await waitFor(() => {
  //     expect(mockSignUp).toHaveBeenCalledTimes(1)
  //     expect(mockSignUp).toBeCalledWith(name, email, password);
  //   });
  // });    


  test('Success sign up', async () => {
    const tabBtn2 = screen.getByTestId('tab_btn-2');
    fireEvent.click(tabBtn2, {target: {value: '2'}});
    const signUpForm = screen.getByTestId('sign-up-form');
    expect(signUpForm).toBeInTheDocument();

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
      expect(screen.getByTestId('spiner')).toBeInTheDocument();
    });

    await waitFor(async () => { 
      expect(screen.queryByTestId('spiner')).not.toBeInTheDocument();
      expect(screen.getByText('You have successfully registered!')).toBeInTheDocument();
    });
  });

  test('Fail sign up (existing email)', async () => {
    const tabBtn2 = screen.getByTestId('tab_btn-2');
    fireEvent.click(tabBtn2, {target: {value: '2'}});
    const signUpForm = screen.getByTestId('sign-up-form');
    expect(signUpForm).toBeInTheDocument();

    const submitBtn = screen.getByTestId('submit-btn');

    const nameInput = screen.getByTestId('name-input') as HTMLInputElement;
    const name = 'test';
    fireEvent.input(nameInput, {target: {value: name}});
    fireEvent.blur(nameInput);
    expect(screen.getByDisplayValue(name)).toBeInTheDocument();

    const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
    const email = 'existing@mail.ru';
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
      expect(screen.getByTestId('spiner')).toBeInTheDocument();
    });

    await waitFor(async () => { 
      expect(screen.queryByTestId('spiner')).not.toBeInTheDocument();
      expect(screen.getByText('User with this email already exist')).toBeInTheDocument();
    });
  });
});