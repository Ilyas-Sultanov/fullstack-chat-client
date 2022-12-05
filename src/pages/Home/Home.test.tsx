import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { setupStore } from '../../store';
import Home from "./Home";

const store = setupStore({});

describe('Home page', () => {
  test('Check render', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home/>
        </MemoryRouter>
      </Provider>
    );
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

})