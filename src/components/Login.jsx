import React, { useState } from "react";
import "../assets/css/Login.css";
import Background from "../assets/images/Background.jpg"

const Home = () => {
  window.scrollTo(0, 0);

  return (
    <div>
      <div className="login_page">
        <div className="title"><h1>Let the adventure begin</h1></div>  
        <div className="wrapper">
          <SearchBar radius={radius} onSliderValueChange={sliderValueChange} />
          <Recommendations location={recPlace}  />
        </div>
      </div>
    </div>
  );
};
export default Login;
