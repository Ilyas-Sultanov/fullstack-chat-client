import { screen } from "@testing-library/react";
import { renderWithProviders } from '../../helpers/testUtils';
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ResetPassword from '../../pages/ResetPassword/ResetPassword';

describe('Reset Password Page', () => {
  test('Check render', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/resetPassword/123']}>
        <Routes>
          <Route path='/resetPassword/:link' element={<ResetPassword/>}></Route>
        </Routes>
      </MemoryRouter>
    )
    const resetPassworPage = screen.getByTestId('reset-password-page');
    expect(resetPassworPage).toBeInTheDocument();
  });
});