import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";

import { UserContext } from "../App";

const AdminLogout = () => {

    // authentication section for navbar buttons
    const { dispatch } = useContext(UserContext);

    const navigate = useNavigate();
    const adminSessionLogout = async () => {
        try {

            const res = await fetch("/logout", {
                method: "get",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            if (res.status !== 200 || res.status === 422) {
                // alert("not logout");
                navigate("/");
            }
            dispatch({ type: "user", payload: true })
            navigate("/");
        } catch (error) {
        }
    }
    useEffect(() => {
        adminSessionLogout();
    });
    return (
        <>
        </>
    )
}

export default AdminLogout;