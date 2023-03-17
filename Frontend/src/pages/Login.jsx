import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";

import { UserContext } from "../App";

const Login = () => {

  // authentication section for navbar buttons
  const { dispatch } = useContext(UserContext);


  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    adharNumber: "", password: ""
  });
  const inputData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value });

  };
  const loginData = async (e) => {
    e.preventDefault();
    const { adharNumber, password } = userData;
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ adharNumber, password })
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      alert("enter details");
    } else if (res.status === 406) {
      alert("wrong Password");
    } else {
      alert("login succesfully!")
      dispatch({ type: "user", payload: false });
      navigate("/pingenerate");
    }
  };
  return (
    <>
      <div className="container mt-5">
            <h1 className='my-4'>Login for Create ATM Pin</h1>
        <div className="row">
          <div className="col-md-4 ">
            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Enter Adhar No:</label>
                <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="adharNumber" onChange={inputData} value={userData.adharNumber} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password:</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={inputData} value={userData.password} />
              </div>

              <button type="submit" className="btn btn-primary" onClick={loginData}>LogIn Your Account</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login