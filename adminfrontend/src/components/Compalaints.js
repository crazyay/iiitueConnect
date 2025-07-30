import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faExclamationTriangle, 
    faSearch, 
    faUser, 
    faEnvelope, 
    faPhone, 
    faComment, 
    faCheck, 
    faFilter,
    faSpinner,
    faClock,
    faTools
} from '@fortawesome/free-solid-svg-icons';
const apiUrl = process.env.REACT_APP_API_BASE_URL;

export default function Complaint(){
  const { page } = useParams();
  const [complaint, setComplaint] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [comments, setComments] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState(new Set());  
    const fetchData = async () => {
      setIsLoading(true);
      try {  
        const response = await fetch(`${apiUrl}/hostel/Complaint/${page}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setComplaint(data);
        setFilteredComplaints(data);
        
        // Initialize comments object
        const initialComments = {};
        data.forEach((comp) => {
          initialComments[comp._id] = "";
        });
        setComments(initialComments);
        
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch complaints");
      } finally {
        setIsLoading(false);
      }
    };
    const handleApprove = async (e, id) => {
      e.preventDefault();
      
      if (!comments[id]?.trim()) {
        toast.error("Please add a resolution comment");
        return;
      }

      setProcessingIds(prev => new Set([...prev, id]));
      try {
        const response = await fetch(`${apiUrl}/hostel/resolve-complaint/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment: comments[id] }),
        });
        
        if (response.ok) {
          toast.success("Complaint resolved successfully!");
          fetchData();
        } else {
          toast.error("Complaint resolution failed");
          throw new Error("Failed to resolve complaint");
        }
      } catch (error) {
        toast.error("Complaint resolution failed");
        console.error("Error resolving complaint:", error);
      } finally {
        setProcessingIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }
    };


  useEffect(() => {
   
    fetchData();
  
  },[page]);

   const handleCommentChange = (e, id) => {
    const { value } = e.target;
    setComments({ ...comments, [id]: value });
   };

   // Filter complaints based on search term and status
   useEffect(() => {
    let filtered = complaint;
    
    if (searchTerm) {
      filtered = filtered.filter(comp => 
        comp.rollno?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comp.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comp.complaintdesc?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comp.phone?.includes(searchTerm)
      );
    }
    
    if (statusFilter !== "all") {
      filtered = filtered.filter(comp => {
        if (statusFilter === "resolved") return comp.resolved;
        if (statusFilter === "pending") return !comp.resolved;
        return true;
      });
    }
    
    setFilteredComplaints(filtered);
  }, [complaint, searchTerm, statusFilter]);

  const getStats = () => {
    const total = complaint.length;
    const resolved = complaint.filter(comp => comp.resolved).length;
    const pending = total - resolved;
    return { total, resolved, pending };
  };

  const stats = getStats();

  const getComplaintTypeIcon = (type) => {
    switch(type?.toLowerCase()) {
      case 'civil': return faTools;
      case 'electrical': return faTools;
      case 'wifi': return faTools;
      default: return faExclamationTriangle;
    }
  };

  const getComplaintTypeColor = (type) => {
    switch(type?.toLowerCase()) {
      case 'civil': return 'from-orange-500 to-orange-600';
      case 'electrical': return 'from-yellow-500 to-yellow-600';
      case 'wifi': return 'from-red-500 to-red-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-2xl" />
              </div>
              <h1 className="text-4xl font-bold">{page} Complaints Management</h1>
            </div>
            <p className="text-xl text-blue-100 mb-8">
              Review and resolve {page.toLowerCase()} complaints from students
            </p>
            
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2">{stats.total}</div>
                <div className="text-blue-100">Total Complaints</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2 text-green-300">{stats.resolved}</div>
                <div className="text-blue-100">Resolved</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2 text-yellow-300">{stats.pending}</div>
                <div className="text-blue-100">Pending Resolution</div>
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
                placeholder="Search by roll number, name, email, phone, or complaint..."
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
                <option value="all">All Complaints</option>
                <option value="pending">Pending Resolution</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Complaints Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <FontAwesomeIcon icon={faSpinner} className="text-4xl text-blue-600 animate-spin mb-4" />
              <p className="text-gray-600">Loading complaints...</p>
            </div>
          </div>
        ) : filteredComplaints.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComplaints.map((item, index) => (
              <div key={item._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                {/* Card Header */}
                <div className={`bg-gradient-to-r ${getComplaintTypeColor(page)} text-white p-4`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <FontAwesomeIcon icon={getComplaintTypeIcon(page)} className="text-sm" />
                      <span className="text-sm font-semibold">{page} Issue</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FontAwesomeIcon icon={faClock} className="text-sm" />
                      <span className="text-sm">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold flex items-center space-x-2">
                      <FontAwesomeIcon icon={faUser} />
                      <span>{item.rollno}</span>
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      item.resolved 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.resolved ? 'Resolved' : 'Pending'}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Student Name:</h4>
                      <p className="text-gray-600">{item.name}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Complaint Description:</h4>
                      <div className="max-h-32 overflow-y-auto bg-gray-50 rounded-lg p-3">
                        <p className="text-gray-600 text-sm">{item.complaintdesc}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <FontAwesomeIcon icon={faEnvelope} className="text-sm" />
                        <span className="text-sm">{item.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <FontAwesomeIcon icon={faPhone} className="text-sm" />
                        <span className="text-sm">{item.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Resolution Section */}
                  {!item.resolved && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="space-y-3">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FontAwesomeIcon icon={faComment} className="text-gray-400" />
                          </div>
                          <textarea
                            value={comments[item._id] || ''}
                            onChange={(e) => handleCommentChange(e, item._id)}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                            placeholder="Add resolution comment..."
                            rows={3}
                          />
                        </div>
                        
                        <button
                          onClick={(e) => handleApprove(e, item._id)}
                          disabled={processingIds.has(item._id) || !comments[item._id]?.trim()}
                          className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                            processingIds.has(item._id) || !comments[item._id]?.trim()
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transform hover:scale-105 shadow-lg hover:shadow-xl'
                          }`}
                        >
                          {processingIds.has(item._id) ? (
                            <>
                              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                              <span>Resolving...</span>
                            </>
                          ) : (
                            <>
                              <FontAwesomeIcon icon={faCheck} />
                              <span>Resolve Complaint</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Resolved Status */}
                  {item.resolved && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex items-center justify-center space-x-2 text-green-600">
                        <FontAwesomeIcon icon={faCheck} className="text-lg" />
                        <span className="font-semibold">Complaint Resolved</span>
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
              <FontAwesomeIcon icon={faExclamationTriangle} className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {searchTerm || statusFilter !== "all" ? "No matching complaints" : "No complaints found"}
            </h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== "all" 
                ? "Try adjusting your search or filter criteria" 
                : `No ${page.toLowerCase()} complaints have been submitted yet`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
