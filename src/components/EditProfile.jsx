import React, { Component, useContext, useState, useEffect } from 'react';
import Header from './Header.jsx';
import Nav from './chat/Nav';
import EditProfileStudent from './profiles/EditStudent';
import EditProfileTeacher from './profiles/EditTeacher';
import { useLocation } from 'react-router-dom';
import { AppContext } from './admin/StudentsTable';
import axios from 'axios';

const EditProfile = () => {
  const [students, setStudents] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/students')
      .then((response) => {
        const data = response.data;
        console.log('aici', data);
        setStudents(data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/professors')
      .then((response) => {
        const data = response.data;
        setProfessors(data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, []);

  useEffect(() => {
    if (students.length !== 0) {
      console.log('-----');
      setFlag(true);
    }
  }, [students, professors]);

  const getCurrentStudent = () => {
    var index = 0;
    console.log(students);
    console.log(students.length);
    for (let i = 0; i < students.length; i++) {
      if (students[i].email === localStorage.email) {
        index = i;
        break;
      }
    }
    return students[index];
  };

  const getCurrentTeacher = () => {
    var index = 0;
    for (let i = 0; i < professors.length; i++) {
      if (professors[i].email === localStorage.email) {
        index = i;
        break;
      }
    }
    return professors[index];
  };
  if (flag) {
    const role = localStorage.getItem('role');
    if (role === 'student' && students) {
      const user1 = getCurrentStudent();
      console.log(user1);
      const aux = {
        name: user1.name,
        email: user1.email,
        nr_matricol: user1.nr_matricol,
        specializare: user1.specializare,
        forma_de_invatamant: user1.forma_de_invatamant,
        topic: user1.topic,
        coordinator: user1.coordinator,
      };
      return (
        <div className='home-page'>
          <div className='layer'>
            <Header />
            <EditProfileStudent commonProps={aux} />
          </div>
        </div>
      );
    } else if (role === 'teacher') {
      const user1 = getCurrentTeacher();
      const aux = JSON.stringify({
        name: user1.name,
        email: user1.email,
        field: user1.field,
        nr_places: user1.nr_places,
        nr_places_available: user1.nr_places_available,
      });
      return (
        <div className='home-page'>
          <div className='layer'>
            <Header />
            <EditProfileTeacher commonProps={aux} />
          </div>
        </div>
      );
    } else {
      const location = useLocation();
      const user1 = JSON.parse(location.state.user);
      const userType = location.state.userType;
      if (userType == 'student') {
        const aux = JSON.stringify({
          name: user1.name,
          email: user1.email,
          nr_matricol: user1.nr_matricol,
          specializare: user1.specializare,
          forma_de_invatamant: user1.forma_de_invatamant,
          topic: user1.topic,
          coordinator: user1.coordinator,
        });
        return (
          <div className='home-page'>
            <div className='layer'>
              <Header />
              <EditProfileStudent commonProps={aux} />
            </div>
          </div>
        );
      } else {
        const aux = JSON.stringify({
          name: user1.name,
          email: user1.email,
          field: user1.field,
          nr_places: user1.nr_places,
          nr_places_available: user1.nr_places_available,
        });
        return (
          <div className='home-page'>
            <div className='layer'>
              <Header />
              <EditProfileTeacher commonProps={aux} />
            </div>
          </div>
        );
      }
    }
  }
};

export default EditProfile;
