import {useNavigate} from "react-router-dom";
import { useEffect } from "react";

const Cancle = () => {
  const navigate= useNavigate();
  const cancleTransaction = async () => {
    const res = await fetch("/cancle", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    });
    if(res.status !== 200){
      alert("not cancle transaction");
    }
  navigate("/");
  }
  useEffect(()=>{
    cancleTransaction();
  });
  return (
    <>
    </>
  )
}

export default Cancle