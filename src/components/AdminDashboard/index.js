import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useState, useEffect, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import '../../assets/css/Chat.css'
import Nav from '../chat/Nav';
import Header from '../Header';
import axios from 'axios';

import './index.css';

ChartJS.register(ArcElement, Tooltip, Legend);

let data = {
  labels: ['Denied', 'Accepted', 'Rejected'],
  datasets: [
    {
      label: '# of Votes',
      data: [1, 5, 1],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 206, 86)',
        'rgb(75, 192, 192)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 206, 86)',
        'rgb(75, 192, 192)',
      ],
      borderWidth: 1,
    },
  ],
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Dashboard = () => {
  const [select, setSelect] = useState(1);
  const [students, setStudents] = useState([]);
  const [requests, setRequests] = useState([]);

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

const getStudentsWithCoordinator = () => {
  var studentsWithCoordinator = 0;
  for (let i = 0; i < students.length; i++) {
    if (students[i].coordinator !== null && students[i].coordinator !== "" && students[i].coordinator !== undefined) {
      studentsWithCoordinator++;
    }
  }
  return studentsWithCoordinator;
}

const getStudentsWithoutCoordinator = () => {
  var studentsWithoutCoordinator = 0;
  for (let i = 0; i < students.length; i++) {
    if (students[i].coordinator === null || students[i].coordinator === "" || students[i].coordinator === undefined) {
      studentsWithoutCoordinator++;
    }
  }
  return studentsWithoutCoordinator;
}

const getNoOfStudentsWithCoordinator = getStudentsWithCoordinator();
const getNoOfStudentsWithoutCoordinator = getStudentsWithoutCoordinator();

const getRequestsAccepted = () => {
  var requestsAccepted = 0;
  for(let i = 0; i < requests.length; i++) {
    if (requests[i].status === "accepted") {
      requestsAccepted++;
    }
  }

  return requestsAccepted;
}

const getNoOfRequestsAccepted = getRequestsAccepted();

const getRequestDenied = () => {
  var requestsDenied = 0;
  for(let i = 0; i < requests.length; i++) {
    console.log(requests[i]);
    if (requests[i].status === "rejected") {
      requestsDenied++;
    }
  }

  return requestsDenied;
} 

const getNoOfRequestsDenied = getRequestDenied();

const getRequestsInPending = () => {
  return (requests.length - getNoOfRequestsAccepted - getNoOfRequestsDenied);
}

const getNoOfRequestsInPending = getRequestsInPending();
const getNoOfRequests = requests.length;
const getTotalNoOfStudents = students.length;

data.datasets.data = [];
data.datasets.data = [{getNoOfRequestsInPending}, {getNoOfRequestsAccepted}, {getNoOfRequestsDenied}];
/*data.datasets.data[0] = {getNoOfRequestsInPending};
data.datasets.data[1] = {getNoOfRequestsAccepted};
data.datasets.data[2] = {getNoOfRequestsDenied};*/

  return (
    <div className='f-layer'>
      <Nav />

      <div className='f-container'>
        <div className='f-header'>
            <Header />
          </div>
        <div className='admin'>
          <div className='admin-dashboard-page'>
            <h1 className='admin-dashboard-title'>Dashboard</h1>
            <div className='admin-dashboard-students'>
              <div className='admin-dashboard-students-col'>
                <div>Students with coordinator</div>
                <div className='number'>{getNoOfStudentsWithCoordinator}</div>
              </div>
              <div className='admin-dashboard-students-col'>
                <div>Students without coordinator</div>
                <div className='number'>{getNoOfStudentsWithoutCoordinator}</div>
              </div>
              <div className='admin-dashboard-students-col'>
                <div>Internship students</div>
                <div className='number'>{getNoOfStudentsWithoutCoordinator}</div>
              </div>
              <div className='admin-dashboard-students-col'>
                <div>Total number of students</div>
                <div className='number'>{getTotalNoOfStudents}</div>
              </div>
            </div>
          </div>
        
          <div className='wrapper'>
            <Box sx={{ width: '100%' }}>
              <Grid
                container
                rowSpacing={0}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid className='grid' item xs={6}>
                  <Item className='item-col'>
                    <div>Students state</div>
                    <Pie
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                      }}
                      data={data}
                    />
                  </Item>
                </Grid>
                <Grid className='grid' item xs={6}>
                  <Item className='item'>
                    <div className='item-requests-col'>
                      <div className=''>
                        <div>Requests sent</div>
                        <div className='number'>{getNoOfRequests}</div>
                      </div>
                      <div>
                        <div>Pending request</div>
                        <div className='number'>{getNoOfRequestsInPending}</div>
                      </div>
                    </div>
                    <div className='item-requests-col'>
                      <div>
                        <div>Accepted</div>
                        <div className='number'>{getNoOfRequestsAccepted}</div>
                      </div>
                      <div>
                        <div>Rejected</div>
                        <div className='number'>{getNoOfRequestsDenied}</div>
                      </div>
                    </div>
                  </Item>
                </Grid>
                <Grid className='grid' item xs={6}>
                  <Item className='item-col'>
                    <div>Students state</div>
                    <Pie
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                      }}
                      data={data}
                    />
                  </Item>
                </Grid>
                <Grid className='grid' item xs={6}>
                  <Item className='item-col'>
                    <div>Students state</div>
                    <Pie
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                      }}
                      data={data}
                    />
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </div>
        
          <div className='export'>
            <span className='export-label'>Select document to export</span>
            <TextField
            className="export-select"
              id="outlined-select-currency"
              select
              label="File"
              value={select}
            ></TextField>
            <button className='export-btn' variant='contained'>Export</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
