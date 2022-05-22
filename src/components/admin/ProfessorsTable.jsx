import React, { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { professors } from '../../assets/dummy-data/professors-list';
import Button from '@mui/material/Button';

export default function ProfessorsTable () {

  const [professors, setProfessors] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(3);

    const [modalShow, setModalShow] = React.useState(false);
    const [professorName, setProfessorName] = React.useState([]);


    
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

    return (
      <div className="professorspage">
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
                <Button className="modal-toggle" variant="contained" onClick={() =>{ setModalShow(true); setProfessorName(professor.name);}}>Request</Button>
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
  <MyModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        name={professorName}
      />
  

</div>

    );
};