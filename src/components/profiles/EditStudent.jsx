import React, { Component, useEffect, useRef, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CoordinatorModal from './CoordinatorModal';

const EditProfileStudent = (props) => {
    console.log(props.commonProps.name);
    const student = props.commonProps;
    const nameRef = useRef(student.nume);
    const emailRef = useRef(student.email);
    const regNumberRef = useRef(student.nr_matricol);
    const edFormRef = useRef(student.forma_de_invatamant);
    const specializationRef = useRef(student.specializare);
    const topicRef = useRef(student.topic);
    const coordinatorRef = useRef(student.coordinator);

    const [modalShow, setModalShow] = useState(false); 
    const [professors, setProfessors] = useState([]);
    const [selectedProf, setSelectedProf] = useState("");

    let navigate = useNavigate();

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
    axios.post('http://localhost:3001/api/students/', student).catch((error)=>{
        console.log("error",error);
      })

    const aux = JSON.stringify({nume : student.nume, email : student.email, nr_matricol : student.nr_matricol, specializare : student.specializare, forma_de_invatamant : student.forma_de_invatamant, topic : student.topic, coordinator : student.coordinator});
    navigate('/profile', { state : { user : aux, userType : 'student'}});
    };

    useEffect(() => {
        axios
          .get('http://localhost:3001/api/availableProfessors')
          .then((response) => {
            setProfessors(response.data);
            console.log('Data has been Recived');
          })
          .catch((error) => {
            console.log('error', error);
          });
    }, []);

    const handleSelectCoordinator = (prof) => {
        setSelectedProf(prof);
    }

    const onAddCoordinator = async () => {
        const result = await fetch('http://localhost:3001/api/students', {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nr_matricol: student.nr_matricol,
                coordinator: selectedProf
            }),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return res.text();
        });

        navigate('/studentsListAdmin');
    }

    const onModalShow = () => { setModalShow(true); }

    const onModalHide = () => { 
        setModalShow(false); 
        if (selectedProf) {
            onAddCoordinator();
        }
    }

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
                value={props.commonProps.name}
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                autoComplete="Nume"
                autoFocus
                />
                <TextField
                ref={emailRef}
                margin="normal"
                value={props.commonProps.email}
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
                value={props.commonProps['forma_de_invatamant']}
                margin="normal"
                required
                fullWidth
                name="edForm"
                label="Education Form"
                id="edForm"
                />
                <TextField
                ref={specializationRef}
                value={props.commonProps.specializare}

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
                {
                    !student.coordinator ? 
                    (<Button 
                    fullWidth
                    variant="contained"
                    sx={{ mb: 2, backgroundColor: "gray" }}
                    onClick={onModalShow}>
                    Add coordinator
                    </Button>) 
                    : (<span></span>)
                }
            </Box>
            </Box>
            <CoordinatorModal 
                show={modalShow}
                onHide={onModalHide}
                name={"Assign coordinator for student"}
                professors={professors}
                onSelectCoordinator={handleSelectCoordinator}
            />
        </Container> 
    )
};

export default EditProfileStudent;
