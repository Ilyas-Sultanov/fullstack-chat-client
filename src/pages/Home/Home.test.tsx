import {  screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from '../../helpers/testUtils';
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";

describe('Home page', () => {
  beforeEach(() => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </MemoryRouter>
    )
  });

  test('Check home page', () => {
    const homePage = screen.getByTestId('home_page');
    expect(homePage).toBeInTheDocument();
  })
  
  test('Check tab 2', () => {
    const homePage = screen.getByTestId('home_page');
    expect(homePage).toBeInTheDocument();
    const tabBtn2 = screen.getByTestId('tab_btn-2');    
    fireEvent.click(tabBtn2, {target: {value: '2'}});
    const signUpForm = screen.getByTestId('sign-up-form');
    expect(signUpForm).toBeInTheDocument();

    const signInForm = screen.queryByTestId('sign-in-form');
    expect(signInForm).not.toBeInTheDocument();
    const restoreForm = screen.queryByTestId('restore-form');
    expect(restoreForm).not.toBeInTheDocument();
  })

  test('Check tab 3', () => {
    const homePage = screen.getByTestId('home_page');
    expect(homePage).toBeInTheDocument();
    const tabBtn3 = screen.getByTestId('tab_btn-3');   
    fireEvent.click(tabBtn3, {target: {value: '3'}});
    const restoreForm = screen.getByTestId('restore-form');
    expect(restoreForm).toBeInTheDocument();

    const signInForm = screen.queryByTestId('sign-in-form');
    expect(signInForm).not.toBeInTheDocument();
    const signUpForm = screen.queryByTestId('sign-up-form');
    expect(signUpForm).not.toBeInTheDocument();
  })

  test('Check tab 1', () => {
    const homePage = screen.getByTestId('home_page');
    expect(homePage).toBeInTheDocument();
    const tabBtn1 = screen.getByTestId('tab_btn-1');
    fireEvent.click(tabBtn1, {target: {value: '1'}});
    const signInForm = screen.getByTestId('sign-in-form');
    expect(signInForm).toBeInTheDocument();

    const signUpForm = screen.queryByTestId('sign-up-form');
    expect(signUpForm).not.toBeInTheDocument();
    const restoreForm = screen.queryByTestId('restore-form');
    expect(restoreForm).not.toBeInTheDocument();
  })
})