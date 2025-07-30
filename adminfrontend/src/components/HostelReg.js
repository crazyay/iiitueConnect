import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faHome, 
    faSearch, 
    faUser, 
    faEnvelope, 
    faCalendar, 
    faCheck, 
    faFilter,
    faSpinner,
    faClock,
    faFileAlt,
    faEye,
    faComment,
    faGraduationCap,
    faBuilding
} from '@fortawesome/free-solid-svg-icons';
const apiUrl = process.env.REACT_APP_API_BASE_URL;

export default function HostelReg(){
    const [data, setData] = useState([]);
    const [comments, setComments] = useState({}); 
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [isLoading, setIsLoading] = useState(true);
    const [processingIds, setProcessingIds] = useState(new Set());
    const fetchData = async () => {
      setIsLoading(true);
      try {  
        const response = await fetch(`${apiUrl}/hostel/hostelregistration`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        
        const fetchedData = await response.json();
        setData(fetchedData);
        setFilteredData(fetchedData);
        
        // Initialize comments object
        const initialComments = {};
        fetchedData.forEach((item) => {
          initialComments[item._id] = "";
        });
        setComments(initialComments);
        
        console.log(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch hostel registrations");
      } finally {
        setIsLoading(false);
      }
    };
  useEffect(() => {
    fetchData();
  },[]);
  const handleApprove = async (e, id) => {
    e.preventDefault();
    
    if (!comments[id]?.trim()) {
      toast.error("Please add an approval comment");
      return;
    }

    setProcessingIds(prev => new Set([...prev, id]));
    try {
      const response = await fetch(`${apiUrl}/hostel/hostelregistrationapproval/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: comments[id] }),
      });
      
      if (response.ok) {
        toast.success("Registration approved successfully!");
        setComments((prevComments) => ({
          ...prevComments,
          [id]: "",
        }));
        fetchData();
      } else {
        toast.error("Approval failed");
        throw new Error("Failed to approve registration");
      }
    } catch (error) {
      console.error("Error approving registration:", error);
      toast.error("Approval failed");
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };
  
  const handleCommentChange = (e, id) => {
    const { value } = e.target;
    setComments((prevComments) => ({
      ...prevComments,
      [id]: value,
    }));
  };

  // Filter data based on search term and status
  useEffect(() => {
    let filtered = data;
    
    if (searchTerm) {
      filtered = filtered.filter(item => {
        const batch = item.batch ? item.batch.toLowerCase() : '';
        const semester = item.semester ? item.semester.toLowerCase() : '';
        const branch = item.branch ? item.branch.toLowerCase() : '';
        const rollno = item.rollno && typeof item.rollno === 'string' ? item.rollno.toLowerCase() : '';
        const email = item.email ? item.email.toLowerCase() : '';
        const hostel = item.hostel ? item.hostel.toLowerCase() : '';
        
        return (
          batch.includes(searchTerm.toLowerCase()) ||
          semester.includes(searchTerm.toLowerCase()) ||
          branch.includes(searchTerm.toLowerCase()) ||
          rollno.includes(searchTerm.toLowerCase()) ||
          email.includes(searchTerm.toLowerCase()) ||
          hostel.includes(searchTerm.toLowerCase())
        );
      });
    }
    
    if (statusFilter !== "all") {
      filtered = filtered.filter(item => {
        if (statusFilter === "approved") return item.status === 'true';
        if (statusFilter === "pending") return item.status === 'false';
        return true;
      });
    }
    
    setFilteredData(filtered);
  }, [data, searchTerm, statusFilter]);

  const getStats = () => {
    const total = data.length;
    const approved = data.filter(item => item.status === 'true').length;
    const pending = total - approved;
    return { total, approved, pending };
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
                <FontAwesomeIcon icon={faHome} className="text-2xl" />
              </div>
              <h1 className="text-4xl font-bold">Hostel Registration Management</h1>
            </div>
            <p className="text-xl text-blue-100 mb-8">
              Review and approve student hostel registration applications
            </p>
            
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2">{stats.total}</div>
                <div className="text-blue-100">Total Registrations</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2 text-green-300">{stats.approved}</div>
                <div className="text-blue-100">Approved</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2 text-yellow-300">{stats.pending}</div>
                <div className="text-blue-100">Pending Approval</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
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
                placeholder="Search by roll number, batch, semester, branch, email, or hostel..."
              />
            </div>
            
            {/* Status Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faFilter} className="text-gray-400" />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
              >
                <option value="all">All Registrations</option>
                <option value="pending">Pending Approval</option>
                <option value="approved">Approved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Registrations Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <FontAwesomeIcon icon={faSpinner} className="text-4xl text-blue-600 animate-spin mb-4" />
              <p className="text-gray-600">Loading registrations...</p>
            </div>
          </div>
        ) : filteredData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item) => (
              <RegistrationCard 
                key={item._id} 
                registration={item} 
                comments={comments}
                onCommentChange={handleCommentChange}
                onApprove={handleApprove}
                isProcessing={processingIds.has(item._id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faHome} className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {searchTerm || statusFilter !== "all" ? "No matching registrations" : "No registrations found"}
            </h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== "all" 
                ? "Try adjusting your search or filter criteria" 
                : "No hostel registrations have been submitted yet"}
            </p>
          </div>
        )}
      </div>
    </div>    
    
  );
}

// Registration Card Component
function RegistrationCard({ registration, comments, onCommentChange, onApprove, isProcessing }) {
  const isApproved = registration.status === 'true';

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Card Header */}
      <div className={`bg-gradient-to-r ${
        isApproved ? 'from-green-500 to-green-600' : 'from-orange-500 to-orange-600'
      } text-white p-4`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faUser} className="text-sm" />
            <span className="text-sm font-semibold">Student Registration</span>
          </div>
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faCalendar} className="text-sm" />
            <span className="text-sm">{new Date(registration.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">{registration.rollno}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            isApproved 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {isApproved ? 'Approved' : 'Pending'}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-1 flex items-center space-x-2">
                <FontAwesomeIcon icon={faGraduationCap} className="text-sm text-gray-500" />
                <span>Batch</span>
              </h4>
              <p className="text-gray-600">{registration.batch}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Semester</h4>
              <p className="text-gray-600">{registration.semester}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-1 flex items-center space-x-2">
              <FontAwesomeIcon icon={faBuilding} className="text-sm text-gray-500" />
              <span>Hostel</span>
            </h4>
            <p className="text-gray-600">{registration.hostel}</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-1 flex items-center space-x-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-sm text-gray-500" />
              <span>Email</span>
            </h4>
            <p className="text-gray-600 text-sm">{registration.email}</p>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faClock} />
              <span>Submitted: {new Date(registration.createdAt).toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          {/* View Receipt Button */}
          <div className="mb-4">
            <Link
              to={registration.feepdf}
              target="_blank"
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faEye} />
              <span>View Receipt</span>
            </Link>
          </div>
          
          {/* Approval Section */}
          {!isApproved ? (
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faComment} className="text-gray-400" />
                </div>
                <textarea
                  value={comments[registration._id] || ''}
                  onChange={(e) => onCommentChange(e, registration._id)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                  placeholder="Add approval comment..."
                  rows={3}
                />
              </div>
              
              <button
                onClick={(e) => onApprove(e, registration._id)}
                disabled={isProcessing || !comments[registration._id]?.trim()}
                className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                  isProcessing || !comments[registration._id]?.trim()
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transform hover:scale-105 shadow-lg hover:shadow-xl'
                }`}
              >
                {isProcessing ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                    <span>Approving...</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCheck} />
                    <span>Approve Registration</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2 text-green-600 bg-green-50 py-3 rounded-lg">
              <FontAwesomeIcon icon={faCheck} className="text-lg" />
              <span className="font-semibold">Registration Approved</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
