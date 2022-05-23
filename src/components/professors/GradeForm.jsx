import React, { Component } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


class GradeForm extends Component {

    render() { 
        return (
            <Container
              component='main'
              maxWidth='xs'
              sx={{
                borderRadius: '10px',
                backgroundColor: 'rgba(229, 229, 229, 100)',
                border: ' 1px solid rgba(187, 187, 187, 100)',
                marginTop: '100px',
              }}
            >
              <CssBaseline />
                <Box
                    component='form'
                    onSubmit={this.props.handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                <TextField
                  onChange={this.props.handleChange.bind(this)}
                  margin='normal'
                  required
                  fullWidth
                  id='grade1'
                  label= {this.props.criteria1}
                  name='grade1'
                  autoFocus
                  value={this.props.grade1}
                />
                
                <TextField
                  onChange={this.props.handleChange.bind(this)}
                  margin='normal'
                  required
                  fullWidth
                  id='grade2'
                  label= {this.props.criteria2}
                  name='grade2'
                  autoFocus
                  value={this.props.grade2}
                />
                
                <TextField
                  onChange={this.props.handleChange.bind(this)}
                  margin='normal'
                  required
                  fullWidth
                  id='grade3'
                  label= {this.props.criteria3}
                  name='grade3'
                  autoFocus
                  value={this.props.grade3}
                />
                
                <TextField
                  margin='normal'
                  disabled
                  fullWidth
                  id='medie'
                  label= {'Media'}
                  name='medie'
                  autoFocus
                  value={this.props.medie}
                />

                <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                >
                Salvează note
                </Button>
                    
                </Box>

            </Container>
        );
    }
}
 

export 
default GradeForm;