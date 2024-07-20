import { NavLink, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Logo from "./Logo";
export default function Nav() {
    // const [loggedin,setloggedin]=React.useState(false);
    const [rollno,setrollno]=React.useState("");
    
    // function log(){

    //     setloggedin(!loggedin);
    // }
    const navigate=useNavigate();
    const logout=()=>{
        localStorage.clear();
       navigate('/Login');
    }
const auth=localStorage.getItem('user');
const {rollNo}=auth?JSON.parse(auth):{rollNo:null};
console.log(rollNo);
useEffect(()=>{
 setrollno(rollNo);
},[rollno]);
    return (
           <div className="sticky top-0">
                <ul className="flex space-x-6 space- bg-blue-500 pl-4 items-center p-2 text-white">
                    <li className="text-xl font-bold font-serif"><NavLink to={"/"}><Logo /></NavLink></li>
                    <li className="text-xl font-bold font-serif" ><NavLink to={"/"}>IIIT Una</NavLink></li>
                  
                  
                    {/* <li className="text-xl font-bold font-serif">{rollno}</li> */}
                    <li className="pl-96 font-bold font-serif">  
                    {auth?(  <>
    <NavLink onClick={logout} to="/Login">
      <span className=""> Logout </span>
    </NavLink>
    <span className="text-green-950 px-4">{rollno}</span>
  </> )
                    :(<NavLink  to={"/Login"}><span className=""> Login </span></NavLink>)} 
                     </li>
                    </ul>
        </div>
    )
}