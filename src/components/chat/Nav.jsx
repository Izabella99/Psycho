import React from 'react';
import { Link } from 'react-router-dom';
import "../../assets/css/Nav.css";
import { BsFillPeopleFill, BsFillPersonFill, BsFillChatFill, BsFillPersonBadgeFill } from 'react-icons/bs';
import { FaGraduationCap } from 'react-icons/fa';
import { DiRequirejs } from "react-icons/di";

function Nav() {
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
                <DiRequirejs/> Requests
            </Link>
            <Link to='/grades' className='nav-item'>
                <FaGraduationCap /> Grades
            </Link>
            <Link to='/chat' className='nav-item'>
                <BsFillChatFill /> Chat
            </Link>
            <div className='nav-footer'>
                <BsFillPersonFill /> Name Name
            </div>
    </div>
  );
};

export default Nav;