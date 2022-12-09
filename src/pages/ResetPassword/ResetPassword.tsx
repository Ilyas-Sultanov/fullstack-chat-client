import './ResetPassword.styles.scss';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import { ResetPasswordForm } from '../../components/ResetPasswordForm/ResetPasswordForm';
import { useResetPasswordMutation } from '../../services/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { Snackbar } from '../../components';
import { useSnackbar } from '../../hooks';
import { isErrorWithMessage, isFetchBaseQueryError } from '../../helpers';

function ResetPassword() {
  const { msg, setMessage, removeMessage } = useSnackbar();
  const navigate = useNavigate();
  const { link } = useParams();
  const [resetPassword, {isLoading}] = useResetPasswordMutation();

  async function reset(password: string) {
    try {
      if (link) {
        await resetPassword({
          resetLink: link,
          newPassword: password,
        }).unwrap();
        navigate('/', {replace: true, state: {type: 'success', text: 'You have successfully changed your password.'}})
      }
      else {
        throw new Error('Link is required');
      }
    }
    catch (err) {
      if (isFetchBaseQueryError(err)) {
        const errMsg = 'error' in err ? err.error : (err.data as {message: string}).message;
        setMessage({type: 'error', text: errMsg, duration: 6000});
      } 
      else if (isErrorWithMessage(err)) {
        setMessage({type: 'error', text: err.message, duration: 6000});
      }
    }
  };

  function closeHandler() {
    removeMessage();
  }

  return (
     <Container maxWidth="xl" className='reset-password' data-testid='reset-password-page'>

      <Grid container display='flex' flexDirection='column' rowGap={2}>

        <Grid container justifyContent='center'>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography textAlign='center'>My Chat</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container justifyContent='center'>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <ResetPasswordForm onSubmit={reset} isLoading={isLoading}/>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

      </Grid>

      <Snackbar
        open={!!msg.text}
        autoHideDuration={null} 
        onClose={closeHandler}
        message={msg.text}
        severity={msg.type}
      />

    </Container>
  )
}

export default ResetPassword;