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
    expect(homePage).toBeInTheDocument();
  })
})