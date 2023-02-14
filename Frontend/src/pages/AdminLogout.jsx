import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminLogout = () => {
    const navigate = useNavigate();
    const adminSessionLogout = async () => {
        const res = await fetch("/logout", {
            method: "get",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        if (res.status !== 200 || res.status ===422) {
            alert("not logout");
        }
        navigate("/admin");
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