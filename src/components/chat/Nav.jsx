import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/Nav.css';
import {
  BsFillPeopleFill,
  BsFillPersonFill,
  BsFillChatFill,
  BsFillPersonBadgeFill,
} from 'react-icons/bs';
import { FaGraduationCap } from 'react-icons/fa';
import { DiRequirejs } from 'react-icons/di';

function Nav() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');
    const name = localStorage.getItem('name');
    setName(name);
    setRole(role);
    console.log(email);
    console.log(role);
  }, []);

  if (role === 'student') {
    return (
      <div className='nav'>
        <Link to='/professors' className='nav-item'>
          <BsFillPersonBadgeFill /> Professors
        </Link>
        <Link to='/profile' className='nav-item'>
          <BsFillPersonFill /> Profile
        </Link>
        <Link to='/grades' className='nav-item'>
          <FaGraduationCap /> Grades
        </Link>
        <div className='nav-footer'>
          <BsFillPersonFill /> {name}
        </div>
      </div>
    );
  } else if (role === 'professor') {
    return (
      <div className='nav'>
        <Link to='/students' className='nav-item'>
          <BsFillPeopleFill /> Students
        </Link>
        <Link to='/profile' className='nav-item'>
          <BsFillPersonFill /> Profile
        </Link>
        <Link to='/requests' className='nav-item'>
          <DiRequirejs /> Requests
        </Link>
        <div className='nav-footer'>
          <BsFillPersonFill /> {name}
        </div>
      </div>
    );
  } else if(role === 'admin') {
    return (
      <div className='nav'>
        <Link to='/professors' className='nav-item'>
          <BsFillPersonBadgeFill /> Professors
        </Link>
        <Link to='/students' className='nav-item'>
          <BsFillPeopleFill /> Students
        </Link>
        <Link to='/profile' className='nav-item'>
          <BsFillPersonFill /> Profile
        </Link>
        <Link to='/requests' className='nav-item'>
          <DiRequirejs /> Requests
        </Link>
        <Link to='/grades' className='nav-item'>
          <FaGraduationCap /> Grades
        </Link>
        <Link to='/chat' className='nav-item'>
          <BsFillChatFill /> Chat
        </Link>
        <div className='nav-footer'>
          <BsFillPersonFill /> {name}
        </div>
      </div>
    );
  }
}

export default Nav;
