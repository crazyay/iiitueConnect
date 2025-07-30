import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUser, 
    faSignOutAlt, 
    faChevronDown,
    faUserGraduate, 
    faFileAlt, 
    faExclamationTriangle, 
    faBriefcase, 
    faNewspaper, 
    faImages,
    faBars,
    faTimes,
    faKey
} from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";
import Logo from "./Logo";

export default function Nav() {
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [registrationDropdownOpen, setRegistrationDropdownOpen] = useState(false);
    const [complaintDropdownOpen, setComplaintDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const auth = localStorage.getItem('user');
    const { rollno, email } = auth ? JSON.parse(auth) : { rollno: null, email: null };
    const navigate = useNavigate();
    const userDropdownRef = useRef(null);
    const registrationDropdownRef = useRef(null);
    const complaintDropdownRef = useRef(null);

    const logout = () => {
        localStorage.clear();
        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        toast.success("Logged Out successfully")
        setUserDropdownOpen(false);
        setMobileMenuOpen(false);
        navigate('/Login');
    };

    const handleClickOutside = (event) => {
        if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
            setUserDropdownOpen(false);
        }
        if (registrationDropdownRef.current && !registrationDropdownRef.current.contains(event.target)) {
            setRegistrationDropdownOpen(false);
        }
        if (complaintDropdownRef.current && !complaintDropdownRef.current.contains(event.target)) {
            setComplaintDropdownOpen(false);
        }
    };

    useEffect(() => {
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
                        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
                                <Logo />
                            </div>
                            <div className="text-white">
                                <h1 className="text-xl font-bold">IIIT Una</h1>
                                <p className="text-xs text-blue-100">Admin Portal</p>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {/* Registration Dropdown */}
                        <div className="relative" ref={registrationDropdownRef}>
                            <button
                                onClick={() => setRegistrationDropdownOpen(!registrationDropdownOpen)}
                                className="flex items-center space-x-2 text-white hover:text-blue-200 px-3 py-2 rounded-lg hover:bg-blue-500 transition-all duration-200 font-medium"
                            >
                                <FontAwesomeIcon icon={faUserGraduate} className="text-sm" />
                                <span>Registration</span>
                                <FontAwesomeIcon 
                                    icon={faChevronDown} 
                                    className={`text-xs transition-transform duration-200 ${
                                        registrationDropdownOpen ? 'rotate-180' : ''
                                    }`} 
                                />
                            </button>
                            {registrationDropdownOpen && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                                    <Link 
                                        to="/Registration/Academic" 
                                        onClick={() => setRegistrationDropdownOpen(false)}
                                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                                    >
                                        <FontAwesomeIcon icon={faUserGraduate} className="mr-3 text-blue-600" />
                                        <span className="font-medium">Academic</span>
                                    </Link>
                                    <Link 
                                        to="/Registration/Hostel" 
                                        onClick={() => setRegistrationDropdownOpen(false)}
                                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                                    >
                                        <FontAwesomeIcon icon={faUserGraduate} className="mr-3 text-blue-600" />
                                        <span className="font-medium">Hostel</span>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Applications Link */}
                        <Link 
                            to="/application" 
                            className="flex items-center space-x-2 text-white hover:text-blue-200 px-3 py-2 rounded-lg hover:bg-blue-500 transition-all duration-200 font-medium"
                        >
                            <FontAwesomeIcon icon={faFileAlt} className="text-sm" />
                            <span>Applications</span>
                        </Link>

                        {/* Complaints Dropdown */}
                        <div className="relative" ref={complaintDropdownRef}>
                            <button
                                onClick={() => setComplaintDropdownOpen(!complaintDropdownOpen)}
                                className="flex items-center space-x-2 text-white hover:text-blue-200 px-3 py-2 rounded-lg hover:bg-blue-500 transition-all duration-200 font-medium"
                            >
                                <FontAwesomeIcon icon={faExclamationTriangle} className="text-sm" />
                                <span>Complaints</span>
                                <FontAwesomeIcon 
                                    icon={faChevronDown} 
                                    className={`text-xs transition-transform duration-200 ${
                                        complaintDropdownOpen ? 'rotate-180' : ''
                                    }`} 
                                />
                            </button>
                            {complaintDropdownOpen && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                                    <Link 
                                        to="/Complaint/Civil" 
                                        onClick={() => setComplaintDropdownOpen(false)}
                                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                                    >
                                        <FontAwesomeIcon icon={faExclamationTriangle} className="mr-3 text-orange-600" />
                                        <span className="font-medium">Civil</span>
                                    </Link>
                                    <Link 
                                        to="/Complaint/Electrical" 
                                        onClick={() => setComplaintDropdownOpen(false)}
                                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                                    >
                                        <FontAwesomeIcon icon={faExclamationTriangle} className="mr-3 text-yellow-600" />
                                        <span className="font-medium">Electrical</span>
                                    </Link>
                                    <Link 
                                        to="/Complaint/Wifi" 
                                        onClick={() => setComplaintDropdownOpen(false)}
                                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                                    >
                                        <FontAwesomeIcon icon={faExclamationTriangle} className="mr-3 text-red-600" />
                                        <span className="font-medium">WiFi</span>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Placements Link */}
                        <Link 
                            to="/Placements" 
                            className="flex items-center space-x-2 text-white hover:text-blue-200 px-3 py-2 rounded-lg hover:bg-blue-500 transition-all duration-200 font-medium"
                        >
                            <FontAwesomeIcon icon={faBriefcase} className="text-sm" />
                            <span>Placements</span>
                        </Link>

                        {/* News Link */}
                        <Link 
                            to="/News" 
                            className="flex items-center space-x-2 text-white hover:text-blue-200 px-3 py-2 rounded-lg hover:bg-blue-500 transition-all duration-200 font-medium"
                        >
                            <FontAwesomeIcon icon={faNewspaper} className="text-sm" />
                            <span>News</span>
                        </Link>

                        {/* Gallery Link */}
                        <Link 
                            to="/gallery" 
                            className="flex items-center space-x-2 text-white hover:text-blue-200 px-3 py-2 rounded-lg hover:bg-blue-500 transition-all duration-200 font-medium"
                        >
                            <FontAwesomeIcon icon={faImages} className="text-sm" />
                            <span>Gallery</span>
                        </Link>
                    </div>

                    {/* User Info and Mobile Menu */}
                    <div className="flex items-center space-x-4">
                        {auth ? (
                            <div className="relative" ref={userDropdownRef}>
                                <button
                                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                    className="flex items-center space-x-3 bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg transition-colors duration-200"
                                >
                                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                                        <FontAwesomeIcon icon={faUser} className="text-blue-600 text-sm" />
                                    </div>
                                    <div className="text-left hidden md:block">
                                        <div className="text-white text-sm font-medium">{rollno}</div>
                                        <div className="text-blue-200 text-xs">{email}</div>
                                    </div>
                                    <FontAwesomeIcon 
                                        icon={faChevronDown} 
                                        className={`text-white text-xs transition-transform duration-200 ${
                                            userDropdownOpen ? 'rotate-180' : ''
                                        }`} 
                                    />
                                </button>
                                {userDropdownOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                                        <div className="px-4 py-3 border-b border-gray-200">
                                            <p className="text-sm font-medium text-gray-800">{rollno}</p>
                                            <p className="text-xs text-gray-500">{email}</p>
                                        </div>
                                        <Link
                                            to="/changepassword"
                                            onClick={() => setUserDropdownOpen(false)}
                                            className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                                        >
                                            <FontAwesomeIcon icon={faKey} className="mr-3 text-blue-600" />
                                            <span className="font-medium">Change Password</span>
                                        </Link>
                                        <button
                                            onClick={logout}
                                            className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200"
                                        >
                                            <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
                                            <span className="font-medium">Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link 
                                to="/Login" 
                                className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                            >
                                Login
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 text-white hover:bg-blue-500 rounded-lg transition-colors"
                            aria-label="Toggle mobile menu"
                        >
                            <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} className="text-lg" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-blue-600 border-t border-blue-500">
                    <div className="px-4 py-2 space-y-1">
                        <div className="py-2">
                            <p className="text-blue-200 text-sm font-medium mb-2">Registration</p>
                            <Link
                                to="/Registration/Academic"
                                className="block pl-4 py-2 text-white hover:bg-blue-500 rounded transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Academic
                            </Link>
                            <Link
                                to="/Registration/Hostel"
                                className="block pl-4 py-2 text-white hover:bg-blue-500 rounded transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Hostel
                            </Link>
                        </div>
                        <Link
                            to="/application"
                            className="block py-2 text-white hover:bg-blue-500 rounded transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Applications
                        </Link>
                        <div className="py-2">
                            <p className="text-blue-200 text-sm font-medium mb-2">Complaints</p>
                            <Link
                                to="/Complaint/Civil"
                                className="block pl-4 py-2 text-white hover:bg-blue-500 rounded transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Civil
                            </Link>
                            <Link
                                to="/Complaint/Electrical"
                                className="block pl-4 py-2 text-white hover:bg-blue-500 rounded transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Electrical
                            </Link>
                            <Link
                                to="/Complaint/Wifi"
                                className="block pl-4 py-2 text-white hover:bg-blue-500 rounded transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                WiFi
                            </Link>
                        </div>
                        <Link
                            to="/Placements"
                            className="block py-2 text-white hover:bg-blue-500 rounded transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Placements
                        </Link>
                        <Link
                            to="/News"
                            className="block py-2 text-white hover:bg-blue-500 rounded transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            News
                        </Link>
                        <Link
                            to="/gallery"
                            className="block py-2 text-white hover:bg-blue-500 rounded transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Gallery
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
