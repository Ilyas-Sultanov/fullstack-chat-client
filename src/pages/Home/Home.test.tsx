import {  screen, fireEvent, waitFor, act } from "@testing-library/react";
import { renderWithProviders } from '../../helpers/testUtils';
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Chats from '../Chats/Chats';

import { setupStore } from '../../store';
const store = setupStore({});

describe('Home page', () => {
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
  
  test('Check render', () => {
    const homePage = screen.getByTestId('home_page');
    const tabBtn1 = screen.getByTestId('tab_btn-1');
    const tabBtn2 = screen.getByTestId('tab_btn-2');
    const tabBtn3 = screen.getByTestId('tab_btn-3');

    expect(homePage).toBeInTheDocument();
    
    fireEvent.click(tabBtn2, {target: {value: '2'}});
    const signUpForm = screen.getByTestId('sign-up-form');
    expect(signUpForm).toBeInTheDocument();
    
    fireEvent.click(tabBtn3, {target: {value: '3'}});
    const restoreForm = screen.getByTestId('restore-form');
    expect(restoreForm).toBeInTheDocument();

    fireEvent.click(tabBtn1, {target: {value: '1'}});
    const signInForm = screen.getByTestId('sign-in-form');
    expect(signInForm).toBeInTheDocument();
  })

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

  test('Success restore', async () => {
    const tabBtn3 = screen.getByTestId('tab_btn-3');
    fireEvent.click(tabBtn3, {target: {value: '3'}});
    const restoreForm = screen.getByTestId('restore-form');
    expect(restoreForm).toBeInTheDocument();

    const submitBtn = screen.getByTestId('submit-btn');
    
    const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
    const email = 'test@mail.ru';
    fireEvent.input(emailInput, {target: {value: email}});
    expect(screen.getByDisplayValue(email)).toBeInTheDocument();

    await waitFor(() => {
      expect(submitBtn).toBeEnabled();
    });
    
    fireEvent.submit(submitBtn);  

    await waitFor(() => { 
      expect(screen.getByTestId('spiner')).toBeInTheDocument();
    });

    await waitFor(async () => { 
      expect(screen.queryByTestId('spiner')).not.toBeInTheDocument();
      expect(screen.getByText('Check your email!')).toBeInTheDocument();
    });
  });    

  test('Fail restore (email not found)', async () => {
    const tabBtn3 = screen.getByTestId('tab_btn-3');
    fireEvent.click(tabBtn3, {target: {value: '3'}});
    const restoreForm = screen.getByTestId('restore-form');
    expect(restoreForm).toBeInTheDocument();
    
    const submitBtn = screen.getByTestId('submit-btn');

    const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
    const email = 'notRegistred@mail.ru';
    fireEvent.input(emailInput, {target: {value: email}});
    expect(screen.getByDisplayValue(email)).toBeInTheDocument();

    await waitFor(() => {
      expect(submitBtn).toBeEnabled();
    });
    
    fireEvent.submit(submitBtn);  

    await waitFor(() => { 
      expect(screen.getByTestId('spiner')).toBeInTheDocument();
    });

    await waitFor(async () => { 
      expect(screen.queryByTestId('spiner')).not.toBeInTheDocument();
      expect(screen.getByText('Email not found!')).toBeInTheDocument();
    });
  });    
})