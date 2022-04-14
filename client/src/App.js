import React, {useState} from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignInSignUp from "./views/SignInSignUp"
//import { Container, Grow, Grid } from '@mui/material';
import AllTrips from './components/AllTrips';
import AddTrip from "./components/AddTrip";
import EditTrip from "./components/EditTrip";
import ViewTrip from './components/ViewTrip';
import Profile from "./components/Profile";
import SetProfile from "./components/SetProfile";
import AllUsers from "./components/AllUsers"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [trips, setTrips] = useState([]);  


  return (
    <BrowserRouter>
    <div>      
      <Routes>
        <Route path = "/" element = {<SignInSignUp/>}/>
        <Route path = "/home" element = {<AllTrips trips = {trips} setTrips = {setTrips}/>}/>     
        <Route path = "/add" element = {<AddTrip/>}/>       
        <Route path = "/edit/:id" element = {<EditTrip/>}/>
        <Route path = "/:id" element = {<ViewTrip/>}/>
        <Route path = "/user/profile/:username" element = {<Profile/>}/>
        <Route path="/allusers" element = {<AllUsers/>}/>
        <Route path="/updateuser/:username" element = {<SetProfile/>}/>
      </Routes>
    </div>
    </BrowserRouter>    
  )
}

export default App