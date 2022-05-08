import React, { Component } from 'react';
import '@fontsource/roboto/300.css';
import Header from './Header.jsx';
import Nav from './chat/Nav';
import '../assets/css/admin/ProfessorsList.css';
import RequestsTable from './admin/RequestsTable.jsx';

class RequestsList extends Component {
    render() {
        return (
            <div className='f-layer'>
                <Nav />
                <div className="f-container">
                    <div className="f-header">
                        <Header />
                    </div>
                    <div className="container">
                        <RequestsTable />
                    </div>
                </div>
            </div>
        );
    }
}

export default RequestsList;