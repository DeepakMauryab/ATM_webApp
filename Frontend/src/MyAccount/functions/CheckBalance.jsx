import React, { useState } from 'react'

const CheckBalance = () => {
  const [balance, setBalance] = useState("");
  const [pin, setPin] = useState("");
  const CheckBalance = async (e) => {
    e.preventDefault();
    const res = await fetch("/checkBalance", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ pin })
    });
    const data = await res.json();
    setBalance(data.balance);
  };
  return (
    <>
      <div className="box">
        {
          balance ? <h2>Available Money: <span style={{color: "red"}}>{balance}</span> rs.</h2>
            :

            <form method='post'>

              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label fs-5">Enter Pin:</label>
                <input type="password" className="form-control fs-5" id="exampleInputPassword1" onChange={(e)=>setPin(e.target.value)} placeholder="enter Your 4-digit pin"/>
              </div>

              <button type="submit" className="btn btn-primary px-4" onClick={CheckBalance}>Check Your Balance</button>
              <br /> <br /> <br />
              <h6>Available Money: {balance}</h6>
            </form>
        }
      </div>
    </>
  )
}

export default CheckBalance