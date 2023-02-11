import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CardInsert = () => {

    const Navigate = useNavigate();

    const [user, setUser] = useState({
        adharNumber: "", pin: ""
    });
    const inputData = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({ ...user, [name]: value });
    }

    const insertData = async (e) => {
        const { adharNumber, pin } = user;
        e.preventDefault();
        const res = await fetch("/pinAuth", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ adharNumber, pin })
        });
        const data = res.json();
        if (!data || res.status === 422) {
            alert("Enter Your Correct Pin");

        } else {
            alert("Welcome to Your Bank!");
            Navigate("/myAccount");
        }
    }

    return (<>
        <div className="container mt-5">
            <div className="row">
                <h1>Please Insert Your Card!</h1>
                <div className="col-md-4 ">
                    <form method="post">
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Enter Adhar No:</label>
                            <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="adharNumber" onChange={inputData} value={user.adharNumber} placeholder="Enter Your Adhar Number" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Enter Pin:</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" name="pin" onChange={inputData} value={user.pin} placeholder="Enter Your ATM Pin" />
                        </div>

                        <button type="submit" className="btn btn-primary" onClick={insertData}>Enter Your Bank !</button>
                    </form>
                </div>
            </div>
        </div>
    </>);
};

export default CardInsert;