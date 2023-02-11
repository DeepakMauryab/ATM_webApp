import React, { useState } from 'react';

const Transfer = () => {
  const [input, setInput] = useState({
    balance: "", accountNumber: "", pin: ""
  });
  const inputData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput({ ...input, [name]: value });
  };
  const transfer = async (e) => {
    e.preventDefault();
    const { balance, accountNumber, pin } = input;
    const res = await fetch("/transfer", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ balance, accountNumber, pin })
    });
    const data = await res.json();
    if (!data || res.status === 422) {
      alert("pin incorrect");
    } else if (res.status === 404) {
      alert("no sufficient money");
    } else {
      alert("money transfered succesfull");
    }
  };
  return (
    <>
      <div className="box">
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label fs-5">Enter balance:</label>
            <input type="number" className="form-control fs-5" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={inputData} value={input.balance} name="balance" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail2" className="form-label fs-5">To Account Number:</label>
            <input type="number" className="form-control fs-5" id="exampleInputEmail2" aria-describedby="emailHelp" onChange={inputData} value={input.accountNumber} name="accountNumber" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label fs-5">Enter Pin:</label>
            <input type="password" className="form-control fs-5" id="exampleInputPassword1" onChange={inputData} value={input.pin} name="pin" />
          </div>

          <button type="submit" className="btn btn-primary px-4" onClick={transfer}>Transfer</button>
        </form>
      </div>
    </>
  )
}

export default Transfer