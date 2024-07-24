import React from "react";
import { Outlet,Navigate } from "react-router-dom";
export default function Private(){
    const auth=localStorage.getItem('user');
    return auth?<Outlet />:<Navigate to="/Login" />
}