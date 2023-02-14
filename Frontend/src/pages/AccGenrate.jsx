import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AccGenrate = () => {
    const Navigate = useNavigate();

    const [pin, setPin] = useState("");

    const [userData, setUserData] = useState({});

    const generatePin = async (e) => {
        e.preventDefault();
        if (pin.length > 4 || pin.length < 4) {
            alert("enter only 4-digit pin");
        } else {
            const res = await fetch("/setPin", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ pin })
            })
            const data = await res.json();
            if (!data || res.status === 422) {
                alert("enter details !")
            } else {
                alert("ATM pin succesfully created!");
                Navigate("/");
                alert("please insert your card to use services");
            }
        }
    };
    const getData = async () => {
        const res = await fetch("/userData", {
            method: "get",
            headers: {
                "Content-type": "application/json"
            }
        });
        const data = await res.json();
        setUserData(data);
    }
    useEffect(() => {
        getData();
    }, [])

    return (<>
        <div className="box container">
            <h1 className="text-center py-3">Your Account Number is: {userData.accountNumber}
            </h1>
            <div className="row">
                <h3>Generate your ATM Pin:</h3>
                <div className="col-md-5">

                    <form method="put">
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Enter 4-digit pin:</label>
                            <input type="number" className="form-control" id="exampleInputPassword1" name="password" onChange={(e) => setPin(e.target.value)} value={pin} />
                        </div>

                        <button type="submit" className="btn btn-primary" onClick={generatePin}>click to generate</button>
                    </form>
                </div>
            </div>
        </div>

    </>);
}

export default AccGenrate;