import React, { Component, useRef, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const EditProfileStudent = (student) => {
    const nameRef = useRef(student.nume);
    const emailRef = useRef(student.email);
    const regNumberRef = useRef(student.nr_matricol);
    const edFormRef = useRef(student.forma_de_invatamant);
    const specializationRef = useRef(student.specializare);
    const topicRef = useRef(student.topic);
    const coordinatorRef = useRef(student.coordinator);

const updateStudent = (newStudent) => {
    nameRef.current.value = newStudent.nume;
    emailRef.current.value = newStudent.email;
    regNumberRef.current.value = newStudent.nr_matricol;
    edFormRef.current.value = newStudent.forma_de_invatamant;
    specializationRef.current.value = newStudent.specializare;
    topicRef.current.value = newStudent.topic;
    coordinatorRef.current.value = newStudent.coordinator;
    }

const handleEdit = () => {
    const student = {nume : nameRef.current.value, email : emailRef.current.value, nr_matricol : regNumberRef.current.value, forma_de_invatamant : edFormRef.current.value, specializare : specializationRef.current.value, topic : topicRef.current.value, coordinator : coordinatorRef.current.value};
    axios.post('http://localhost:3001/api/students', student)
    .then(response => updateStudent(response.data));
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
                ref={nameRef}
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
                ref={emailRef}
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
                ref={regNumberRef}
                margin="normal"
                required
                fullWidth
                name="registrationNumber"
                label="Registration Number"
                id="regNumber"
                />
                <TextField
                ref={edFormRef}
                margin="normal"
                required
                fullWidth
                name="edForm"
                label="Education Form"
                id="edForm"
                />
                <TextField
                ref={specializationRef}
                margin="normal"
                required
                fullWidth
                name="spec"
                label="Specialization"
                id="spec"
                />
                <TextField
                ref={topicRef}
                margin="normal"
                required
                fullWidth
                name="topic"
                label="Topic"
                id="topic"
                />
                <TextField
                ref={coordinatorRef}
                margin="normal"
                required
                fullWidth
                name="coordinator"
                label="Coordinator"
                id="coordinator"
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

export default EditProfileStudent;
