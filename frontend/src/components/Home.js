import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faUserGraduate, 
    faDollarSign, 
    faFileAlt, 
    faExclamationTriangle, 
    faBriefcase, 
    faNewspaper, 
    faImages,
    faArrowRight
} from '@fortawesome/free-solid-svg-icons'
import "./home.css"

export default function Home() {
    const quickLinks = [
        {
            title: "Registration",
            description: "Academic & Hostel Registration",
            icon: faUserGraduate,
            path: "/Registration",
            color: "from-blue-500 to-blue-600",
            hoverColor: "hover:from-blue-600 hover:to-blue-700"
        },
        {
            title: "Fees",
            description: "Fee Payment & Details",
            icon: faDollarSign,
            path: "/Fees",
            color: "from-green-500 to-green-600",
            hoverColor: "hover:from-green-600 hover:to-green-700"
        },
        {
            title: "Application",
            description: "Submit Applications",
            icon: faFileAlt,
            path: "/application",
            color: "from-purple-500 to-purple-600",
            hoverColor: "hover:from-purple-600 hover:to-purple-700"
        },
        {
            title: "Complaint",
            description: "Lodge Complaints",
            icon: faExclamationTriangle,
            path: "/Complaint",
            color: "from-red-500 to-red-600",
            hoverColor: "hover:from-red-600 hover:to-red-700"
        },
        {
            title: "Placements",
            description: "Career Opportunities",
            icon: faBriefcase,
            path: "/Placements",
            color: "from-indigo-500 to-indigo-600",
            hoverColor: "hover:from-indigo-600 hover:to-indigo-700"
        },
        {
            title: "News",
            description: "Latest Updates",
            icon: faNewspaper,
            path: "/News",
            color: "from-orange-500 to-orange-600",
            hoverColor: "hover:from-orange-600 hover:to-orange-700"
        },
        {
            title: "Gallery",
            description: "Campus Photos",
            icon: faImages,
            path: "/gallery",
            color: "from-pink-500 to-pink-600",
            hoverColor: "hover:from-pink-600 hover:to-pink-700"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Hero Section */}
            <div className="relative img">
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="relative z-10 flex flex-col justify-center items-center h-96 text-center px-4">
                    <h1 className="text-4xl md:text-6xl text-white font-bold tracking-wider mb-4" 
                        style={{textShadow: "2px 2px 8px rgba(0,0,0,0.7)"}}>
                        WELCOME TO IIITU
                    </h1>
                    <p className="text-xl md:text-2xl text-white font-medium opacity-90 mb-8"
                       style={{textShadow: "1px 1px 4px rgba(0,0,0,0.7)"}}>
                        Your Gateway to Academic Excellence
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link 
                            to="/Registration" 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2"
                        >
                            <span>Get Started</span>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                        <Link 
                            to="/News" 
                            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-2 border-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
                        >
                            Latest News
                        </Link>
                    </div>
                </div>
            </div>

            {/* Quick Links Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Quick Access
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Access all essential services and information through our streamlined portal
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {quickLinks.map((link, index) => (
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
                                <p className="text-sm opacity-90">{link.description}</p>
                            </div>
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300"></div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="space-y-2">
                            <div className="text-3xl md:text-4xl font-bold text-blue-600">1000+</div>
                            <div className="text-gray-600 font-medium">Students</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl md:text-4xl font-bold text-green-600">50+</div>
                            <div className="text-gray-600 font-medium">Faculty</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl md:text-4xl font-bold text-purple-600">10+</div>
                            <div className="text-gray-600 font-medium">Departments</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl md:text-4xl font-bold text-orange-600">95%</div>
                            <div className="text-gray-600 font-medium">Placement Rate</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}