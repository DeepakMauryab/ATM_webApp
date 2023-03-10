import React from 'react';
import Navbar from './Navbar/Navbar';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from './pages/Register';
import Login from './pages/Login';
import MyAccount from './MyAccount/MyAccount';
import AccGenrate from './pages/AccGenrate';
import CardInsert from './pages/CardInsert';
import Admin from './admin/Admin';
import AdminBlock from './admin/AdminBlock';
import AdminLogout from './admin/AdminLogout';
import UpdateUser from './admin/UpdateUser';



function Main() {

  return (
    <>

      <Navbar />

      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myAccount" element={<MyAccount />} />
        <Route path="/pingenerate" element={<AccGenrate />} />
        <Route path="/insertCard" element={<CardInsert />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/AdminBlock" element={<AdminBlock />} />
        <Route path="/AdminOut" element={<AdminLogout />} />
        <Route path="/updateusers" element={<UpdateUser />} />
      </Routes>
    </>
  )
}

export default Main;