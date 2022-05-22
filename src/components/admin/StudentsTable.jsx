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
import EditProfile from '../EditProfile';



const StudentsTable= () => {

    const [students, setStudents] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(3);
    
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

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

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
                <Button className="modal-toggle" variant="contained" onClick={() => <EditProfile student/>}>Edit</Button>
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