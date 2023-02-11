import React, { useState,useEffect } from 'react';
import "./account.css";
import Deposit from './functions/Deposit';
import Transfer from './functions/Transfer';
import Withdraw from './functions/Withdraw';
import CheckBalance from './functions/CheckBalance';
import Cancle from './functions/Cancle';
import { useNavigate } from 'react-router-dom';

const MyAccount = () => {

  const Navigate = useNavigate();
  const [user, setUser] = useState("");

  const [userData, setUserData]= useState({});
  const servies = (e) => {
    const name = e.target.innerText;
    setUser(name);
  };
  const getData= async ()=>{
    try{
    const res= await fetch("/userData", {
        method:"get",
        headers:{
            "Content-type":"application/json"
        },
        credentials: "include"
    });
    const data= await res.json();
    setUserData(data);
    if(!res.status===200){
      alert("user not genuine");
    }
  }catch(err){
    Navigate("/");
  }
}
useEffect(()=>{
    getData();
},[])
  return (
    <>
    
      <h1 className='text-center'>Welcome To KMCLU bank</h1>
      <h3 className='name text-center'>Hello {userData.name} A/c No. {userData.accountNumber}</h3>
      <div className="mainBox container">
        <div className="firstBox">
          {
            user === "Withdrawal" ? <Withdraw/> :
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