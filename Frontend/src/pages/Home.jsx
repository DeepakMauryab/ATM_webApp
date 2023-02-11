import React from 'react';
import "./Home.css";
import { NavLink } from "react-router-dom";

function Home() {
    return (
        <>
            <h1 className="text-center p-1">WELCOME TO MY ATM</h1>
            <div className="homePage">
                <div className="buttons">
                    <NavLink className="btn btn-danger" role="button" to='/register'>Open New Account</NavLink>
                    <div>
                    <span style={{color: "blue"}}>If you have ATM CARD!</span>
                    <NavLink className="btn btn-primary" role="button" to='/insertCard'>Insret Card Here !</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home