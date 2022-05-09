import React, { Component } from 'react'
import EditProfileC from './admin/EditProfileC';
import Header from './Header.jsx';
import Nav from './chat/Nav';

export default class EditProfile extends Component {
  render() {
    return (
        <div className='f-layer'>
            <Nav />
            <div className="f-container">
                <div className="f-header">
                    <Header />
                </div>
                <div className="container">
                    <EditProfileC />
                </div>
            </div>
        </div>
    );
  }
}
