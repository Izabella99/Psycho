import * as React from 'react';
import "../assets/css/Home.css";
import '@fontsource/roboto/300.css';
import Header from './Header';
import Login from './Login';


const Home = () => {
  window.scrollTo(0, 0);

  return (
    <div className="home-page">
        <div class="layer">
            <Header/>
            <Login/> 
        </div>
      </div>
  );
};
export default Home;
