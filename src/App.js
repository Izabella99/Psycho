import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";


function App() {
  return (
    <div className="App">
      <Router>
       <NavBar />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
        </Switch> 
      </Router>
    </div>
  );
}

export default App;
