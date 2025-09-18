import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faGraduationCap, 
    faSearch, 
    faUser, 
    faCheckCircle, 
    faFileAlt, 
    faEye, 
    faSpinner,
    faTimes,
    faChevronLeft,
    faChevronRight
} from '@fortawesome/free-solid-svg-icons';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

function AcademicRegistration() {
    // State for registrations and UI
    const [registrations, setRegistrations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState({});
    const [processingIds, setProcessingIds] = useState(new Set());
    
    // Pagination state
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10
    });
    
    // Filter state
    const [filters, setFilters] = useState({
        batch: "",
        semester: "",
        branch: ""
    });
    
    // Search state
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch registrations with filters and pagination
    const fetchRegistrations = async () => {
        try {
            setIsLoading(true);
            const queryParams = new URLSearchParams({
                page: pagination.currentPage,
                limit: pagination.itemsPerPage,
                ...(searchTerm && { search: searchTerm }),
                ...(filters.batch && { batch: filters.batch }),
                ...(filters.semester && { semester: filters.semester }),
                ...(filters.branch && { branch: filters.branch })
            });

            const response = await fetch(
                `${apiUrl}/api/academic/registrations?${queryParams}`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Pragma': 'no-cache',
                        'Expires': '0'
                    }
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch registrations');
            }

            const data = await response.json();
            setRegistrations(data.data || []);
            setPagination(prev => ({
                ...prev,
                totalPages: data.pagination?.totalPages || 1,
                totalItems: data.pagination?.totalItems || 0
            }));
        } catch (error) {
            console.error('Error fetching registrations:', error);
            toast.error('Failed to load registrations');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle approval of registration
    const handleApprove = async (e, id) => {
        e.preventDefault();
        try {
            setProcessingIds(prev => new Set(prev).add(id));
            const comment = comments[id] || '';

            const response = await fetch(
                `${apiUrl}/api/academic/approve/${id}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ comment })
                }
            );

            if (!response.ok) {
                throw new Error('Failed to approve registration');
            }

            toast.success('Registration approved successfully');
            fetchRegistrations();
        } catch (error) {
            console.error('Error approving registration:', error);
            toast.error('Failed to approve registration');
        } finally {
            setProcessingIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });
        }
    };

    // Handle filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Clear all filters
    const clearFilters = () => {
        setFilters({
            batch: '',
            semester: '',
            branch: ''
        });
        setSearchTerm('');
    };

    // Handle search
    const handleSearch = () => {
        setPagination(prev => ({ ...prev, currentPage: 1 }));
        fetchRegistrations();
    };

    // Handle comment changes
    const handleCommentChange = (e, id) => {
        setComments(prev => ({
            ...prev,
            [id]: e.target.value
        }));
    };

    // Handle page change
    const handlePageChange = (page) => {
        setPagination(prev => ({
            ...prev,
            currentPage: page
        }));
    };

    // Handle items per page change
    const handleItemsPerPageChange = (e) => {
        setPagination(prev => ({
            ...prev,
            itemsPerPage: parseInt(e.target.value),
            currentPage: 1
        }));
    };

    // Fetch registrations when component mounts or when pagination/filters change
    useEffect(() => {
        fetchRegistrations();
    }, [pagination.currentPage, pagination.itemsPerPage]);

    // Render pagination controls
    const renderPagination = () => {
        const pages = [];
        const { currentPage, totalPages } = pagination;
        const maxPagesToShow = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        // First page
        if (startPage > 1) {
            pages.push(
                <button
                    key={1}
                    onClick={() => handlePageChange(1)}
                    className="px-3 py-1 border rounded-md text-sm font-medium"
                >
                    1
                </button>
            );
            if (startPage > 2) {
                pages.push(<span key="start-ellipsis" className="px-2">...</span>);
            }
        }

        // Middle pages
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-3 py-1 border rounded-md text-sm font-medium ${
                        i === currentPage
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                >
                    {i}
                </button>
            );
        }

        // Last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(<span key="end-ellipsis" className="px-2">...</span>);
            }
            pages.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className="px-3 py-1 border rounded-md text-sm font-medium"
                >
                    {totalPages}
                </button>
            );
        }

        return (
            <div className="flex items-center justify-between mt-4">
                <div className="flex-1">
                    <span className="text-sm text-gray-700">
                        Showing <span className="font-medium">
                            {registrations.length === 0 ? 0 : (pagination.currentPage - 1) * pagination.itemsPerPage + 1}
                        </span> to <span className="font-medium">
                            {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)}
                        </span> of <span className="font-medium">{pagination.totalItems}</span> results
                    </span>
                </div>
                
                <div className="flex items-center gap-2">
                    <select
                        value={pagination.itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        className="text-sm border rounded-md px-2 py-1"
                    >
                        <option value="5">5 per page</option>
                        <option value="10">10 per page</option>
                        <option value="20">20 per page</option>
                        <option value="50">50 per page</option>
                    </select>
                    
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => handlePageChange(1)}
                            disabled={pagination.currentPage === 1}
                            className="px-2 py-1 border rounded-md text-sm disabled:opacity-50"
                        >
                            «
                        </button>
                        <button
                            onClick={() => handlePageChange(Math.max(1, pagination.currentPage - 1))}
                            disabled={pagination.currentPage === 1}
                            className="px-2 py-1 border rounded-md text-sm disabled:opacity-50"
                        >
                            ‹
                        </button>
                        {pages}
                        <button
                            onClick={() => handlePageChange(Math.min(pagination.totalPages, pagination.currentPage + 1))}
                            disabled={pagination.currentPage >= pagination.totalPages}
                            className="px-2 py-1 border rounded-md text-sm disabled:opacity-50"
                        >
                            ›
                        </button>
                        <button
                            onClick={() => handlePageChange(pagination.totalPages)}
                            disabled={pagination.currentPage >= pagination.totalPages}
                            className="px-2 py-1 border rounded-md text-sm disabled:opacity-50"
                        >
                            »
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <FontAwesomeIcon icon={faGraduationCap} className="text-5xl mb-4" />
                    <h1 className="text-4xl font-bold mb-2">Academic Registrations</h1>
                    <p className="text-xl opacity-90">Manage and approve student academic registrations</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 -mt-10">
                {/* Search and Filters */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="mb-4">
                        <div className="flex flex-col md:flex-row md:items-end gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Search by name, roll no..."
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <FontAwesomeIcon 
                                        icon={faSearch} 
                                        className="absolute left-3 top-3 text-gray-400"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
                                >
                                    <FontAwesomeIcon icon={faSearch} className="mr-2" />
                                    Search
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Batch</label>
                            <input
                                type="text"
                                name="batch"
                                value={filters.batch}
                                onChange={handleFilterChange}
                                placeholder="e.g. 2023"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                            <input
                                type="text"
                                name="semester"
                                value={filters.semester}
                                onChange={handleFilterChange}
                                placeholder="e.g. 1, 2, 3..."
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    name="branch"
                                    value={filters.branch}
                                    onChange={handleFilterChange}
                                    placeholder="e.g. CSE, ECE..."
                                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center"
                                >
                                    <FontAwesomeIcon icon={faTimes} className="mr-1" />
                                    Clear
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <FontAwesomeIcon 
                            icon={faSpinner} 
                            className="animate-spin text-blue-600 text-2xl mr-3" 
                        />
                        <span className="text-gray-600">Loading registrations...</span>
                    </div>
                ) : registrations.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                        <FontAwesomeIcon 
                            icon={faFileAlt} 
                            className="text-gray-400 text-4xl mb-3" 
                        />
                        <h3 className="text-lg font-medium text-gray-700">No registrations found</h3>
                        <p className="text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {registrations.map((registration) => (
                                        <tr key={registration._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <FontAwesomeIcon icon={faUser} className="text-blue-600" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {registration.name || 'N/A'}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {registration.rollno || 'N/A'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {registration.branch || 'N/A'} - {registration.semester ? `Sem ${registration.semester}` : 'N/A'}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    Batch: {registration.batch || 'N/A'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    registration.status 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {registration.status ? 'Approved' : 'Pending'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex flex-col space-y-2">
                                                    <button
                                                        onClick={() => window.open(registration.feepdf, '_blank')}
                                                        className="text-blue-600 hover:text-blue-900 flex items-center justify-end"
                                                        title="View Fee Receipt"
                                                    >
                                                        <FontAwesomeIcon icon={faEye} className="mr-1" /> View Receipt
                                                    </button>
                                                    
                                                    {!registration.status && (
                                                        <div className="mt-2">
                                                            <textarea
                                                                value={comments[registration._id] || ''}
                                                                onChange={(e) => handleCommentChange(e, registration._id)}
                                                                placeholder="Add a comment (optional)"
                                                                className="w-full p-2 border rounded text-sm mb-1"
                                                                rows="2"
                                                            />
                                                            <button
                                                                onClick={(e) => handleApprove(e, registration._id)}
                                                                disabled={processingIds.has(registration._id)}
                                                                className="w-full bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded text-sm flex items-center justify-center disabled:opacity-50"
                                                            >
                                                                {processingIds.has(registration._id) ? (
                                                                    <>
                                                                        <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                                                                        Processing...
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                                                                        Approve
                                                                    </>
                                                                )}
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* Pagination */}
                        {pagination.totalPages > 1 && (
                            <div className="px-6 py-4 border-t border-gray-200">
                                {renderPagination()}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AcademicRegistration;
