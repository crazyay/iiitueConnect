import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faHome, 
    faSearch, 
    faUser, 
    faEnvelope, 
    faCalendar, 
    faCheck, 
    faSpinner,
    faClock,
    faFileAlt,
    faEye,
    faComment,
    faGraduationCap,
    faBuilding,
    faChevronLeft,
    faChevronRight,
    faPhone,
    faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

export default function HostelReg() {
    const [registrations, setRegistrations] = useState([]);
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

    // Fetch registrations with pagination
    const fetchRegistrations = async (pageNumber = 1) => {
        setIsLoading(true);
        try {
            const url = `${apiUrl}/hostel/hostelregistration?page=${pageNumber}&limit=${pagination.itemsPerPage}`;
            console.log('Fetching from URL:', url);
            
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
                throw new Error(`Failed to fetch registrations: ${response.status} ${response.statusText}`);
            }
            
            const responseData = await response.json();
            console.log('Response data:', responseData);
            
            if (!responseData || !responseData.success || !Array.isArray(responseData.data)) {
                console.error('Invalid response format or error from server:', responseData);
                throw new Error(responseData?.error || 'Invalid response format from server');
            }
            
            const { data, pagination } = responseData;
            const { currentPage, totalPages, totalItems } = pagination || {};
            
            setRegistrations(data);
            setPagination(prev => ({
                ...prev,
                currentPage: parseInt(currentPage),
                totalPages,
                totalItems
            }));
            
            // Initialize comments
            const initialComments = {};
            data.forEach(reg => {
                initialComments[reg._id] = "";
            });
            setComments(initialComments);
            
        } catch (error) {
            console.error("Error fetching registrations:", error);
            toast.error("Failed to load hostel registrations");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            fetchRegistrations(newPage);
        }
    };

    // Handle registration approval
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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ comment: comments[id] })
            });
            
            if (response.ok) {
                toast.success("Registration approved successfully!");
                setComments(prev => ({
                    ...prev,
                    [id]: ""
                }));
                fetchRegistrations(pagination.currentPage);
            } else {
                throw new Error("Failed to approve registration");
            }
        } catch (error) {
            console.error("Error approving registration:", error);
            toast.error("Failed to approve registration");
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

    // Filter registrations based on search and status
    const filteredRegistrations = Array.isArray(registrations) ? registrations.filter(reg => {
        if (!reg) return false;
        
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = searchTerm === "" || 
            (reg.name?.toLowerCase()?.includes(searchLower) ||
            reg.rollno?.toLowerCase()?.includes(searchLower) ||
            reg.email?.toLowerCase()?.includes(searchLower) ||
            reg.branch?.toLowerCase()?.includes(searchLower));
            
        const matchesStatus = statusFilter === "all" ||
            (statusFilter === "approved" && reg.status) ||
            (statusFilter === "pending" && !reg.status);
            
        return matchesSearch && matchesStatus;
    }) : [];

    // Get statistics
    const stats = {
        total: Array.isArray(registrations) ? registrations.length : 0,
        approved: Array.isArray(registrations) ? registrations.filter(reg => reg?.status).length : 0,
        pending: Array.isArray(registrations) ? registrations.filter(reg => reg && !reg.status).length : 0
    };

    // Initial data fetch
    useEffect(() => {
        fetchRegistrations(1);
    }, [pagination.itemsPerPage]);

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
                    } of {pagination.totalItems} registrations
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

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        Hostel Registrations
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Manage and approve student hostel registrations
                    </p>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-blue-700">
                                {stats.total}
                            </div>
                            <div className="text-sm text-gray-600">Total Registrations</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-green-700">
                                {stats.approved}
                            </div>
                            <div className="text-sm text-gray-600">Approved</div>
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
                                placeholder="Search registrations..."
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
                            <option value="approved">Approved</option>
                        </select>
                    </div>
                </div>
                
                {/* Registrations List */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <FontAwesomeIcon icon={faSpinner} spin className="text-3xl text-blue-500" />
                    </div>
                ) : filteredRegistrations.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <FontAwesomeIcon 
                            icon={faFileAlt} 
                            className="text-gray-400 text-4xl mb-4" 
                        />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No registrations found
                        </h3>
                        <p className="text-gray-500">
                            {searchTerm || statusFilter !== 'all' 
                                ? 'Try adjusting your search or filter criteria.'
                                : 'There are no registrations to display at this time.'}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredRegistrations.map(registration => (
                            <div key={registration._id} className="bg-white rounded-lg shadow overflow-hidden">
                                <div className={`p-4 ${
                                    registration.status 
                                        ? 'bg-green-50 border-l-4 border-green-500' 
                                        : 'bg-yellow-50 border-l-4 border-yellow-500'
                                }`}>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium text-gray-900">
                                                {registration.name} ({registration.rollno})
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {registration.branch} • {registration.semester} Semester
                                            </p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                                            registration.status 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {registration.status ? 'Approved' : 'Pending'}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="p-4 border-t">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="font-medium">{registration.email || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Phone</p>
                                            <p className="font-medium">{registration.phone || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Registration Date</p>
                                            <p className="font-medium">{formatDate(registration.createdAt)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Gender</p>
                                            <p className="font-medium capitalize">{registration.gender || 'N/A'}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">Address</p>
                                        <p className="font-medium">{registration.address || 'N/A'}</p>
                                    </div>
                                    
                                    {registration.feepdf && (
                                        <div className="mt-4">
                                            <a 
                                                href={registration.feepdf} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-blue-600 hover:underline"
                                            >
                                                <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
                                                View Fee Receipt
                                            </a>
                                        </div>
                                    )}
                                    
                                    {!registration.status && (
                                        <div className="mt-6 pt-4 border-t">
                                            <label htmlFor={`comment-${registration._id}`} className="block text-sm font-medium text-gray-700 mb-2">
                                                Approval Notes
                                            </label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    id={`comment-${registration._id}`}
                                                    value={comments[registration._id] || ''}
                                                    onChange={(e) => handleCommentChange(e, registration._id)}
                                                    className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    placeholder="Add approval notes..."
                                                />
                                                <button
                                                    onClick={(e) => handleApprove(e, registration._id)}
                                                    disabled={!comments[registration._id]?.trim() || processingIds.has(registration._id)}
                                                    className={`px-4 py-2 rounded-lg font-medium text-white ${
                                                        !comments[registration._id]?.trim() || processingIds.has(registration._id)
                                                            ? 'bg-gray-400 cursor-not-allowed'
                                                            : 'bg-green-600 hover:bg-green-700'
                                                    }`}
                                                >
                                                    {processingIds.has(registration._id) ? (
                                                        <FontAwesomeIcon icon={faSpinner} spin />
                                                    ) : (
                                                        'Approve'
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {registration.status && registration.updatedAt && (
                                        <div className="mt-4 pt-4 border-t">
                                            <div className="text-sm text-gray-500">
                                                <p className="font-medium">Approved on {formatDate(registration.updatedAt)}</p>
                                                {registration.approvalNotes && (
                                                    <p className="mt-1">
                                                        <span className="font-medium">Notes:</span> {registration.approvalNotes}
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
