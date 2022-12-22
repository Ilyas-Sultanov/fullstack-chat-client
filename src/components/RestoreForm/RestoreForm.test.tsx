import { screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { renderWithProviders } from '../../helpers/testUtils';
import Home from '../../pages/Home/Home';

describe('RestoreForm', () => {
  
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
    const tabBtn3 = screen.getByTestId('tab_btn-3');
    fireEvent.click(tabBtn3, {target: {value: '3'}});
    const restoreForm = screen.getByTestId('restore-form');
    expect(restoreForm).toBeInTheDocument();

    const submitBtn = screen.getByTestId('submit-btn');
    expect(submitBtn).toBeDisabled();
  });

  test('Invalid email', async () => {
    const tabBtn3 = screen.getByTestId('tab_btn-3');
    fireEvent.click(tabBtn3, {target: {value: '3'}});
    const restoreForm = screen.getByTestId('restore-form');
    expect(restoreForm).toBeInTheDocument();

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
});