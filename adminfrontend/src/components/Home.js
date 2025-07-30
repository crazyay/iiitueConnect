
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faUserGraduate, 
    faExclamationTriangle, 
    faFileAlt, 
    faBed, 
    faChartBar, 
    faUsers, 
    faClipboardCheck,
    faArrowRight,
    faEye,
    faCog
} from '@fortawesome/free-solid-svg-icons'
import "./home.css"

export default function Home() {
    const adminQuickLinks = [
        {
            title: "Academic Registration",
            description: "Review & Approve Applications",
            icon: faUserGraduate,
            path: "/AcademicRegistration",
            color: "from-blue-500 to-blue-600",
            hoverColor: "hover:from-blue-600 hover:to-blue-700",
            count: "15 Pending"
        },
        {
            title: "Hostel Registration",
            description: "Manage Hostel Applications",
            icon: faBed,
            path: "/HostelRegistration",
            color: "from-green-500 to-green-600",
            hoverColor: "hover:from-green-600 hover:to-green-700",
            count: "8 Pending"
        },
        {
            title: "Complaints",
            description: "Handle Student Complaints",
            icon: faExclamationTriangle,
            path: "/Complaint",
            color: "from-red-500 to-red-600",
            hoverColor: "hover:from-red-600 hover:to-red-700",
            count: "3 New"
        },
        {
            title: "Applications",
            description: "Review All Applications",
            icon: faFileAlt,
            path: "/Application",
            color: "from-purple-500 to-purple-600",
            hoverColor: "hover:from-purple-600 hover:to-purple-700",
            count: "12 Active"
        },
        {
            title: "Placements",
            description: "Manage Placement Data",
            icon: faChartBar,
            path: "/Placements",
            color: "from-indigo-500 to-indigo-600",
            hoverColor: "hover:from-indigo-600 hover:to-indigo-700",
            count: "25 Records"
        },
        {
            title: "User Management",
            description: "Manage System Users",
            icon: faUsers,
            path: "/Users",
            color: "from-orange-500 to-orange-600",
            hoverColor: "hover:from-orange-600 hover:to-orange-700",
            count: "1000+ Users"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Hero Section */}
            <div className="relative img">
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative z-10 flex flex-col justify-center items-center h-96 text-center px-4">
                    <h1 className="text-4xl md:text-6xl text-white font-bold tracking-wider mb-4" 
                        style={{textShadow: "2px 2px 8px rgba(0,0,0,0.7)"}}>
                        ADMIN PORTAL
                    </h1>
                    <p className="text-xl md:text-2xl text-white font-medium opacity-90 mb-8"
                       style={{textShadow: "1px 1px 4px rgba(0,0,0,0.7)"}}>
                        IIIT Una Connect - Administrative Dashboard
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link 
                            to="/AcademicRegistration" 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
                        >
                            <FontAwesomeIcon icon={faEye} />
                            <span>Review Applications</span>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                        <Link 
                            to="/Settings" 
                            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-2 border-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2"
                        >
                            <FontAwesomeIcon icon={faCog} />
                            <span>Settings</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Quick Links Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Administrative Dashboard
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Manage all aspects of the IIIT Una Connect platform from this centralized dashboard
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {adminQuickLinks.map((link, index) => (
                        <Link
                            key={index}
                            to={link.path}
                            className={`group relative bg-gradient-to-br ${link.color} ${link.hoverColor} p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                        >
                            <div className="text-white">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                                        <FontAwesomeIcon icon={link.icon} className="text-xl" />
                                    </div>
                                    <FontAwesomeIcon 
                                        icon={faArrowRight} 
                                        className="text-sm opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" 
                                    />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{link.title}</h3>
                                <p className="text-sm opacity-90 mb-3">{link.description}</p>
                                <div className="bg-white bg-opacity-20 rounded-lg px-3 py-1 text-xs font-semibold">
                                    {link.count}
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300"></div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                            Platform Statistics
                        </h3>
                        <p className="text-gray-600">
                            Current system overview and key metrics
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="space-y-2">
                            <div className="text-3xl md:text-4xl font-bold text-blue-600">1,247</div>
                            <div className="text-gray-600 font-medium">Total Students</div>
                            <div className="text-sm text-green-600">↑ 12% this month</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl md:text-4xl font-bold text-green-600">156</div>
                            <div className="text-gray-600 font-medium">Applications</div>
                            <div className="text-sm text-blue-600">23 pending review</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl md:text-4xl font-bold text-purple-600">89</div>
                            <div className="text-gray-600 font-medium">Complaints</div>
                            <div className="text-sm text-orange-600">3 urgent</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl md:text-4xl font-bold text-orange-600">98.5%</div>
                            <div className="text-gray-600 font-medium">System Uptime</div>
                            <div className="text-sm text-green-600">All systems operational</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity Section */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                            Recent Activity
                        </h3>
                        <p className="text-gray-600">
                            Latest actions and updates across the platform
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <FontAwesomeIcon icon={faUserGraduate} className="text-blue-600 text-sm" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">New Academic Registration</h4>
                                    <p className="text-sm text-gray-500">2 minutes ago</p>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm">Student ID: 2024001 submitted academic registration form</p>
                        </div>
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                    <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-600 text-sm" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">New Complaint</h4>
                                    <p className="text-sm text-gray-500">15 minutes ago</p>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm">Hostel maintenance issue reported in Block A</p>
                        </div>
                        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <FontAwesomeIcon icon={faClipboardCheck} className="text-green-600 text-sm" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800">Application Approved</h4>
                                    <p className="text-sm text-gray-500">1 hour ago</p>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm">Hostel registration for Student ID: 2024002 approved</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}