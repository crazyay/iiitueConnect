import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faFileAlt, 
    faSearch, 
    faCalendarAlt, 
    faClock, 
    faUser, 
    faEnvelope, 
    faComment, 
    faCheck, 
    faFilter,
    faSpinner
} from '@fortawesome/free-solid-svg-icons';
const apiUrl = process.env.REACT_APP_API_BASE_URL;

export default function Application() {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [comments, setComments] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState(new Set());
  const refMessage = useRef();
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/academic/application`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setApplications(data);
      setFilteredApplications(data);
      // Initialize comments object with empty strings for each application ID
      const initialComments = {};
      data.forEach((app) => {
        initialComments[app._id] = "";
      });
      setComments(initialComments);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch applications");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

 

  

  const handleApprove = async (e, id) => {
    e.preventDefault();
    
    if (!comments[id]?.trim()) {
      toast.error("Please add a comment before approving");
      return;
    }

    setProcessingIds(prev => new Set([...prev, id]));
    try {
      const response = await fetch(`${apiUrl}/academic/approve-application/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: comments[id] }),
      });
      
      if (response.ok) {
        toast.success("Application approved successfully!");
        fetchData();
      } else {
        toast.error("Verification failed!");
        throw new Error("Failed to approve application");
      }
    } catch (error) {
      console.error("Error approving application:", error);
      toast.error("Failed to approve application");
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
    setComments({ ...comments, [id]: value });
  };

  // Filter applications based on search term and status
  useEffect(() => {
    let filtered = applications;
    
    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.rollno?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== "all") {
      filtered = filtered.filter(app => {
        if (statusFilter === "approved") return app.approved;
        if (statusFilter === "pending") return !app.approved;
        return true;
      });
    }
    
    setFilteredApplications(filtered);
  }, [applications, searchTerm, statusFilter]);

  const getStats = () => {
    const total = applications.length;
    const approved = applications.filter(app => app.approved).length;
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
                <FontAwesomeIcon icon={faFileAlt} className="text-2xl" />
              </div>
              <h1 className="text-4xl font-bold">Application Management</h1>
            </div>
            <p className="text-xl text-blue-100 mb-8">
              Review and manage student applications
            </p>
            
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2">{stats.total}</div>
                <div className="text-blue-100">Total Applications</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2 text-green-300">{stats.approved}</div>
                <div className="text-blue-100">Approved</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2 text-yellow-300">{stats.pending}</div>
                <div className="text-blue-100">Pending Review</div>
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
                placeholder="Search by roll number, subject, email, or message..."
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
                <option value="all">All Applications</option>
                <option value="pending">Pending Review</option>
                <option value="approved">Approved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applications Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <FontAwesomeIcon icon={faSpinner} className="text-4xl text-blue-600 animate-spin mb-4" />
              <p className="text-gray-600">Loading applications...</p>
            </div>
          </div>
        ) : filteredApplications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApplications.map((app) => (
              <div key={app._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                      <FontAwesomeIcon icon={faCalendarAlt} className="text-sm" />
                      <span className="text-sm">{new Date(app.createdAt).toDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FontAwesomeIcon icon={faClock} className="text-sm" />
                      <span className="text-sm">{new Date(app.createdAt).toLocaleTimeString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold flex items-center space-x-2">
                      <FontAwesomeIcon icon={faUser} />
                      <span>{app.rollno}</span>
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      app.approved 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {app.approved ? 'Approved' : 'Pending'}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Subject:</h4>
                      <p className="text-gray-600">{app.subject}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Message:</h4>
                      <div className="max-h-32 overflow-y-auto bg-gray-50 rounded-lg p-3">
                        <p className="text-gray-600 text-sm">{app.message}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-gray-600">
                      <FontAwesomeIcon icon={faEnvelope} className="text-sm" />
                      <span className="text-sm">{app.email}</span>
                    </div>
                  </div>

                  {/* Approval Section */}
                  {!app.approved && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="space-y-3">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FontAwesomeIcon icon={faComment} className="text-gray-400" />
                          </div>
                          <textarea
                            value={comments[app._id] || ''}
                            onChange={(e) => handleCommentChange(e, app._id)}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                            placeholder="Add approval comment..."
                            rows={3}
                          />
                        </div>
                        
                        <button
                          onClick={(e) => handleApprove(e, app._id)}
                          disabled={processingIds.has(app._id) || !comments[app._id]?.trim()}
                          className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                            processingIds.has(app._id) || !comments[app._id]?.trim()
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transform hover:scale-105 shadow-lg hover:shadow-xl'
                          }`}
                        >
                          {processingIds.has(app._id) ? (
                            <>
                              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                              <span>Processing...</span>
                            </>
                          ) : (
                            <>
                              <FontAwesomeIcon icon={faCheck} />
                              <span>Approve Application</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Approved Status */}
                  {app.approved && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex items-center justify-center space-x-2 text-green-600">
                        <FontAwesomeIcon icon={faCheck} className="text-lg" />
                        <span className="font-semibold">Application Approved</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faFileAlt} className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {searchTerm || statusFilter !== "all" ? "No matching applications" : "No applications found"}
            </h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== "all" 
                ? "Try adjusting your search or filter criteria" 
                : "Applications will appear here when students submit them"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
