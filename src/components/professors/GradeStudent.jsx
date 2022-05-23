import React, { Component } from 'react';
import '@fontsource/roboto/300.css';
import Header from '../Header.jsx';
import Nav from '../chat/Nav';
import '../../assets/css/professors/RequestsList.css';
import RequestsTable from './RequestsTable.jsx';
import GradeForm from './GradeForm.jsx';
import axios from 'axios';

class GradeStudent extends Component {

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
        //recalculate the final grade if all the grades are filled afther the state is changed
        setTimeout(
            () => {
                if(this.state.grade1 && this.state.grade2 && this.state.grade3) {
                    this.setState({
                        medie: (parseInt(this.state.grade1) + parseInt(this.state.grade2) + parseInt(this.state.grade3)) / 3
                    });
                }
            },
            0
        )
    }

    handleSubmit = () => {
        axios.get('http://localhost:3001/api/grade', {
            params: {
                studentEmail: localStorage.studentEmailForGrade,
                professorEmail: localStorage.email,
                criteria1Grade: this.state.grade1,
                criteria2Grade: this.state.grade2,
                criteria3Grade: this.state.grade3,
                finalGrade: this.state.medie
            }
            
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
        });
        setTimeout(() => {        
            window.location.href = '/students';}
            ,0);
    }

    constructor(props) {
        super(props);
        this.state = {
            criteria1: '',
            criteria2: '',
            criteria3: '',
            grade1: '',
            grade2: '',
            grade3: '',
            medie:'',
        };

        axios.get('http://localhost:3001/api/criteria').then(response => {
            const data = response.data;
            this.setState({
                criteria1: data.criteria1,
                criteria2: data.criteria2,
                criteria3: data.criteria3,
            });
             
        }).catch(error => {
            console.log(error);
        });

        axios.get('http://localhost:3001/api/grades', {
            params: {
                studentEmail: localStorage.studentEmailForGrade
            }
        })
        .then(response => {
            const data = response.data[0];
            this.setState({
                grade1: data.criteria1Grade,
                grade2: data.criteria2Grade,
                grade3: data.criteria3Grade,
                medie: data.finalGrade,
            });
        }).catch(error => {
            console.log(error);
        });
    }
    
    render() {
        return (
            <div className='f-layer'>
                <Nav />
                <div className="f-container">
                    <div className="f-header">
                        <Header />
                    </div>
                    <div className="container">
                        <GradeForm 
                            {...this.state}
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSubmit}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default GradeStudent;