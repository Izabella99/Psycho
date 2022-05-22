import React, { Component } from 'react'

import Header from './Header.jsx';
import Nav from './chat/Nav';
import EditProfileStudent from './profiles/EditStudent';
import EditProfileTeacher from './profiles/EditTeacher';


export default class EditProfile extends Component {
  render() {
    const role = localStorage.getItem('role');
    if (role === 'student') {
        return (
            <div className="home-page">
                <div className="layer">
                    <Header/>
                    <EditProfileStudent/> 
                </div>
              </div>
          );
    } else {
        return (
            <div className="home-page">
                <div className="layer">
                    <Header/>
                    <EditProfileTeacher/> 
                </div>
              </div>
          );   
    }
  }
}
