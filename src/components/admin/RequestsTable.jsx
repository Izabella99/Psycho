import React, { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { requests } from '../../assets/dummy-data/requests-list';
import Button from '@mui/material/Button';

//make a function that takes a parameter 'status', if it is 'accepted', return in caps adn green
//if it is 'rejected', return in caps and red
const statusColor = (status) => {
    if (status === 'accepted') {
        return <span style={{ color: 'green' }}>{status.toUpperCase()}</span>;
    } else if (status === 'rejected') {
        return <span style={{ color: 'red' }}>{status.toUpperCase()}</span>;
    } else {
        return <span style={{color: 'grey'}}>{status.toUpperCase()}</span>;
    }
}

export default class RequestsTable extends Component {
  render() {
    return (
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nume</TableCell>
            <TableCell align="right">Profesor</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((request) => (
            <TableRow
              key={request.professor}
            >
              <TableCell component="th" scope="row">{request.student}</TableCell>
              <TableCell align="right">{request.professor}</TableCell>
              <TableCell align="right">{request.date}</TableCell>
              <TableCell align="right">{statusColor(request.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    );
  }
}
