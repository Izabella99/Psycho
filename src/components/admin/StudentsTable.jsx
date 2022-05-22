import React, { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { students } from '../../assets/dummy-data/students-list';
import Button from '@mui/material/Button';
import EditProfile from '../EditProfile';

export default class StudentsTable extends Component {
  render() {
    return (
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nume</TableCell>
            <TableCell align="right">Student</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Număr Matricol</TableCell>
            <TableCell align="right">FDI</TableCell>
            <TableCell align="right">Topic</TableCell>
            <TableCell align="right">Coordonator</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow
              key={student.student}
            >
              <TableCell component="th" scope="row">
                {student.student}
              </TableCell>
              <TableCell align="right" onClick={() => <EditProfile/>}>{student.student}</TableCell>
              <TableCell align="right">{student.field}</TableCell>
              <TableCell align="right">{student.nr_matricol}</TableCell>
              <TableCell align="right">{student.fdi}</TableCell>
              <TableCell align="right">{student.topic}</TableCell>
              <TableCell align="right">{student.coordonator}</TableCell>
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
