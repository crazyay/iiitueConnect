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
const {email}=auth?JSON.parse(auth):{rollNo:null};

useEffect(()=>{
 setrollno(email);
},[rollno]);
    return (
           <div className="sticky top-0">
                <ul className="flex justify-between dark:bg-gray-900 pl-4 items-center p-2 text-white">
                    <div className="flex items-center ">
                    <li className="text-xl mr-2 font-bold font-serif"><NavLink to={"/"}><Logo /></NavLink></li>
                    <li className="text-xl font-bold font-serif" ><NavLink to={"/"}>IIIT Una</NavLink></li>
                    </div>
                  
                    
                    <li className=" relative  mr-0 font-bold font-serif">  
                    {auth?(  <>
     <span className="text-white px-4">{rollno}</span>
    <NavLink onClick={logout} to="/Login">
      <span className="text-white px-4"> Logout </span>
    </NavLink>
  </> )
                    :(<NavLink  to={"/Login"}><span className=""> Login </span></NavLink>)} 
                     </li>
                    </ul>
        </div>
    )
}