import { renderHook } from '@testing-library/react';
import { useSnackbar } from './useSnackbar';

describe('useSnackbar', () => {
  test('Should work without initial message', () => {
    const { result }  = renderHook(useSnackbar);
    expect(result.current.msg).toEqual({type: 'success', text: ''})
  });

  test('Show message', () => {
    const { result }  = renderHook(useSnackbar, {
      initialProps: {
        type: 'success',
        text: 'test msg',
        duration: undefined
      }
    });
    expect(result.current.msg).toEqual({type: 'success', text: 'test msg'})
  });
});