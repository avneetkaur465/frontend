import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/SignUp';
import Home from './components/Home';
import EditUsers from './components/EditUsers';


import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/"element={<Login/>}/>
       <Route path= "/signup"element={<Signup/>}/>
        <Route path="/home"element={<Home/>}/> 
        <Route path="/edit/:id"element={<EditUsers/>}/>

      </Routes>

    </Router>

      
    </div>
  );
}

export default App;
