import React, { Component } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default class EditProfileC extends Component {
  render() {
    return (
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
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="Nume"
                autoFocus
                />
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
                name="field"
                label="Field"
                id="field"
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="number_of_places"
                label="Number of places"
                id="number_of_places"
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Edit
                </Button>
            </Box>
            </Box>
        </Container> 
    )
  }
}
