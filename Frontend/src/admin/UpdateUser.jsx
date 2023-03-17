import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateUser = () => {

    const navigate = useNavigate();

    // useLocation used to access data from parent usenavigation
    const { state } = useLocation();
    const [data, setData] = useState({
        name: "", accountNumber: "", adharNumber: "" ,
        balance:""
        
    });
    useEffect(() => {
        for (let user of state.user) {
            if (user._id === state.editId) {
                setData(user);
            }
        }
    }, []);

    const inputData = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setData({ ...data, [name]: value });
    };

    const sendUpdateData = async (e) => {
        e.preventDefault();
        const { _id, name, accountNumber, adharNumber, balance } = data;

        if (adharNumber.length > 12 || adharNumber.length < 12) {
            alert("Enter correct 12-digit adhar Number");
        } else {

            const res = await fetch("/editData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ _id, name, accountNumber, adharNumber, balance })
            });
            const data = await res.json();
            if (res.status === 422 || !data) {
                alert("enter correct details");
            } else {
                alert("Account update succesfully !")
                navigate("/AdminBlock");
            }
        }

    };

    return (<>
        {
            data ? <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4 ">
                        <form method="POST">
                            <div className="mb-3">
                                <label htmlFor="exampleInputtext1" className="form-label">Enter Your Name:</label>
                                <input type="text" className="form-control" id="exampleInputtext1" aria-describedby="emailHelp" name="name" onChange={inputData} value={data.name} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="AccountNumber" className="form-label">Account Number:</label>
                                <input type="number" className="form-control" id="AccountNumber" aria-describedby="emailHelp" name="accountNumber" onChange={inputData} value={data.accountNumber} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="AdharNumber" className="form-label">Adhar Number:</label>
                                <input type="number" className="form-control" id="AdharNumber" aria-describedby="emailHelp" name="adharNumber" onChange={inputData} value={data.adharNumber} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="balance" className="form-label">Balance:</label>
                                <input type="number" className="form-control" id="balance" aria-describedby="emailHelp" name="balance" onChange={inputData} value={data.balance} />
                            </div>

                            <button type="submit" className="btn btn-primary" onClick={sendUpdateData}>Update Account Data</button>
                        </form>
                    </div>
                </div>
            </div> : null
        }
    </>)
}

export default UpdateUser;