import { screen, fireEvent, waitFor, act, waitForElementToBeRemoved } from "@testing-library/react";
import { renderWithProviders } from '../../helpers/testUtils';
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import Home from '../../pages/Home/Home';

describe('ResetPasswordForm', () => {

  test('Submit button is disabled', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/resetPassword/123']}>
        <Routes>
          <Route path='/resetPassword/:link' element={<ResetPassword/>}></Route>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </MemoryRouter>
    )
    const submitBtn = screen.getByTestId('submit-btn');
    expect(submitBtn).toBeDisabled();
  });

  test('Invalid password', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/resetPassword/123']}>
        <Routes>
          <Route path='/resetPassword/:link' element={<ResetPassword/>}></Route>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </MemoryRouter>
    )
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
    renderWithProviders(
      <MemoryRouter initialEntries={['/resetPassword/123']}>
        <Routes>
          <Route path='/resetPassword/:link' element={<ResetPassword/>}></Route>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </MemoryRouter>
    )
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

  test('Fail submit (Invalid or expiration link!)', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/resetPassword/456']}>
        <Routes>
          <Route path='/resetPassword/:link' element={<ResetPassword/>}></Route>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </MemoryRouter>
    )

    const submitBtn = screen.getByTestId('submit-btn');
    
    const passwordInput = screen.getByTestId('password-input') as HTMLInputElement;
    const password = '12345';
    fireEvent.input(passwordInput, {target: {value: password}});
    fireEvent.blur(passwordInput);
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

    await waitFor(() => {
      expect(screen.queryByTestId('spiner')).not.toBeInTheDocument();
      expect(screen.getByText('Invalid or expiration link!')).toBeInTheDocument();
      expect(screen.queryByText('Check your email!')).not.toBeInTheDocument();
    });
  });    


  test('Success submit', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/resetPassword/123']}>
        <Routes>
          <Route path='/resetPassword/:link' element={<ResetPassword/>}></Route>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </MemoryRouter>
    )

    const submitBtn = screen.getByTestId('submit-btn');
    
    const passwordInput = screen.getByTestId('password-input') as HTMLInputElement;
    const password = '12345';
    fireEvent.input(passwordInput, {target: {value: password}});
    fireEvent.blur(passwordInput);
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
    
    await waitFor(() => { // Учитывать нужно все ререндеры (изменения стейта) иначе будет warning о том что нужно обернуть в act()
      expect(passwordInput.value).toBe('');
      expect(confirmPasswordInput.value).toBe('');
      expect(screen.getByTestId('submit-btn')).toBeDisabled();
      expect(screen.getByTestId('home_page')).toBeInTheDocument();
      expect(screen.getByText('You have successfully changed your password.')).toBeInTheDocument();
      expect(screen.queryByText('Invalid or expiration link!')).not.toBeInTheDocument();
    });
  });    

});