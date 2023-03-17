import { useState } from 'react';
import { useNavigate } from "react-router-dom";


const Register = () => {


  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "", adharNumber: "", password: ""
  });
  const inputData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const sendData = async (e) => {
    e.preventDefault();
    const { name, adharNumber, password } = userData;

    if (adharNumber.length > 12 || adharNumber.length < 12) {
      alert("Enter correct 12-digit adhar Number");
    } else {

      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, adharNumber, password })
      });
      const data = await res.json();
      if (res.status === 422 || !data) {
        alert("enter correct details");
      } else {
        alert("Account Succesfully created !")
        navigate("/login");
      }
    }

  };
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4 ">
            <form method="POST">
              <div className="mb-3">
                <label htmlFor="exampleInputtext1" className="form-label">Enter Your Name:</label>
                <input type="text" className="form-control" id="exampleInputtext1" aria-describedby="emailHelp" name="name" onChange={inputData} value={userData.name} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Adhar Number:</label>
                <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="adharNumber" onChange={inputData} value={userData.adharNumber} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password:</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={inputData} value={userData.password} />
              </div>

              <button type="submit" className="btn btn-primary" onClick={sendData}>Create Account</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register