import React, { Component } from 'react'

import Header from './Header.jsx';
import Nav from './chat/Nav';
import EditProfileStudent from './profiles/EditStudent';
import EditProfileTeacher from './profiles/EditTeacher';


const EditProfile = (user, userType) => {
    const role = localStorage.getItem('role');
    if (role === 'student') {
        return (
            <div className="home-page">
                <div className="layer">
                    <Header/>
                    <EditProfileStudent user/> 
                </div>
              </div>
          );
    } else if (role === 'teacher' ){
        return (
            <div className="home-page">
                <div className="layer">
                    <Header/>
                    <EditProfileTeacher user/> 
                </div>
              </div>
          );   
    } else {
        if (userType == 'student') {
            return (
                <div className="home-page">
                    <div className="layer">
                        <Header/>
                        <EditProfileStudent user/> 
                    </div>
                  </div>
            );
        } else {
            return (
                <div className="home-page">
                    <div className="layer">
                        <Header/>
                        <EditProfileTeacher user/> 
                    </div>
                  </div>
              );   
        }
    }
};

export default EditProfile;
