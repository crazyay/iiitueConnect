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
    faSpinner,
    faClock,
    faTools,
    faChevronLeft,
    faChevronRight
} from '@fortawesome/free-solid-svg-icons';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

export default function Complaint() {
    const { page } = useParams();
    const [complaints, setComplaints] = useState([]);
    const [comments, setComments] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [isLoading, setIsLoading] = useState(true);
    const [processingIds, setProcessingIds] = useState(new Set());
    
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10
    });

    // Fetch complaints with pagination
    const fetchComplaints = async (pageNumber = 1) => {
        setIsLoading(true);
        try {
            // The backend expects the complaint type as a URL parameter and pagination as query params
            const url = `${apiUrl}/hostel/Complaint/${page || 'all'}?page=${pageNumber}&limit=${pagination.itemsPerPage}${statusFilter && statusFilter !== 'all' ? `&status=${encodeURIComponent(statusFilter)}` : ''}${searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ''}`;
            console.log('Fetching complaints from:', url);
            
            const response = await fetch(url, {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            });
            
            console.log('Response status:', response.status);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`Failed to fetch complaints: ${response.status} ${response.statusText}`);
            }
            
            const responseData = await response.json();
            console.log('Complaints response data:', responseData);
            
            if (!responseData || !responseData.success || !Array.isArray(responseData.data)) {
                console.error('Invalid response format or error from server:', responseData);
                throw new Error(responseData?.error || 'Invalid response format from server');
            }
            
            const { data, pagination: paginationData } = responseData;
            
            setComplaints(Array.isArray(data) ? data : []);
            
            if (paginationData) {
                setPagination(prev => ({
                    ...prev,
                    currentPage: parseInt(paginationData.currentPage) || 1,
                    totalPages: paginationData.totalPages || 1,
                    totalItems: paginationData.totalItems || 0,
                    itemsPerPage: paginationData.itemsPerPage || 10
                }));
            }
            
            // Initialize comments
            const initialComments = {};
            data.forEach(comp => {
                initialComments[comp._id] = "";
            });
            setComments(initialComments);
            
        } catch (error) {
            console.error("Error fetching complaints:", error);
            toast.error("Failed to load complaints");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            fetchComplaints(newPage);
        }
    };

    // Handle complaint resolution
    const handleResolve = async (e, id) => {
        e.preventDefault();
        
        if (!comments[id]?.trim()) {
            toast.error("Please add a resolution comment");
            return;
        }

        setProcessingIds(prev => new Set([...prev, id]));
        
        try {
            const response = await fetch(`${apiUrl}/hostel/resolve-complaint/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ comment: comments[id] })
            });
            
            if (response.ok) {
                toast.success("Complaint resolved successfully!");
                fetchComplaints(pagination.currentPage);
            } else {
                throw new Error("Failed to resolve complaint");
            }
        } catch (error) {
            console.error("Error resolving complaint:", error);
            toast.error("Failed to resolve complaint");
        } finally {
            setProcessingIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });
        }
    };

    // Handle comment change
    const handleCommentChange = (e, id) => {
        setComments(prev => ({
            ...prev,
            [id]: e.target.value
        }));
    };

    // Filter complaints based on search and status
    const filteredComplaints = Array.isArray(complaints) ? complaints.filter(complaint => {
        if (!complaint) return false;
        
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = searchTerm === "" || 
            (complaint.name?.toLowerCase()?.includes(searchLower) ||
            complaint.rollno?.toLowerCase()?.includes(searchLower) ||
            complaint.subject?.toLowerCase()?.includes(searchLower) ||
            complaint.description?.toLowerCase()?.includes(searchLower));
            
        const matchesStatus = statusFilter === "all" ||
            (statusFilter === "resolved" && complaint.resolved) ||
            (statusFilter === "pending" && !complaint.resolved);
            
        return matchesSearch && matchesStatus;
    }) : [];

    // Get statistics
    const stats = {
        total: complaints.length,
        resolved: complaints.filter(comp => comp.resolved).length,
        pending: complaints.filter(comp => !comp.resolved).length
    };

    // Initial data fetch
    useEffect(() => {
        fetchComplaints(1);
    }, [page, pagination.itemsPerPage, statusFilter, searchTerm]);

    // Render pagination controls
    const renderPagination = () => {
        const pages = [];
        const maxPages = 5;
        let startPage = Math.max(1, pagination.currentPage - Math.floor(maxPages / 2));
        let endPage = Math.min(pagination.totalPages, startPage + maxPages - 1);
        
        if (endPage - startPage + 1 < maxPages) {
            startPage = Math.max(1, endPage - maxPages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-3 py-1 rounded ${
                        pagination.currentPage === i
                            ? 'bg-blue-600 text-white'
                            : 'bg-white hover:bg-gray-100'
                    }`}
                >
                    {i}
                </button>
            );
        }

        return (
            <div className="flex justify-center items-center gap-2 mt-6">
                <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className="px-3 py-1 bg-white rounded disabled:opacity-50"
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                
                {startPage > 1 && (
                    <>
                        <button
                            onClick={() => handlePageChange(1)}
                            className="px-3 py-1 bg-white rounded"
                        >
                            1
                        </button>
                        {startPage > 2 && <span>...</span>}
                    </>
                )}
                
                {pages}
                
                {endPage < pagination.totalPages && (
                    <>
                        {endPage < pagination.totalPages - 1 && <span>...</span>}
                        <button
                            onClick={() => handlePageChange(pagination.totalPages)}
                            className="px-3 py-1 bg-white rounded"
                        >
                            {pagination.totalPages}
                        </button>
                    </>
                )}
                
                <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className="px-3 py-1 bg-white rounded disabled:opacity-50"
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
                
                <div className="ml-4 text-sm text-gray-600">
                    Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to {
                        Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)
                    } of {pagination.totalItems} complaints
                </div>
                
                <select
                    value={pagination.itemsPerPage}
                    onChange={(e) => {
                        setPagination(prev => ({
                            ...prev,
                            itemsPerPage: parseInt(e.target.value),
                            currentPage: 1
                        }));
                    }}
                    className="ml-4 px-2 py-1 border rounded"
                >
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                    <option value={50}>50 per page</option>
                </select>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        {page} Complaints
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Manage and resolve {page.toLowerCase()} complaints
                    </p>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-blue-700">
                                {stats.total}
                            </div>
                            <div className="text-sm text-gray-600">Total Complaints</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-green-700">
                                {stats.resolved}
                            </div>
                            <div className="text-sm text-gray-600">Resolved</div>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-yellow-700">
                                {stats.pending}
                            </div>
                            <div className="text-sm text-gray-600">Pending</div>
                        </div>
                    </div>
                    
                    {/* Search and Filter */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search complaints..."
                                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select
                            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="resolved">Resolved</option>
                        </select>
                    </div>
                </div>
                
                {/* Complaints List */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <FontAwesomeIcon icon={faSpinner} spin className="text-3xl text-blue-500" />
                    </div>
                ) : filteredComplaints.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <FontAwesomeIcon 
                            icon={faExclamationTriangle} 
                            className="text-yellow-400 text-4xl mb-4" 
                        />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No complaints found
                        </h3>
                        <p className="text-gray-500">
                            {searchTerm || statusFilter !== 'all' 
                                ? 'Try adjusting your search or filter criteria.'
                                : 'There are no complaints to display at this time.'}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredComplaints.map(complaint => (
                            <div key={complaint._id} className="bg-white rounded-lg shadow overflow-hidden">
                                <div className={`p-4 ${
                                    complaint.resolved 
                                        ? 'bg-green-50 border-l-4 border-green-500' 
                                        : 'bg-yellow-50 border-l-4 border-yellow-500'
                                }`}>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium text-gray-900">
                                                {complaint.name} ({complaint.rollno})
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {complaint.email} • {complaint.phone}
                                            </p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                                            complaint.resolved 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {complaint.resolved ? 'Resolved' : 'Pending'}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="p-4 border-t">
                                    <p className="text-gray-700 mb-4">
                                        {complaint.complaintdesc}
                                    </p>
                                    
                                    {!complaint.resolved && (
                                        <div className="mt-4 pt-4 border-t">
                                            <label htmlFor={`comment-${complaint._id}`} className="block text-sm font-medium text-gray-700 mb-2">
                                                Resolution Notes
                                            </label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    id={`comment-${complaint._id}`}
                                                    value={comments[complaint._id] || ''}
                                                    onChange={(e) => handleCommentChange(e, complaint._id)}
                                                    className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="Add resolution notes..."
                                                />
                                                <button
                                                    onClick={(e) => handleResolve(e, complaint._id)}
                                                    disabled={!comments[complaint._id]?.trim() || processingIds.has(complaint._id)}
                                                    className={`px-4 py-2 rounded-lg font-medium text-white ${
                                                        !comments[complaint._id]?.trim() || processingIds.has(complaint._id)
                                                            ? 'bg-gray-400 cursor-not-allowed'
                                                            : 'bg-green-600 hover:bg-green-700'
                                                    }`}
                                                >
                                                    {processingIds.has(complaint._id) ? (
                                                        <FontAwesomeIcon icon={faSpinner} spin />
                                                    ) : (
                                                        'Resolve'
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {complaint.resolved && complaint.resolvedAt && (
                                        <div className="mt-4 pt-4 border-t">
                                            <div className="text-sm text-gray-500">
                                                <p className="font-medium">Resolved on {new Date(complaint.resolvedAt).toLocaleDateString()}</p>
                                                {complaint.resolutionNotes && (
                                                    <p className="mt-1">
                                                        <span className="font-medium">Notes:</span> {complaint.resolutionNotes}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        
                        {/* Pagination */}
                        {pagination.totalPages > 1 && renderPagination()}
                    </div>
                )}
            </div>
        </div>
    );
}
