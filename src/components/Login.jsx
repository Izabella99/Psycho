import * as React from 'react';
import "../assets/css/Login.css";
import '@fontsource/roboto/300.css';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Header from './Header';


const Login = () => {
  window.scrollTo(0, 0);

    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });
    };

  return (
    <div className="login-page">
            <Container 
            component="main" 
            maxWidth="xs" 
            sx={{
                borderRadius: '10px',
                backgroundColor: 'rgba(229, 229, 229, 100)' ,
                border:' 1px solid rgba(187, 187, 187, 100)',
                marginTop: '100px',
                }}
            >
                <CssBaseline />
                <Box className="login-box">
                <Avatar></Avatar>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    />
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    />
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Sign In
                    </Button>
                    <Link href="#" variant="body2">
                        Forgot password?
                    </Link>  
                </Box>
                </Box>
            </Container> 
      </div>
  );
};
export default Login;
