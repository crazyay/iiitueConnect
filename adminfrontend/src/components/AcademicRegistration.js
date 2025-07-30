import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faGraduationCap, 
    faSearch, 
    faUser, 
    faEnvelope, 
    faCalendarAlt, 
    faCheckCircle, 
    faFileAlt, 
    faEye, 
    faSpinner,
    faFilter,
    faUsers,
    faClipboardCheck
} from '@fortawesome/free-solid-svg-icons';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

function AcademicRegistration(){
   const [data,setdata]=useState([]);
   const [comments,setComments]=useState([]); 
   const [filteredData, setFilteredData] = useState([]);
   const [filter, setFilter] = useState("");

   const academicReg=async ()=>{
    try {
     const response=await fetch(`${apiUrl}/academic/academicregistration`)
     if(!response.ok){
         toast.error("Data fetching failed")
         throw new console.error("data fetch is failed");
     }
const data= await response.json();
setFilteredData(data);
  setdata(data);
}
catch (error) {
  toast.error("Data fetching failed")
   console.log(error);
} 
}
    useEffect(()=>{
    
       
    academicReg();
},[])

const handleApprove=async(e,id)=>{
    e.preventDefault();
  try {
    const response = await fetch(`${apiUrl}/academic/academicregistrationapproval/${id}`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: comments[id] }),
    });
   
    if (response.ok) {
            toast.success("Verification Done")
    }else{
      toast.error("Failed to approve application")
      throw new Error("Failed to approve application");
    }

  
    setComments((prevComments) => ({
      ...prevComments,
      [id]: "", // Clear the comment input after submission
    }));
   
    academicReg();
   

  } catch (error) {
    console.error("Error approving application:", error);
  }
}

const handleFilterChange = (e) => {
  // e.preventDefault();
  setFilter(e.target.value);
  filterData(e.target.value);
};

const filterData = (query) => {
  if (!query) {
    setFilteredData(data); // If query is empty, show all registrations
    return;
  }

  const filtered = data.filter((item) => {
    const batch = item.batch ? item.batch.toLowerCase() : '';
    const semester = item.semester ? item.semester.toLowerCase() : '';
    const branch = item.branch ? item.branch.toLowerCase() : '';
    const rollno = item.rollno && typeof item.rollno === 'string' ? item.rollno.toLowerCase() : '';

    return (
      batch.includes(query.toLowerCase()) ||
      semester.includes(query.toLowerCase()) ||
      branch.includes(query.toLowerCase()) ||
      rollno.includes(query.toLowerCase())
    );
});
  setFilteredData(filtered);
};

const handleCommentChange = (e, id) => {
  console.log("handle comment");
  const { value } = e.target;
  setComments((prevComments) => ({
    ...prevComments,
    [id]: value,
  }));
};


return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <FontAwesomeIcon icon={faGraduationCap} className="text-5xl mb-4" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Academic Registrations</h1>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                        Review and manage student academic registration applications
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Statistics and Search Section */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Statistics Cards */}
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 text-center">
                            <FontAwesomeIcon icon={faUsers} className="text-3xl mb-3" />
                            <h3 className="text-2xl font-bold">{data.length}</h3>
                            <p className="text-blue-100">Total Applications</p>
                        </div>
                        
                        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 text-center">
                            <FontAwesomeIcon icon={faCheckCircle} className="text-3xl mb-3" />
                            <h3 className="text-2xl font-bold">{data.filter(item => item.status === 'true').length}</h3>
                            <p className="text-green-100">Approved</p>
                        </div>
                        
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl p-6 text-center">
                            <FontAwesomeIcon icon={faClipboardCheck} className="text-3xl mb-3" />
                            <h3 className="text-2xl font-bold">{data.filter(item => item.status === 'false').length}</h3>
                            <p className="text-orange-100">Pending Review</p>
                        </div>
                    </div>

                    {/* Search Section */}
                    <div className="relative">
                        <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={filter}
                            onChange={handleFilterChange}
                            placeholder="Search by roll number, batch, semester, or branch..."
                            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-lg"
                        />
                    </div>
                </div>

                {/* Applications Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredData.length > 0 ? (
                        filteredData.map((item, index) => (
                            <div key={item._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                                {/* Card Header */}
                                <div className={`p-6 ${
                                    item.status === 'true' 
                                        ? 'bg-gradient-to-r from-green-500 to-green-600' 
                                        : 'bg-gradient-to-r from-orange-500 to-orange-600'
                                } text-white`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                                <FontAwesomeIcon icon={faUser} className="text-xl" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold">{item.rollno}</h3>
                                                <p className="text-sm opacity-90">Roll Number</p>
                                            </div>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            item.status === 'true' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-orange-100 text-orange-800'
                                        }`}>
                                            {item.status === 'true' ? 'Approved' : 'Pending'}
                                        </div>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-6">
                                    {/* Student Details */}
                                    <div className="space-y-4 mb-6">
                                        <div className="flex items-center space-x-3">
                                            <FontAwesomeIcon icon={faEnvelope} className="text-blue-600" />
                                            <div>
                                                <p className="text-sm text-gray-600">Email</p>
                                                <p className="font-medium text-gray-800">{item.email}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex items-center space-x-2">
                                                <FontAwesomeIcon icon={faGraduationCap} className="text-blue-600" />
                                                <div>
                                                    <p className="text-xs text-gray-600">Semester</p>
                                                    <p className="font-medium">{item.semester}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center space-x-2">
                                                <FontAwesomeIcon icon={faCalendarAlt} className="text-blue-600" />
                                                <div>
                                                    <p className="text-xs text-gray-600">Batch</p>
                                                    <p className="font-medium">{item.batch}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <p className="text-xs text-gray-600 mb-1">Application Date</p>
                                            <p className="text-sm font-medium">
                                                {new Date(item.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    {item.status === 'false' ? (
                                        <div className="space-y-4">
                                            <textarea
                                                value={comments[item._id] || ''}
                                                onChange={(e) => handleCommentChange(e, item._id)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                                                placeholder="Add approval comments..."
                                                rows="3"
                                            />
                                            
                                            <div className="flex space-x-3">
                                                <button
                                                    onClick={(e) => handleApprove(e, item._id)}
                                                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                                                >
                                                    <FontAwesomeIcon icon={faCheckCircle} />
                                                    <span>Approve</span>
                                                </button>
                                                
                                                <Link
                                                    to={item.feepdf}
                                                    target="_blank"
                                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                                                >
                                                    <FontAwesomeIcon icon={faEye} />
                                                    <span>View Receipt</span>
                                                </Link>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2 text-green-600">
                                                <FontAwesomeIcon icon={faCheckCircle} className="text-xl" />
                                                <span className="font-semibold text-lg">Application Approved</span>
                                            </div>
                                            
                                            <Link
                                                to={item.feepdf}
                                                target="_blank"
                                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
                                            >
                                                <FontAwesomeIcon icon={faEye} />
                                                <span>View Receipt</span>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full">
                            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                                <FontAwesomeIcon icon={faSearch} className="text-6xl text-gray-300 mb-6" />
                                <h3 className="text-2xl font-bold text-gray-600 mb-4">No Applications Found</h3>
                                <p className="text-gray-500 text-lg">
                                    {filter ? 'No applications match your search criteria.' : 'No academic registration applications available.'}
                                </p>
                                {filter && (
                                    <button
                                        onClick={() => { setFilter(''); setFilteredData(data); }}
                                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                                    >
                                        Clear Search
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

}

export default AcademicRegistration