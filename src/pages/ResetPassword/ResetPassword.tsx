import './ResetPassword.styles.scss';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import { ResetPasswordForm } from '../../components/ResetPasswordForm/ResetPasswordForm';
import { useRedirectIfNotAuthorized } from '../../hooks';

function ResetPassword() {
  useRedirectIfNotAuthorized('/chats');

  return (
     <Container maxWidth="xl" className='reset-password'>

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
                <ResetPasswordForm/>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

      </Grid>

    </Container>
  )
}

export default ResetPassword;