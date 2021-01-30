import './App.css';
import React from 'react';
import Navbar from './Navbar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
//Importing each component
import home from './components/Home';
import profile from './components/Profile';
import login from './components/Login';
import signup from './components/Signup';
import Footer from './components/Footer';
import BusinessCard from './components/BusinessCard';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios';
import ProfileView from './components/ProfileView'

axios.defaults.baseURL = "https://us-central1-shopher.cloudfunctions.net/api";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'PT Sans',
      'sans-serif',
    ].join(','),
  },});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
    <div>
    <Navbar/>
        <div>
          <Switch>
            <Route exact path = "/" component = {home}/>
            <Route exact path = "/profile" component = {profile}/>
            <Route exact path = "/login" component = {login}/>
            <Route exact path = "/signup" component = {signup}/>
            <Route exact path = "/profileview" component = {ProfileView}/>
          </Switch>
        </div>
    </div>
    </Router>
    <Footer/>
    </ThemeProvider>
  );
}

export default App;
