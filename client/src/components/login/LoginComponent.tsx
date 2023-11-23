import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  TextField,
} from '@mui/material';

function LoginComponent() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 12,
        }}
      >
        <Card>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="email"
            ></TextField>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
            ></TextField>
            <CardActions
              sx={{
                justifyContent: 'flex-end',
              }}
            >
              <Button variant="outlined" color="primary">
                Login
              </Button>
              <Button variant="outlined" color="secondary">
                Create user
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default LoginComponent;
