import React,  { useState, useEffect, createContext} from 'react';
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TablePagination } from '@mui/material';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Popup from "reactjs-popup";
import axios from 'axios';
import 'reactjs-popup/dist/index.css';
import '../../assets/css/professors/StudentsList.css';
import { Box, TextField } from '@material-ui/core';


const StudentsTable= (props) => {
    const [students, setStudents] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(3);
    const [tab, setTab] = useState("students");
    const [newStudent, setNewStudent] = useState({
        name: "",
        email: "",
        nr_matricol: "",
        forma_de_invatamant: "",
        specializare: "",
        topic: "",
        coordinator: ""
    })
    
    let navigate = useNavigate();
    
    useEffect(() => {
        axios.get('http://localhost:3001/api/students')
        .then((response)=>{
          const data=response.data; 
          setStudents(data);
        })
        .catch((error)=>{
          console.log("error",error);
        })
    },[])

    const addNewStudent = async () => {
      
      const result = await fetch('http://localhost:3001/api/students', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStudent),
      }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.text();
      });

      setTab("students");
    }

    const removeStudent = (e, stud_nr_matricol) => {
      
      axios.delete(`http://localhost:3001/api/students/${stud_nr_matricol}`, JSON.stringify(stud_nr_matricol))
      .then((response) => {
        setStudents(response.data);
        console.log("Student deleted successfully");
      })
      .catch((error) => {
        console.log("error",error);
      })

    }

    const handleInputsChange = (e) => {
      setNewStudent((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value  
      }));
    }

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const showStudents = () => {
      setTab("students");
    }

    const showAddStudents = () => {
      setTab("add");
    }

  if (tab === "students") {  
    return (
    <div className="students">
    <Button className='active' onClick={showStudents} id="outlined-button" variant="outlined">Students</Button>
    <Button id="outlined-button" variant="outlined">Grades</Button>
    <Button id="outlined-button" variant="outlined">History</Button>
    <Button onClick={showAddStudents} id="outlined-button" variant="outlined">Add Student</Button>
    <Paper sx={{ width: '100%', overflow: 'hidden',backgroundColor: "transparent" }}>
    <TableContainer sx={{ backgroundColor: "transparent",  maxHeight: 520  }}>
      <Table sx={{ minWidth: 500 }} stickyHeader aria-label="sticky table">
        <TableHead >
          <TableRow>
            <TableCell>STUDENT </TableCell>
            <TableCell align="left">TEMA</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((student) => (
            <TableRow key={student.id}>
              <TableCell component="th" scope="row" width="40%"> {student.name}
              <Popup trigger={<Button id="info-button"> i</Button>} position="bottom center">
                
                  <div className="popup-head">
                    <p style={{color:'#003060',fontWeight:"700"}}>{student.name}</p>
                    <p>{student.email}</p>
                  </div>
                  <p>Număr matricol:{student.nr_matricol}</p>
                  <p>Specializarea: {student.specializare}</p>
                  <p>Forma de învățământ: {student.forma_de_invatamant}</p>
                  <p>Tema: {student.topic}</p>
                  <p>Coordonator: {student.coordinator}</p>
              </Popup>
              </TableCell>
              <TableCell align="left">{student.topic}</TableCell>
              <TableCell>
                <Button className="modal-toggle" variant="contained" sx={{marginRight: "20px"}}>Notă</Button>
                
                <Button className="modal-toggle" variant="contained" onClick={() => 
                {
                const aux = JSON.stringify({nume : student.nume, email : student.email, nr_matricol : student.nr_matricol, specializare : student.specializare, forma_de_invatamant : student.forma_de_invatamant, topic : student.topic, coordinator : student.coordinator});
                navigate('/profile', { state : { user : aux, userType : 'student'}})}}>Edit</Button>
                
                <Button onClick={(e) => {removeStudent(e, student.nr_matricol) }} variant="contained" sx={{ marginLeft: "20px" }}>
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
    rowsPerPageOptions={[3, 6, 9]}
    component="div"
    count={students.length}
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
      <div className="students">
      <Button onClick={showStudents} id="outlined-button" variant="outlined">Students</Button>
      <Button id="outlined-button" variant="outlined">Grades</Button>
      <Button id="outlined-button" variant="outlined">History</Button>
      <Button className='active' onClick={showAddStudents} id="outlined-button" variant="outlined">Add Student</Button>
      <Paper sx={{ width: '100%', overflow: 'hidden',backgroundColor: "white",marginTop:"20px" }}>
      <Box className="box-container">
      <TextField
        value={newStudent.nume}
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
        value={newStudent.email}
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
        value={newStudent.nr_matricol}
        margin="normal"
        required
        fullWidth
        name="nr_matricol"
        label="Registration Number"
        id="nr_matricol"
        onChange={handleInputsChange}
      />
      <TextField
        value={newStudent.forma_de_invatamant}
        margin="normal"
        required
        fullWidth
        name="forma_de_invatamant"
        label="Education Form"
        id="forma_de_invatamant"
        onChange={handleInputsChange}
      />
      <TextField
        value={newStudent.specializare}
        margin="normal"
        required
        fullWidth
        name="specializare"
        label="Specialization"
        id="specializare"
        onChange={handleInputsChange}
      />
      <TextField
        value={newStudent.topic}
        margin="normal"
        required
        fullWidth
        name="topic"
        label="Topic"
        id="topic"
        onChange={handleInputsChange}
      />
      <TextField
        value={newStudent.coordinator}
        margin="normal"
        required
        fullWidth
        name="coordinator"
        label="Coordinator"
        id="coordinator"
        onChange={handleInputsChange}
      />
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={addNewStudent}
      >
      Add student
      </Button>
      </Box>
      </Paper>
      </div>
    );
  }
}
export default StudentsTable;