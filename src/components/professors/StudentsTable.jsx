import React,  { useState, useEffect} from 'react';
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



const StudentsTable= () => {

    const [students, setStudents] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(3);
    
    useEffect(() => {

      //call studentsByProfessor and set the params
      axios.get('http://localhost:3001/api/students/coordinator', {
        params: {
          coordinator: localStorage.getItem('email')
        }
      })
      .then(res => {
        setStudents(res.data);
      })
      .catch(err => {
        console.log(err);
      })
    }, []);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleNota = (studentEmail) => {
      localStorage.setItem('studentEmailForGrade', studentEmail);
      //navigate to the page
      window.location.href = '/gradeStudent';
    }

    return (
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
              <TableCell component="th" scope="row" width="40%"> {student.name}
              <Popup trigger={<Button id="info-button"> i</Button>} position="bottom center">
                
                  <div className="popup-head">
                    <p style={{color:'#003060',fontWeight:"700"}}>{student.name}</p>
                    <p>{student.email}</p>
                  </div>
                  <p>Număr matricol:{student.nr_matricol}</p>
                  <p>Specializarea: {student.specializare}</p>
                  <p>Forma de învățământ: {student.forma_de_invatamant}</p>
                  <p>Tema: {student.tema}</p>
              </Popup>

              </TableCell>
              <TableCell align="left">{student.tema}</TableCell>
              <TableCell>
                <Button className="modal-toggle" variant="contained" onClick={() => {handleNota(student.email)}}>notă</Button>
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
}
export default StudentsTable;