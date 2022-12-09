import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from '../../helpers/testUtils';
import { RestoreForm } from './RestoreForm';

const mockRestore = jest.fn((email) => {});

describe('RestoreForm', () => {
  
  beforeEach(() => {
    renderWithProviders(
      <RestoreForm onSubmit={mockRestore} isLoading={false}/>
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

  test('Submit', async () => {
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
      expect(mockRestore).toHaveBeenCalledTimes(1)
      expect(mockRestore).toBeCalledWith(email);
    });
  });    
});