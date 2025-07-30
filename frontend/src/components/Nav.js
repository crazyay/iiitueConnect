import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faTimes, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import Logo from "./Logo";
import { toast } from "react-toastify";
export default function Nav() {
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [registrationDropdownOpen, setRegistrationDropdownOpen] = useState(false);
    const auth = localStorage.getItem('user');
    const { rollno, email } = auth ? JSON.parse(auth) : { rollno: null, email: null };
    const navigate = useNavigate();
    const userDropdownRef = useRef(null);
    const registrationDropdownRef = useRef(null);
    const logout = () => {
        localStorage.clear();
        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        toast.success("Logged Out successfully")
        setUserDropdownOpen(false);
        setMobileMenuOpen(false);
        navigate('/Login');
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setUserDropdownOpen(false);
            }
            if (registrationDropdownRef.current && !registrationDropdownRef.current.contains(event.target)) {
                setRegistrationDropdownOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
            {/* Main Navigation Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Brand */}
                    <div className="flex items-center space-x-3">
                        <NavLink to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                            <Logo />
                            <span className="text-white text-xl font-bold tracking-wide">IIIT Una</span>
                        </NavLink>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-1">
                        {/* Registration Dropdown */}
                        <div className="relative" ref={registrationDropdownRef}>
                            <button
                                onClick={() => setRegistrationDropdownOpen(!registrationDropdownOpen)}
                                className="flex items-center space-x-1 px-4 py-2 text-white hover:bg-blue-500 rounded-lg transition-colors duration-200"
                            >
                                <span className="font-medium">Registration</span>
                                <FontAwesomeIcon icon={faChevronDown} className={`text-xs transition-transform duration-200 ${registrationDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {registrationDropdownOpen && (
                                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                                    <NavLink
                                        to="/Registration/academic"
                                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                        onClick={() => setRegistrationDropdownOpen(false)}
                                    >
                                        Academic
                                    </NavLink>
                                    <NavLink
                                        to="/Registration/hostel"
                                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                        onClick={() => setRegistrationDropdownOpen(false)}
                                    >
                                        Hostel
                                    </NavLink>
                                </div>
                            )}
                        </div>

                        {/* Other Navigation Links */}
                        <NavLink
                            to="/Fees"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                                    isActive
                                        ? 'bg-blue-500 text-white'
                                        : 'text-white hover:bg-blue-500'
                                }`
                            }
                        >
                            Fees
                        </NavLink>
                        <NavLink
                            to="/application"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                                    isActive
                                        ? 'bg-blue-500 text-white'
                                        : 'text-white hover:bg-blue-500'
                                }`
                            }
                        >
                            Application
                        </NavLink>
                        <NavLink
                            to="/Complaint"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                                    isActive
                                        ? 'bg-blue-500 text-white'
                                        : 'text-white hover:bg-blue-500'
                                }`
                            }
                        >
                            Complaint
                        </NavLink>
                        <NavLink
                            to="/Placements"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                                    isActive
                                        ? 'bg-blue-500 text-white'
                                        : 'text-white hover:bg-blue-500'
                                }`
                            }
                        >
                            Placements
                        </NavLink>
                        <NavLink
                            to="/News"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                                    isActive
                                        ? 'bg-blue-500 text-white'
                                        : 'text-white hover:bg-blue-500'
                                }`
                            }
                        >
                            News
                        </NavLink>
                        <NavLink
                            to="/gallery"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                                    isActive
                                        ? 'bg-blue-500 text-white'
                                        : 'text-white hover:bg-blue-500'
                                }`
                            }
                        >
                            Gallery
                        </NavLink>
                    </div>

                    {/* User Menu and Mobile Menu Button */}
                    <div className="flex items-center space-x-4">
                        {/* User Dropdown */}
                        {auth ? (
                            <div className="relative" ref={userDropdownRef}>
                                <button
                                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                    className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-400 px-3 py-2 rounded-lg transition-colors duration-200"
                                    aria-label="User menu"
                                >
                                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                        <FontAwesomeIcon icon={faUser} className="text-white text-sm" />
                                    </div>
                                    <span className="hidden sm:block text-white font-medium">{rollno}</span>
                                    <FontAwesomeIcon icon={faChevronDown} className={`text-white text-xs transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                                
                                {userDropdownOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl py-2 z-50">
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="text-sm font-medium text-gray-900">{rollno}</p>
                                            <p className="text-sm text-gray-500 truncate">{email}</p>
                                        </div>
                                        <NavLink
                                            to="/changepassword"
                                            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                            onClick={() => setUserDropdownOpen(false)}
                                        >
                                            Change Password
                                        </NavLink>
                                        <button
                                            onClick={logout}
                                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <NavLink
                                to="/Login"
                                className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                            >
                                Login
                            </NavLink>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-white hover:bg-blue-500 rounded-lg transition-colors"
                            aria-label="Toggle mobile menu"
                        >
                            <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} className="text-lg" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-blue-600 border-t border-blue-500">
                    <div className="px-4 py-2 space-y-1">
                        <div className="py-2">
                            <p className="text-blue-200 text-sm font-medium mb-2">Registration</p>
                            <NavLink
                                to="/Registration/academic"
                                className="block pl-4 py-2 text-white hover:bg-blue-500 rounded transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Academic
                            </NavLink>
                            <NavLink
                                to="/Registration/hostel"
                                className="block pl-4 py-2 text-white hover:bg-blue-500 rounded transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Hostel
                            </NavLink>
                        </div>
                        <NavLink
                            to="/Fees"
                            className="block py-2 text-white hover:bg-blue-500 rounded transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Fees
                        </NavLink>
                        <NavLink
                            to="/application"
                            className="block py-2 text-white hover:bg-blue-500 rounded transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Application
                        </NavLink>
                        <NavLink
                            to="/Complaint"
                            className="block py-2 text-white hover:bg-blue-500 rounded transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Complaint
                        </NavLink>
                        <NavLink
                            to="/Placements"
                            className="block py-2 text-white hover:bg-blue-500 rounded transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Placements
                        </NavLink>
                        <NavLink
                            to="/News"
                            className="block py-2 text-white hover:bg-blue-500 rounded transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            News
                        </NavLink>
                        <NavLink
                            to="/gallery"
                            className="block py-2 text-white hover:bg-blue-500 rounded transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Gallery
                        </NavLink>
                    </div>
                </div>
            )}
        </nav>
    );
}
