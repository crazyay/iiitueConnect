import { useState,useEffect } from "react";
import {toast} from "react-toastify"
function AcademicRegistration(){
   const [data,setdata]=useState([]);
   const [comments,setComments]=useState([]); 
   const [filteredData, setFilteredData] = useState([]);
   const [filter, setFilter] = useState("");

   const academicReg=async ()=>{
    try {
     const response=await fetch("http://localhost:8000/academic/academicregistration")
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

const handleApprove=async(id)=>{
  try {
    const response = await fetch(`http://localhost:8000/academic/academicregistrationapproval/${id}`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: comments[id] }),
    });
   
    if (!response.ok) {
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
  setFilter(e.target.value);
  filterData(e.target.value);
};

const filterData = (query) => {
  if (!query) {
    setFilteredData(data); // If query is empty, show all registrations
    return;
  }

  const filtered = data.filter((item) => {
    const rollno = (item.rollno && typeof item.rollno === 'string') ? item.rollno.toLowerCase() : ''; 
    return (
      item.batch.toLowerCase().includes(query.toLowerCase()) ||
      item.semester.toLowerCase().includes(query.toLowerCase()) ||
      item.branch.toLowerCase().includes(query.toLowerCase()) ||
      (typeof item.rollno === 'string' && item.rollno.toLowerCase().includes(query.toLowerCase()))
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
  <div className=" ">
    <h1 className="text-center font-bold text-4xl text-green-700 tracking-wider" style={{ textShadow: "2px 2px 4px #000000" }}>Registered students Details</h1>

    <div className=" p-4 ">
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Search by batch, semester, or roll number"
        className="border w-full text-black border-gray-300 rounded-lg px-3 py-1 mb-2 focus:outline-none focus:border-primary-500"
      />
    </div>

    <div className="flex flex-wrap justify-evenly  p-10">
      {filteredData.length > 0 ? (
        filteredData.map((item, index) => (
          <div className="text-white font-medium p-4  mb-4  w-[300px] bg-slate-500" key={item._id}>
            <p>Roll_no: {item.rollno}</p>
            <p>Email: {item.email}</p>
            <div className="flex flex-col">
              <span>Date: {new Date(item.createdAt).toDateString()}</span>
              <span>Time: {new Date(item.createdAt).toLocaleTimeString()}</span>
            </div>

            {item.status === 'false' ? (
              <>
                <input
                  type="text"
                  value={comments[item._id]}
                  onChange={(e) => handleCommentChange(e, item._id)}
                  className="border text-black border-gray-300 rounded-lg px-3 py-1 mb-2 focus:outline-none focus:border-primary-500"
                  placeholder="Add a comment..."
                />
                <button
                  type="submit"
                  className="bg-primary-600 border-4 bg-slate-600  text-white px-4 py-2 rounded-lg"
                  onClick={() => handleApprove(item._id)}
                >
                  <span className="text-1xl font-bold">Approve</span>
                </button>
              </>
            ) : (
              <div className="p-4 flex justify-end">
                <p className="text-2xl font-bold text-[#FCFFE0]">Approved</p>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="w-full h-[29vh]">
          <h1 className="text-center font-bold text-5xl text-green-400 tracking-wider" style={{ textShadow: "2px 2px 4px #000000" }}>No Record found</h1>
        </div>
      )}
    </div>
  </div>
);
}



export default AcademicRegistration