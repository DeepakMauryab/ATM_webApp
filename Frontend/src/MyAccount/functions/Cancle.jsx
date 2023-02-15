import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";

import { UserContext } from "../../App";

const Cancle = () => {

  // authentication section for navbar buttons
  const { dispatch } = useContext(UserContext);


  const navigate = useNavigate();
  const cancleTransaction = async () => {
    const res = await fetch("/cancle", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    });
    if (res.status !== 200) {
      alert("not cancle transaction");
    }
    navigate("/");
    dispatch({ type: "user", payload: true })
  }
  useEffect(() => {
    cancleTransaction();
  });
  return (
    <>
    </>
  )
}

export default Cancle