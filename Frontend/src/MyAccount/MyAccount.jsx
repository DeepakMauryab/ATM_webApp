import React, { useState, useEffect, useContext } from 'react';
import "./account.css";
import Deposit from './functions/Deposit';
import Transfer from './functions/Transfer';
import Withdraw from './functions/Withdraw';
import CheckBalance from './functions/CheckBalance';
import Cancle from './functions/Cancle';
import { useNavigate } from 'react-router-dom';

// download pdf
import { jsPDF } from "jspdf";



const MyAccount = () => {


  const Navigate = useNavigate();
  const [user, setUser] = useState("");

  const [userData, setUserData] = useState({});
  const servies = (e) => {
    const name = e.target.innerText;
    setUser(name);
  };
  const getData = async () => {
    try {
      const res = await fetch("/userData", {
        method: "get",
        headers: {
          "Content-type": "application/json"
        },
        credentials: "include"
      });
      const data = await res.json();
      setUserData(data);
      if (!res.status === 200) {
        alert("user not genuine");
      }
    } catch (err) {
      Navigate("/");
    }
  }
  useEffect(() => {
    getData();
  }, []);
  const download = () => {
    const { accountNumber, adharNumber, balance, name } = userData;

    const receipt = new jsPDF();
    receipt.text(`Hello ${name}`, 50, 10);
    receipt.text("Welcome to KMCLU bank", 50, 20);
    receipt.text(`name - ${name}`, 60, 50);
    receipt.text(`Account Number - ${accountNumber}`, 60, 60);
    receipt.text(`Adhar Number - ${adharNumber}`, 60, 70);
    receipt.text(`Remaining Balance - ${balance}/- rs only`, 60, 80);

    receipt.save("receipt.pdf");

  };

  return (
    <>
      <div className='container d-flex justify-content-between p-1'>
        <h1 className='text-center'>Welcome To KMCLU bank</h1>
        <button type='button' className='btn btn-info' onClick={download}>Print Receipt</button>
      </div>
      <h3 className='name text-center'>Hello {userData.name} A/c No. {userData.accountNumber}</h3>
      <div className="mainBox container">
        <div className="firstBox">
          {
            user === "Withdrawal" ? <Withdraw /> :
              user === "Deposit" ? <Deposit /> :
                user === "Check Bank Balance" ? <CheckBalance /> :
                  user === "Transfer" ? <Transfer /> :
                    user === "Cancle" ? <Cancle /> :

                      <h1>"Select Your Services"</h1>
          }

        </div>
        <div className="secondBox">
          <button onClick={servies}>Withdrawal</button>
          <button onClick={servies}>Deposit</button>
          <button onClick={servies}>Check Bank Balance</button>
          <button onClick={servies}>Transfer</button>
          <button onClick={servies}>Cancle</button>
        </div>
      </div>
    </>
  )
};

export default MyAccount;