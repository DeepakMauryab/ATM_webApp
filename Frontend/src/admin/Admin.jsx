import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";

import { UserContext } from '../App';

const Admin = () => {

  // authentication section for navbar buttons
  const { dispatch } = useContext(UserContext);

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    registrationNumber: "", password: ""
  });
  const inputData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value });

  };
  const loginData = async (e) => {
    e.preventDefault();
    const { registrationNumber, password } = userData;
    const res = await fetch("/adminlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ registrationNumber, password })
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      alert("enter details");
    } else if (res.status === 406) {
      alert("wrong Password");
    } else {
      alert("login succesfully!")
      dispatch({ type: "user", payload: false })
      navigate("/AdminBlock");
    }
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4 ">
            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Enter Registration No:</label>
                <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="registrationNumber" onChange={inputData} value={userData.registrationNumber} />
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

export default Admin