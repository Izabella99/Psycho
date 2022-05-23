import React, { Component, useRef } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from 'axios';

const EditProfileTeacher = (teacher) => {
    const nameRef = useRef(teacher.name);
    const emailRef = useRef(teacher.email);
    const fieldRef = useRef(teacher.field);
    const noOfPlacesRef = useRef(teacher.nr_places);
    const noOfAvailablePlacesRef = useRef(teacher.nr_places_available);

const updateTeacher = (newTeacher) => {
    nameRef.current.value = newTeacher.name;
    emailRef.current.value = newTeacher.email;
    fieldRef.current.value = newTeacher.nr_matricol;
    noOfPlacesRef.current.value = newTeacher.forma_de_invatamant;
    noOfAvailablePlacesRef.current.value = newTeacher.specializare;
    }

const handleEdit = () => {
    const teacher = {email : emailRef.current.value, name : nameRef.current.value, field : fieldRef.current.value, nr_places : noOfPlacesRef.current.value, nr_places_available : noOfAvailablePlacesRef.current.value};
    axios.post('http://localhost:3001/api/professors/', teacher)
    .then(response => updateTeacher(response.data));
    };

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
                <TextField
                margin="normal"
                required
                fullWidth
                name="number_of_avaib_places"
                label="Number of available places"
                id="number_of_avaib_places"
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleEdit}
                >
                Edit
                </Button>
            </Box>
            </Box>
        </Container> 
    )
};

export default EditProfileTeacher;
