import * as React from 'react';
import "../assets/css/Home.css";
import '@fontsource/roboto/300.css';
import Header from './Header';
import Login from './Login';
import EditProfile from './EditProfile';
import StudentsList from './StudentsList';


const Home = () => {
  window.scrollTo(0, 0);

  return (
    <div className="home-page">
        <div className="layer">
            {/* <Header/>
            <Login/>  */}
            <StudentsList/>
        </div>
      </div>
  );
};
export default Home;
