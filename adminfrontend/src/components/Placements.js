import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faBriefcase, 
    faSearch, 
    faUser, 
    faBuilding, 
    faDollarSign, 
    faCalendar, 
    faFilter,
    faSpinner,
    faPlus,
    faEdit,
    faTrash,
    faEye,
    faGraduationCap,
    faMapMarkerAlt,
    faTrophy
} from '@fortawesome/free-solid-svg-icons';

const PlacementList = ({ placements = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlacement, setSelectedPlacement] = useState(null);
  
  // Sample placement data if none provided
  const defaultPlacements = [
    {
      id: 1,
      studentName: "Rahul Sharma",
      rollNumber: "21BCS001",
      company: "Google",
      position: "Software Engineer",
      package: "₹25,00,000",
      location: "Bangalore",
      year: "2024",
      branch: "Computer Science",
      cgpa: "9.2",
      placementDate: "2024-02-15",
      logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      studentName: "Priya Patel",
      rollNumber: "21BCS002",
      company: "Microsoft",
      position: "Software Development Engineer",
      package: "₹22,00,000",
      location: "Hyderabad",
      year: "2024",
      branch: "Computer Science",
      cgpa: "9.0",
      placementDate: "2024-02-20",
      logo: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      studentName: "Amit Kumar",
      rollNumber: "21BCS003",
      company: "Amazon",
      position: "SDE-1",
      package: "₹20,00,000",
      location: "Chennai",
      year: "2024",
      branch: "Computer Science",
      cgpa: "8.8",
      placementDate: "2024-03-01",
      logo: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      studentName: "Sneha Singh",
      rollNumber: "21BEC001",
      company: "TCS",
      position: "Systems Engineer",
      package: "₹3,50,000",
      location: "Mumbai",
      year: "2024",
      branch: "Electronics",
      cgpa: "8.5",
      placementDate: "2024-03-10",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 5,
      studentName: "Vikash Gupta",
      rollNumber: "21BME001",
      company: "Infosys",
      position: "Technology Analyst",
      package: "₹4,00,000",
      location: "Pune",
      year: "2024",
      branch: "Mechanical",
      cgpa: "8.3",
      placementDate: "2024-03-15",
      logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 6,
      studentName: "Anita Verma",
      rollNumber: "21BCS004",
      company: "Wipro",
      position: "Project Engineer",
      package: "₹3,80,000",
      location: "Noida",
      year: "2024",
      branch: "Computer Science",
      cgpa: "8.7",
      placementDate: "2024-03-20",
      logo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];
  
  const placementData = placements.length > 0 ? placements : defaultPlacements;
  const [filteredPlacements, setFilteredPlacements] = useState(placementData);

  // Filter placements based on search term, company, and year
  useEffect(() => {
    let filtered = placementData;
    
    if (searchTerm) {
      filtered = filtered.filter(placement => 
        placement.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        placement.rollNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        placement.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        placement.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        placement.branch?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCompany !== "all") {
      filtered = filtered.filter(placement => placement.company === selectedCompany);
    }
    
    if (selectedYear !== "all") {
      filtered = filtered.filter(placement => placement.year === selectedYear);
    }
    
    setFilteredPlacements(filtered);
  }, [placementData, searchTerm, selectedCompany, selectedYear]);

  const getUniqueCompanies = () => {
    return [...new Set(placementData.map(p => p.company))];
  };

  const getUniqueYears = () => {
    return [...new Set(placementData.map(p => p.year))];
  };

  const getStats = () => {
    const total = placementData.length;
    const companies = getUniqueCompanies().length;
    const avgPackage = placementData.reduce((sum, p) => {
      const packageValue = parseFloat(p.package.replace(/[₹,]/g, ''));
      return sum + packageValue;
    }, 0) / total;
    const highestPackage = Math.max(...placementData.map(p => parseFloat(p.package.replace(/[₹,]/g, ''))));
    
    return { total, companies, avgPackage, highestPackage };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faBriefcase} className="text-2xl" />
              </div>
              <h1 className="text-4xl font-bold">Placement Management</h1>
            </div>
            <p className="text-xl text-blue-100 mb-8">
              Manage student placements and track recruitment statistics
            </p>
            
            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold mb-1">{stats.total}</div>
                <div className="text-blue-100 text-sm">Total Placements</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold mb-1">{stats.companies}</div>
                <div className="text-blue-100 text-sm">Companies</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold mb-1">₹{(stats.avgPackage / 100000).toFixed(1)}L</div>
                <div className="text-blue-100 text-sm">Avg Package</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold mb-1">₹{(stats.highestPackage / 100000).toFixed(1)}L</div>
                <div className="text-blue-100 text-sm">Highest Package</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Search by student name, roll number, company, position, or branch..."
              />
            </div>
            
            {/* Company Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faBuilding} className="text-gray-400" />
              </div>
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
              >
                <option value="all">All Companies</option>
                {getUniqueCompanies().map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
            </div>
            
            {/* Year Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faCalendar} className="text-gray-400" />
              </div>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
              >
                <option value="all">All Years</option>
                {getUniqueYears().map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            
            {/* Add Placement Button */}
            <button className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105 shadow-lg">
              <FontAwesomeIcon icon={faPlus} />
              <span>Add Placement</span>
            </button>
          </div>
        </div>

        {/* Placements Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <FontAwesomeIcon icon={faSpinner} className="text-4xl text-blue-600 animate-spin mb-4" />
              <p className="text-gray-600">Loading placements...</p>
            </div>
          </div>
        ) : filteredPlacements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlacements.map((placement) => (
              <PlacementCard 
                key={placement.id} 
                placement={placement} 
                onView={() => setSelectedPlacement(placement)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faBriefcase} className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {searchTerm || selectedCompany !== "all" || selectedYear !== "all" ? "No matching placements" : "No placements found"}
            </h3>
            <p className="text-gray-600">
              {searchTerm || selectedCompany !== "all" || selectedYear !== "all" 
                ? "Try adjusting your search or filter criteria" 
                : "No placement records have been added yet"}
            </p>
          </div>
        )}
      </div>

      {/* Placement Detail Modal */}
      {selectedPlacement && (
        <PlacementModal 
          placement={selectedPlacement} 
          onClose={() => setSelectedPlacement(null)}
        />
      )}
    </div>
  );
};

// Placement Card Component
function PlacementCard({ placement, onView }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getPackageColor = (packageStr) => {
    const packageValue = parseFloat(packageStr.replace(/[₹,]/g, ''));
    if (packageValue >= 1000000) return 'from-green-500 to-green-600';
    if (packageValue >= 500000) return 'from-blue-500 to-blue-600';
    return 'from-orange-500 to-orange-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Card Header */}
      <div className={`bg-gradient-to-r ${getPackageColor(placement.package)} text-white p-4`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faTrophy} className="text-sm" />
            <span className="text-sm font-semibold">Placement Success</span>
          </div>
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faCalendar} className="text-sm" />
            <span className="text-sm">{placement.year}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">{placement.studentName}</h3>
          <span className="text-sm bg-white bg-opacity-20 px-2 py-1 rounded-full">
            {placement.rollNumber}
          </span>
        </div>
      </div>

      {/* Company Logo */}
      <div className="relative h-32 overflow-hidden bg-gray-100">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <FontAwesomeIcon icon={faSpinner} className="text-2xl text-gray-400 animate-spin" />
          </div>
        )}
        
        {imageError ? (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <FontAwesomeIcon icon={faBuilding} className="text-4xl text-gray-400" />
          </div>
        ) : (
          <img 
            src={placement.logo} 
            alt={placement.company}
            className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
        
        {/* Company Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
          <h4 className="text-white font-bold text-lg">{placement.company}</h4>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <div className="space-y-3">
          <div>
            <h5 className="font-semibold text-gray-800 mb-1">Position</h5>
            <p className="text-gray-600">{placement.position}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h5 className="font-semibold text-gray-800 mb-1 flex items-center space-x-1">
                <FontAwesomeIcon icon={faDollarSign} className="text-sm text-gray-500" />
                <span>Package</span>
              </h5>
              <p className="text-gray-600 font-bold">{placement.package}</p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-800 mb-1 flex items-center space-x-1">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-sm text-gray-500" />
                <span>Location</span>
              </h5>
              <p className="text-gray-600">{placement.location}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h5 className="font-semibold text-gray-800 mb-1 flex items-center space-x-1">
                <FontAwesomeIcon icon={faGraduationCap} className="text-sm text-gray-500" />
                <span>Branch</span>
              </h5>
              <p className="text-gray-600 text-sm">{placement.branch}</p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-800 mb-1">CGPA</h5>
              <p className="text-gray-600 font-semibold">{placement.cgpa}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <button
              onClick={onView}
              className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faEye} className="text-sm" />
              <span>View Details</span>
            </button>
            <button className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200">
              <FontAwesomeIcon icon={faEdit} className="text-sm" />
            </button>
            <button className="flex items-center justify-center space-x-2 bg-red-100 text-red-600 py-2 px-4 rounded-lg hover:bg-red-200 transition-colors duration-200">
              <FontAwesomeIcon icon={faTrash} className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Placement Detail Modal Component
function PlacementModal({ placement, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className={`bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex items-center justify-between`}>
          <div>
            <h2 className="text-2xl font-bold">{placement.studentName}</h2>
            <p className="text-blue-100">{placement.rollNumber} • {placement.branch}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors duration-200 text-2xl"
          >
            ×
          </button>
        </div>
        
        {/* Modal Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Company Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-semibold text-gray-600">Company</label>
                  <p className="text-gray-800">{placement.company}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Position</label>
                  <p className="text-gray-800">{placement.position}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Package</label>
                  <p className="text-gray-800 font-bold text-lg text-green-600">{placement.package}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Location</label>
                  <p className="text-gray-800">{placement.location}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Placement Date</label>
                  <p className="text-gray-800">{new Date(placement.placementDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            {/* Student Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Student Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-semibold text-gray-600">Name</label>
                  <p className="text-gray-800">{placement.studentName}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Roll Number</label>
                  <p className="text-gray-800">{placement.rollNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Branch</label>
                  <p className="text-gray-800">{placement.branch}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">CGPA</label>
                  <p className="text-gray-800 font-semibold">{placement.cgpa}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Graduation Year</label>
                  <p className="text-gray-800">{placement.year}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Company Logo */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Company Logo</h3>
            <div className="flex justify-center">
              <img 
                src={placement.logo} 
                alt={placement.company}
                className="max-w-xs max-h-32 object-contain rounded-lg shadow-md"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden w-32 h-32 bg-gray-100 rounded-lg items-center justify-center">
                <FontAwesomeIcon icon={faBuilding} className="text-4xl text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Close
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Edit Placement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlacementList;
