import { NavLink, useNavigate } from "react-router-dom";
import React, { useState,useEffect,useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import Logo from "./Logo";
import { toast } from "react-toastify";
export default function Nav() {
    const [clicked, setClicked] = useState(false);
    const auth = localStorage.getItem('user');
    const { rollno, email } = auth ? JSON.parse(auth) : { rollno: null, email:null };
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const logout = () => {
        localStorage.clear();
        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        toast.success("Logged Out successfully")
        navigate('/Login');
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setClicked(false);
          }
        };
        if (clicked) {
            document.addEventListener('mousedown', handleClickOutside);
          } else {
            document.removeEventListener('mousedown', handleClickOutside);
          }
      
          return () => {
            document.removeEventListener('mousedown', handleClickOutside);
          };
        }, [clicked]);

    return (
        <div className="sticky top-0">
            <ul className="flex justify-between bg-blue-500 pl-4 items-center p-2 text-white">
            <div className="flex items-center">
                    <li className="text-xl mr-2 font-bold font-serif"><NavLink to={"/"}><Logo /></NavLink></li>
                    <li className="text-xl font-bold font-serif" ><NavLink to={"/"}>IIIT Una</NavLink></li>
                    </div>
                <li className="relative mr-0 font-bold font-serif">
                    {auth ? (
                        <>
                            <button
                                onClick={() => setClicked(!clicked)}
                                className="h-9 w-9 bg-black rounded-full"
                                aria-label="Toggle User Menu"
                            >
                            <FontAwesomeIcon icon={faUser} />
                                {/* Optional: Add an icon or text here */}
                            </button>

                            {/* Dropdown menu */}
                            <div  ref={dropdownRef} className={`${!clicked ? 'hidden' : 'flex'} bg-slate-600 flex-col pb-2 absolute right-0 top-full mt-1  shadow-lg text-white`}>
                                <div className=" hover:bg-blue-500 pt-2  font-semibold text-xl">
                                    <span className=" px-4 ">{rollno}</span>
                                </div>
                                <div className=" hover:bg-blue-500 pt-2 font-semibold text-xl">
                                    <span className=" px-4">{email}</span>
                                </div>
                                <div className=" hover:bg-blue-500 pt-2  font-semibold text-xl">
                                    <NavLink to="/changepassword">
                                        <span className=" px-4">Changepassword</span>
                                    </NavLink>
                                </div>
                                <div className=" hover:bg-blue-500 pt-2 font-semibold  text-xl">
                                    <NavLink onClick={logout} to="/Login">
                                        <span className="px-4">Logout</span>
                                    </NavLink>
                                </div>
                            </div>
                        </>
                    ) : (
                        <NavLink to="/Login">
                            <span className="text-green-950 px-4">Login</span>
                        </NavLink>
                    )}
                </li>
            </ul>
        </div>
    );
}
