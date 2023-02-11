import React, { useState } from 'react'

const Withdraw = () => {
  const [input, setInput] = useState({
    balance: "", pin: ""
  });
  const inputData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput({ ...input, [name]: value });
  };
  const withdraw = async (e) => {
    e.preventDefault();
    const { balance, pin } = input;
    const res = await fetch("/withdraw", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ balance, pin })
    });
    const data= await res.json();
    if(!data || res.status=== 422){
      alert("pin incorrect");
    }else if(res.status=== 500){
      alert("no sufficient money");
    }else{
      alert("money withdrawed");
    }
  }
  return (
    <>
      <div className="box">
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label fs-5">Enter Withdrawal Money:</label>
            <input type="number" className="form-control fs-5" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={inputData} value={input.balance} name="balance" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label fs-5">Enter Pin:</label>
            <input type="password" className="form-control fs-5" id="exampleInputPassword1" onChange={inputData} value={input.pin} name="pin" />
          </div>

          <button type="submit" className="btn btn-primary px-4" onClick={withdraw}>Withdraw</button>
        </form>
      </div>
    </>
  )
}

export default Withdraw