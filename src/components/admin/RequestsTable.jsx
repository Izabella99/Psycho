import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from 'axios';

//make a function that takes a parameter 'status', if it is 'accepted', return in caps adn green
//if it is 'rejected', return in caps and red
const statusColor = (status) => {
  if (status === 'accepted') {
      return <span style={{ color: 'green' }}>{status.toUpperCase()}</span>;
  } else if (status === 'rejected') {
      return <span style={{ color: 'red' }}>{status.toUpperCase()}</span>;
  } else {
      return (
        <>
        <Button style={{ border: '2px solid green', backgroundColor:'transparent',color:'black' }}>Accept</Button>
        <Button style={{ border: '2px solid red', backgroundColor:'transparent', color:'black' }}>Reject</Button>
        </>
      );
  }

}

const RequestsTable= () => {
const [requests, setRequests] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  
  useEffect(() => {

      axios.get('http://localhost:3001/api/requests')
      .then((response)=>{
        const data=response.data; 
        setRequests(data);
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
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nume</TableCell>
            <TableCell align="right">Professor</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((request) => (
            <TableRow
              key={request.professorName}
            >
              <TableCell component="th" scope="row">{request.studentName}</TableCell>
              <TableCell align="right">{request.professorName}</TableCell>
              <TableCell align="right">{request.date}</TableCell>
              <TableCell align="right">{statusColor(request.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    );
};

export default RequestsTable;
