import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {toast} from "react-toastify"

export default function Complaint(){
  const {page}=useParams();
    const [complaint,setcomplaint]=useState([]);
   const [comments,setComments]=useState([]);  
    const fetchData = async () => {
      try {  
        const response = await fetch(`http://localhost:8000/hostel/Complaint/${page}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setcomplaint(data);
        console.log(data); // Do something with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const handleApprove=async(e,id)=>{
      e.preventDefault();
      try {

        const response = await fetch(`http://localhost:8000/hostel/resolve-complaint/${id}`,{
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment: comments[id] }),
        });
        // console.log("hua");
        if (response.ok) {
          toast.success("Complaint checked");
        }else{
          
          toast.error("Complaint verification failed")
          throw new Error("Failed to approve application");
        }
        // setApplications(applications.map((app) =>
        // app._id === id ? { ...app, approved: true } : app
      // ));
        // const updatedApplications = applications.filter((app) => app._id !== id);
        // setApplications(updatedApplications);
    
        // setComments({ ...comments, [id]: "" });
        fetchData();
    
      } catch (error) {
        toast.error("Complaint verification failed")
        console.error("Error approving application:", error);
      }
    }


  useEffect(() => {
   
    fetchData();
  
  },[page]);

   const handleCommentChange=(e,id)=>{
    const { value } = e.target;
    setComments({ ...comments, [id]: value });
   }



  return (
    <div className="flex flex-wrap justify-evenly ">
 {complaint.length > 0? (
    complaint.map((item,index)=>{
    return(<div className="h-fit w-[300px]  gap-4 m-3 p-6 bg-[#FFEBB2]">
      <p className="text-2xl m-3 font-bold text-[#1E0342]  " >Roll_no: {complaint[index].rollno}</p>
      <p className="text-xl m-3 font-semibold text-[#1E0342]  " >Name: {complaint[index].name}</p>
      <div className="h-[200px] overflow-y-scroll ">
      <p  className="m-3  font-semibold " >Complaint:{complaint[index].complaintdesc}</p>
      </div>
      <p className=" m-2  text-[#1E0342]  " >Email: {complaint[index].email}</p>
      <p className=" m-2  text-[#1E0342]  " >Phone: {complaint[index].phone}</p>


      { (
              <>
                <input
                  type="text"
                  
                  value={comments[item._id]}
                  onChange={(e) => handleCommentChange(e,item._id)}
                  className="border border-gray-300 rounded-lg px-3 py-1 mb-2 focus:outline-none focus:border-primary-500"
                  placeholder="Add a comment..."
                  key={item._id}
                />
                <button
                  type="submit"
                  className="bg-primary-600 border-4 bg-slate-600  text-white px-4 py-2 rounded-lg"
                  onClick={(e) => handleApprove(e,item._id)}
                >
                   <span className="text-2xl font-bold ">Approve</span> 
                </button>
              </>
            )}
      </div>
    )
  })
 ):<div className="w-full h-[29vh]">
                <h1 className=" text-center font-bold text-5xl text-green-700 tracking-wider " style={{textShadow:"2px 2px 4px #000000"}}>No Complaints</h1>
        </div>
      }
    </div>
  );
}
