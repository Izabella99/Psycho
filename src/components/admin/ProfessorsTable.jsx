import React, { Component, useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from 'axios';
import { TablePagination } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { Box, TextField } from '@material-ui/core';
import '../../assets/css/professors/StudentsList.css'; 

const ProfessorsTable = (props) => {

  const [professors, setProfessors] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(3);
    const [tab, setTab] = useState("professors");
    const [newProfessor, setNewProfessor] = useState({
      email: "",
      name: "",
      field: "",
      nr_places: "",
      nr_places_available: ""
    });
    let navigate = useNavigate();
    
    useEffect(() => {

        axios.get('http://localhost:3001/api/professors')
        .then((response)=>{
          const data=response.data; 
          setProfessors(data);
          console.log("Data has been Recived");
        })
        .catch((error)=>{
          console.log("error",error);
        })
    },[])

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const addNewProfessor = async () => {
      
      const result = await fetch('http://localhost:3001/api/professors', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProfessor),
      }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.text();
      });

      setTab("professors");
    }

    const handleInputsChange = (e) => {
      setNewProfessor((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value  
      }));
    }

    const showProfessors = () => {
      setTab("professors");
    }

    const showAddProfessors = () => {
      setTab("addProfessor");
    }

    if (tab === "professors") {
    return (
    <div className="professorspage">
    <Button className='active' onClick={showProfessors} id="outlined-button" variant="outlined">Professors</Button>
    <Button id="outlined-button-large" variant="outlined">Professor's students</Button>
    <Button onClick={showAddProfessors} id="outlined-button" variant="outlined">Add professor</Button>
    <Paper sx={{ width: '100%', overflow: 'hidden',backgroundColor: "transparent" }}>
    <TableContainer sx={{ backgroundColor: "transparent",  maxHeight: 520  }}>
      <Table sx={{ minWidth: 500 }} stickyHeader aria-label="sticky table">
        <TableHead sx={{ backgroundColor: "transparent"}}>
          <TableRow>
            <TableCell>NUME</TableCell>
            <TableCell align="left">DOMENIU</TableCell>
            <TableCell align="left">NR LOCURI DISPONIBILE</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {professors
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((professor) => (
            <TableRow key={professor.index}>
              <TableCell component="th" scope="row" width="30%"> {professor.name}
               <p align="left">{professor.email}</p>
              </TableCell>
              <TableCell align="left">{professor.field}</TableCell>
              <TableCell align="left">{professor.nr_places_available}</TableCell>
              <TableCell>
                <Button variant="contained" onClick={() =>{ 
                  const aux = JSON.stringify({name : professor.name, email : professor.email, field : professor.field, nr_places : professor.nr_places, nr_places_available : professor.nr_places_available});
                  navigate('/profile', { state : { user : aux, userType : 'teacher'}})}}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
    rowsPerPageOptions={[3, 6, 9]}
    component="div"
    count={professors.length}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
  />
  </Paper>
  

      </div>
      );
    } else {
      return (
        <div className="professorspage">
        <Button onClick={showProfessors} id="outlined-button" variant="outlined" >Professors</Button>
        <Button id="outlined-button-large" variant="outlined">Professor's students</Button>
        <Button className='active' onClick={showAddProfessors} id="outlined-button" variant="outlined">Add professor</Button>
        <Paper sx={{ width: '100%', overflow: 'hidden',backgroundColor: "white",marginTop:"20px" }}>
        <Box className="box-container">
        <TextField
          value={newProfessor.name}
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="Name"
          autoFocus
          onChange={handleInputsChange}
        />
        <TextField
          value={newProfessor.email}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={handleInputsChange}
        />
        <TextField
          value={newProfessor.field}
          margin="normal"
          required
          fullWidth
          name="field"
          label="Field"
          id="field"
          onChange={handleInputsChange}
        />
        <TextField
          value={newProfessor.nr_places}
          type="number"
          margin="normal"
          required
          fullWidth
          name="nr_places"
          label="Number of Places"
          id="nr_places"
          onChange={handleInputsChange}
        />
        <TextField
          value={newProfessor.nr_places_available}
          margin="normal"
          required
          fullWidth
          name="nr_places_available"
          label="Number of Available Places"
          id="nr_places_available"
          onChange={handleInputsChange}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={addNewProfessor}
        >
        Add professor
        </Button>
        </Box>
        </Paper>
        </div>
      );
    }
};

export default ProfessorsTable;