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
import 'reactjs-popup/dist/index.css';
import '../../assets/css/professors/StudentsList.css';
import { Box, TextField } from '@material-ui/core';

export const AppContext = createContext(null);


const StudentsTable= (props) => {
    const [user, setUser] = useState(null);
    const [students, setStudents] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(3);
    const [tab, setTab] = useState("students");
    const [newStudent, setNewStudent] = useState({
        nume: "",
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
          setUser(data[0]);
        })
        .catch((error)=>{
          console.log("error",error);
        })
    },[])

    const addNewStudent = () => {
      console.log(newStudent.nume);
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
      <AppContext.Provider value={{ user, setUser }}>
      <div className="students">
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
              <TableCell component="th" scope="row" width="40%"> {student.nume}
              <Popup trigger={<Button id="info-button"> i</Button>} position="bottom center">
                
                  <div className="popup-head">
                    <p style={{color:'#003060',fontWeight:"700"}}>{student.nume}</p>
                    <p>{student.email}</p>
                  </div>
                  <p>Număr matricol:{student.nr_matricol}</p>
                  <p>Specializarea: {student.specializare}</p>
                  <p>Forma de învățământ: {student.forma_de_invatamant}</p>
                  <p>Tema: {student.tema}</p>
                  <p>Coordonator: {student.coordinator}</p>
              </Popup>
              </TableCell>
              <TableCell align="left">{student.tema}</TableCell>
              <TableCell>
                <Button className="modal-toggle" variant="contained">Notă</Button>
              </TableCell>
              <TableCell>
                <Button className="modal-toggle" variant="contained" onClick={() => 
                {console.log(student);
                setUser(student);
                console.log(user);
                navigate('/profile', { state : { user : student, userType : 'student'}})}}>Edit</Button>
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
      </AppContext.Provider>
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
        required
        fullWidth
        id="nume"
        label="Name"
        name="nume"
        autoComplete="Nume"
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