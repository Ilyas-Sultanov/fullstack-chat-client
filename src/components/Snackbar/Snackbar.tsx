import { forwardRef } from 'react';
import {Snackbar as MUISnackbar, SnackbarProps, Alert as MuiAlert, AlertColor, AlertProps} from '@mui/material';

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  }
);

interface ISnackbarProps extends SnackbarProps {
  severity: AlertColor
}

export function Snackbar(props: ISnackbarProps) {
  return (
    <MUISnackbar
      {...props} 
      data-testid='snackbar'
    >
      <Alert 
        onClose={(e) => props.onClose && props.onClose(e, 'escapeKeyDown')} 
        severity={props.severity} 
        sx={{ width: '100%' }}
      >
        {props.message}
      </Alert>
    </MUISnackbar>
  );
}