import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const AdminBlock = () => {
    const Navigate = useNavigate();

    const [user, setUser] = useState();

    const usersData = async () => {
        try {
            const res = await fetch("/users", {
                method: "get",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();
            setUser(data);

        } catch (error) {
            Navigate("/admin");
        }
    };
    console.log(user);
    useEffect(() => {
        usersData();
    }, [])
    return (
        <>
        <NavLink role='button' className='btn btn-primary m-2' to="/AdminOut">LogOut</NavLink>
            <table className="table my-2">
                <thead>
                    <tr className='table-info'>
                        <th >Sr. No.</th>
                        <th >Account Number</th>
                        <th >Holder Name</th>
                        <th >Adhar Number</th>
                        <th >Balance</th>
                        <th colSpan={2}>Operation</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        user ?
                            user.map((ele, ind) => {
                                return (

                                    <tr className='table-light' key={ind}>
                                        <td>{ind}</td>
                                        <td>{ele.accountNumber}</td>
                                        <td>{ele.name}</td>
                                        <td>{ele.adharNumber}</td>
                                        <td>{ele.balance}</td>
                                        <td>Edit</td>
                                        <td>Delete</td>
                                    </tr>
                                );
                            })
                            :
                            ""
                    }
                </tbody>
            </table>
        </>
    )
}

export default AdminBlock