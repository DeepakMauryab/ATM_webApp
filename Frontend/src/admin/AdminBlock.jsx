import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const AdminBlock = () => {
    const Navigate = useNavigate();

    const [user, setUser] = useState();

    const [editId, setEditId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

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


    const editData = async () => {
        if (editId) {
            Navigate('/updateusers', {
                state: {
                    user,
                    editId
                }
            }
            );
        }
    }
const deleteData = async () => {
    if (deleteId) {
        const res = await fetch("/deleteData", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ deleteId })
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
            alert("user not deleted");
        } else {
            alert("data deleted succesfully");
        }
    }
};
useEffect(() => {
    usersData();
}, []);
useEffect(() => {
    deleteData();
}, [deleteId]);
useEffect(() => {
    editData();
}, [editId]);

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
                    <th colSpan={2} className="text-center">Operation</th>
                </tr>
            </thead>
            <tbody>
                {
                    user ?
                        user.map((ele, ind) => {
                            return (
                                <tr className='table-light' key={ind}>
                                    <td className='fw-bold text-primary'>{ind}</td>
                                    <td>{ele.accountNumber}</td>
                                    <td>{ele.name}</td>
                                    <td>{ele.adharNumber}</td>
                                    <td><i class="fa fa-indian-rupee-sign text-info"></i> {ele.balance}</td>
                                    <td className='text-center'><button style={{color: "#02fa49"}} onClick={() => setEditId(ele._id)}><i className="fa-solid fa-pen-to-square"></i></button></td>
                                    <td className='text-center'><button style={{color: "#eb1a1a"}} onClick={() => setDeleteId(ele._id)}><i className="fa-solid fa-trash-can"></i></button></td>
                                </tr>
                            );
                        })
                        :
                        null
                }
            </tbody>
        </table>
    </>
)
}

export default AdminBlock