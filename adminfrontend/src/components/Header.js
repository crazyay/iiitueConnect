import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUserGraduate, 
    faFileAlt, 
    faExclamationTriangle, 
    faBriefcase, 
    faNewspaper, 
    faImages,
    faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function Header() {
    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleDropdown = (dropdown) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    const closeDropdown = () => {
        setActiveDropdown(null);
    };

    return (
        <header className="bg-slate-700 shadow-lg border-t border-slate-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex items-center justify-center space-x-8 py-4">
                    {/* Registration Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => toggleDropdown('registration')}
                            className="flex items-center space-x-2 text-white hover:text-blue-300 px-4 py-2 rounded-lg hover:bg-slate-600 transition-all duration-200 font-medium"
                        >
                            <FontAwesomeIcon icon={faUserGraduate} className="text-sm" />
                            <span>Registration</span>
                            <FontAwesomeIcon 
                                icon={faChevronDown} 
                                className={`text-xs transition-transform duration-200 ${
                                    activeDropdown === 'registration' ? 'rotate-180' : ''
                                }`} 
                            />
                        </button>
                        
                        {activeDropdown === 'registration' && (
                            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                                <Link 
                                    to="/Registration/Academic" 
                                    onClick={closeDropdown}
                                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                                >
                                    <FontAwesomeIcon icon={faUserGraduate} className="mr-3 text-blue-600" />
                                    <span className="font-medium">Academic</span>
                                </Link>
                                <Link 
                                    to="/Registration/Hostel" 
                                    onClick={closeDropdown}
                                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                                >
                                    <FontAwesomeIcon icon={faUserGraduate} className="mr-3 text-blue-600" />
                                    <span className="font-medium">Hostel</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Application Link */}
                    <Link 
                        to="/application" 
                        className="flex items-center space-x-2 text-white hover:text-blue-300 px-4 py-2 rounded-lg hover:bg-slate-600 transition-all duration-200 font-medium"
                    >
                        <FontAwesomeIcon icon={faFileAlt} className="text-sm" />
                        <span>Applications</span>
                    </Link>

                    {/* Complaint Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => toggleDropdown('complaint')}
                            className="flex items-center space-x-2 text-white hover:text-blue-300 px-4 py-2 rounded-lg hover:bg-slate-600 transition-all duration-200 font-medium"
                        >
                            <FontAwesomeIcon icon={faExclamationTriangle} className="text-sm" />
                            <span>Complaints</span>
                            <FontAwesomeIcon 
                                icon={faChevronDown} 
                                className={`text-xs transition-transform duration-200 ${
                                    activeDropdown === 'complaint' ? 'rotate-180' : ''
                                }`} 
                            />
                        </button>
                        
                        {activeDropdown === 'complaint' && (
                            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                                <Link 
                                    to="/Complaint/Civil" 
                                    onClick={closeDropdown}
                                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                                >
                                    <FontAwesomeIcon icon={faExclamationTriangle} className="mr-3 text-orange-600" />
                                    <span className="font-medium">Civil</span>
                                </Link>
                                <Link 
                                    to="/Complaint/Electrical" 
                                    onClick={closeDropdown}
                                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
                                >
                                    <FontAwesomeIcon icon={faExclamationTriangle} className="mr-3 text-yellow-600" />
                                    <span className="font-medium">Electrical</span>
                                </Link>
                                <Link 
                                    to="/Complaint/Wifi" 
                                    onClick={closeDropdown}
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
                        className="flex items-center space-x-2 text-white hover:text-blue-300 px-4 py-2 rounded-lg hover:bg-slate-600 transition-all duration-200 font-medium"
                    >
                        <FontAwesomeIcon icon={faBriefcase} className="text-sm" />
                        <span>Placements</span>
                    </Link>

                    {/* News Link */}
                    <Link 
                        to="/News" 
                        className="flex items-center space-x-2 text-white hover:text-blue-300 px-4 py-2 rounded-lg hover:bg-slate-600 transition-all duration-200 font-medium"
                    >
                        <FontAwesomeIcon icon={faNewspaper} className="text-sm" />
                        <span>News</span>
                    </Link>

                    {/* Gallery Link */}
                    <Link 
                        to="/gallery" 
                        className="flex items-center space-x-2 text-white hover:text-blue-300 px-4 py-2 rounded-lg hover:bg-slate-600 transition-all duration-200 font-medium"
                    >
                        <FontAwesomeIcon icon={faImages} className="text-sm" />
                        <span>Gallery</span>
                    </Link>
                </nav>
            </div>

            {/* Overlay to close dropdowns when clicking outside */}
            {activeDropdown && (
                <div 
                    className="fixed inset-0 z-40" 
                    onClick={closeDropdown}
                ></div>
            )}
        </header>
    );
}