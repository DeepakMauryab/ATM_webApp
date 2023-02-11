import React from 'react';
import Navbar from './Navbar/Navbar';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Register from './pages/Register';
import Login from './pages/Login';
import MyAccount from './MyAccount/MyAccount';
import AccGenrate from './pages/AccGenrate';
import CardInsert from './pages/CardInsert';

function Main() {
  return (
    <>
    <Navbar />
    <Routes >
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/myAccount" element={<MyAccount />}/>
        <Route path="/pingenerate" element={<AccGenrate />}/>
        <Route path="/insertCard" element={<CardInsert />}/>
    </Routes>
    </>
  )
}

export default Main;