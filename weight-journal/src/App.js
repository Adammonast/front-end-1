import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import {workoutdata} from "./workoutdata";
import {axiosWithAuth} from './utils/axiosWithAuth'
import AddWorkout from './components/AddWorkout';
import AddUserData from './components/AddUserData';
import PrivateRoute from "./components/PrivateRoute";
import UpdateWorkout from "./components/UpdateWorkout";

function App() {
  const [userid, setUserid] = useState('')
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    if(localStorage.getItem('token')){
      axiosWithAuth()
      .get(`/users/${userid}/journal`)
      .then(res => {
        console.log(res.data);
        setWorkouts(res.data); 
      })
      .catch(err => console.log(err));
    } else return
  }, [userid]);

  const signOut = () => {
        localStorage.removeItem('token')
  }

  return (
    <div className="App">
      <nav className="nav">
        <div className="header-container">
          <img className="header-icon" src="https://image.flaticon.com/icons/svg/2246/2246607.svg" alt="header-image"/>
          <h1 className="header">Workout Journal</h1>
        </div>
        <div className="nav-links">
          <Link to="/signin/">Sign In</Link>
          <Link to="/signup/">Sign Up</Link>
          <Link to="/addworkout/">Add Workout</Link>
          <Link to="/signin/" onClick={signOut}>Sign Out</Link>
        </div>
      </nav>
      <Switch>
        <Route path="/addworkout/" component={AddWorkout} userid={userid} />
        <PrivateRoute path="/dashboard" component={props => <Dashboard userid={userid} setWorkouts={setWorkouts} workouts={workouts} {...props} />} />
        <Route path="/addinfo/:id" render={props => <AddUserData {...props} />} />
        <Route path="/signin/" render={props => <SignIn {...props} setUserid={setUserid} />} />
        <Route path="/signup/" render={props => <SignUp {...props} />} />
        {/* <Route path="/updateworkout/:id" render={props => <UpdateWorkout {...props} /> } /> */}
      </Switch>
    </div>
  );
}

export default App;
