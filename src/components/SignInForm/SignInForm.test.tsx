import { screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { renderWithProviders } from '../../helpers/testUtils';
import Home from '../../pages/Home/Home';
import Chats from '../../pages/Chats/Chats';

describe('SignInForm', () => {
  
  beforeEach(() => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/chats' element={<Chats/>}/>
        </Routes>
      </MemoryRouter>
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

  test('Success sign in', async () => {
    const homePage = screen.getByTestId('home_page');
    const submitBtn = screen.getByTestId('submit-btn');

    const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
    fireEvent.input(emailInput, {target: {value: 'test@mail.ru'}});
    expect(screen.getByDisplayValue('test@mail.ru')).toBeInTheDocument();

    const passwordInput = screen.getByTestId('password-input') as HTMLInputElement;
    fireEvent.input(passwordInput, {target: {value: '12345'}});
    expect(screen.getByDisplayValue('12345')).toBeInTheDocument();

    await waitFor(() => {
      expect(submitBtn).toBeEnabled();
    });
    
    fireEvent.submit(submitBtn);  
    
    await waitFor(() => {
      expect(homePage).not.toBeInTheDocument();
      expect(screen.getByTestId('chats-page')).toBeInTheDocument();
    });
  });

  test('Fail sign in (invalid email)', async () => {
    const homePage = screen.getByTestId('home_page');
    const submitBtn = screen.getByTestId('submit-btn');

    const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
    const email = 'notRegistred@mail.ru';
    fireEvent.input(emailInput, {target: {value: email}});
    expect(screen.getByDisplayValue(email)).toBeInTheDocument();

    const passwordInput = screen.getByTestId('password-input') as HTMLInputElement;
    const password = '12345';
    fireEvent.input(passwordInput, {target: {value: password}});
    expect(screen.getByDisplayValue(password)).toBeInTheDocument();

    await waitFor(() => { // Кнопка становится активное после ререндера, а значит сдесь await waitFor() обязательно, иначе возникает ворнинг о том что компонента перерендерилась а мы это не учли.
      expect(submitBtn).toBeEnabled();
    });

    // waitFor дожидается того что мы ожидаем в expect и возвращает промис, поэтому await

    fireEvent.submit(submitBtn); 

    await waitFor(() => { // спинер появляется сразу
      expect(screen.getByTestId('spiner')).toBeInTheDocument();
    });

    await waitFor(async () => { // спинер исчезает асинхронно
      expect(homePage).toBeInTheDocument();
      expect(screen.queryByTestId('spiner')).not.toBeInTheDocument();
      expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
      expect(screen.queryByTestId('chats-page')).not.toBeInTheDocument();
    });
  });


  test('Fail sign in (invalid password)', async () => {
    const homePage = screen.getByTestId('home_page');
    const submitBtn = screen.getByTestId('submit-btn');

    const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
    const email = 'test@mail.ru';
    fireEvent.input(emailInput, {target: {value: email}});
    expect(screen.getByDisplayValue(email)).toBeInTheDocument();

    const passwordInput = screen.getByTestId('password-input') as HTMLInputElement;
    const password = 'invalidPassword';
    fireEvent.input(passwordInput, {target: {value: password}});
    expect(screen.getByDisplayValue(password)).toBeInTheDocument();

    await waitFor(() => { 
      expect(submitBtn).toBeEnabled();
    });

    fireEvent.submit(submitBtn); 

    await waitFor(() => {
      expect(screen.getByTestId('spiner')).toBeInTheDocument();
    });

    await waitFor(async () => { 
      expect(homePage).toBeInTheDocument();
      expect(screen.queryByTestId('spiner')).not.toBeInTheDocument();
      expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
      expect(screen.queryByTestId('chats-page')).not.toBeInTheDocument();
    });
  });
});