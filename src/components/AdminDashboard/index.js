import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import '../../assets/css/Chat.css'
import Nav from '../chat/Nav';
import Header from '../Header';

import './index.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5],
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
                <div className='number'>10</div>
              </div>
              <div className='admin-dashboard-students-col'>
                <div>Students without coordinator</div>
                <div className='number'>22</div>
              </div>
              <div className='admin-dashboard-students-col'>
                <div>Internship students</div>
                <div className='number'>53</div>
              </div>
              <div className='admin-dashboard-students-col'>
                <div>Available places</div>
                <div className='number'>20</div>
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
                        <div className='number'>10</div>
                      </div>
                      <div>
                        <div>Pending request</div>
                        <div className='number'>22</div>
                      </div>
                    </div>
                    <div className='item-requests-col'>
                      <div>
                        <div>Accepted</div>
                        <div className='number'>53</div>
                      </div>
                      <div>
                        <div>Rejected</div>
                        <div className='number'>20</div>
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
