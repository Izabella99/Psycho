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

export default class ProfessorsTable extends Component {
  render() {
    return (
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nume</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Câmp</TableCell>
            <TableCell align="right">Număr locuri</TableCell>
            <TableCell align="right">Număr locuri disponibile</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {professors.map((professor) => (
            <TableRow
              key={professor.name}
            >
              <TableCell component="th" scope="row">
                {professor.name}
              </TableCell>
              <TableCell align="right">{professor.email}</TableCell>
              <TableCell align="right">{professor.field}</TableCell>
              <TableCell align="right">{professor.nr_places}</TableCell>
              <TableCell align="right">{professor.nr_places_available}</TableCell>
              <TableCell>
                <Button variant="contained">Remove</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    );
  }
}
