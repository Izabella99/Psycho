import React, { Component } from 'react';
import '@fontsource/roboto/300.css';
import Header from '../Header.jsx';
import Nav from '../chat/Nav';
import '../../assets/css/students/ProfessorsList.css';
import StudentsTable from './StudentsTable.jsx';

class ProfessorsList extends Component {
    render() {
        return (
            <div className='f-layer'>
                <Nav />
                <div className="f-container">
                    <div className="f-header">
                        <Header />
                    </div>
                    <div className="container">
                        <StudentsTable />
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfessorsList;