import { useEffect, useState,useRef } from "react";
import {toast } from "react-toastify";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

export default function Application() {
  const [applications, setApplications] = useState([]);
  const [comments, setComments] = useState({});
  const refMessage=useRef();
  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}/academic/application`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setApplications(data);
      // Initialize comments object with empty strings for each application ID
      const initialComments = {};
      data.forEach((app) => {
        initialComments[app._id] = "";
      });
      setComments(initialComments);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

 

  

  const handleApprove = async (e,id) => {
    e.preventDefault();
    try {

      const response = await fetch(`${apiUrl}/academic/approve-application/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: comments[id] }),
      });
      // console.log("hua");
      if (response.ok) {
        toast.success("Application verified")
        
      }else{
        toast.error("Verification failed!")
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
      console.error("Error approving application:", error);
    }
  };
  
  

  const handleCommentChange = (e, id) => {
    const { value } = e.target;
    setComments({ ...comments, [id]: value });
  };

  return (
    <div className="flex flex-wrap justify-evenly m-8">
      { applications.length > 0 ?
         applications.map((app) => (
              
          <div key={app._id} className="h-fit w-[300px] mb-4 gap-4 m-3 p-6 bg-[#FFEBB2]">
         
               <div className="flex justify-between font-medium">
               <span> {new Date(app.createdAt).toDateString()}</span>
               <span>{new Date(app.createdAt).toLocaleTimeString()}</span>
              </div>
            <p className="text-2xl m-3 font-bold text-[#1E0342]">Roll_no: {app.rollno}</p>
            <p className="text-xl m-3 font-semibold text-[#1E0342]">Subject: {app.subject}</p>
            <div className="h-[150px] overflow-y-scroll">
              <p className="m-3 font-semibold">Msg: {app.message}</p>
            </div>
            <p className="m-2 text-[#1E0342]">Email: {app.email}</p>
            { (
              <>
                <input
                  type="text"
                  name="reply"
                  value={comments[app._id]}
                  onChange={(e) => handleCommentChange(e, app._id)}
                  className="border border-gray-300 rounded-lg px-3 py-1 mb-2 focus:outline-none focus:border-primary-500"
                  placeholder="Add a comment..."
                  key={app._id}
                />
                <button
                  type="submit"
                  className="bg-primary-600 border-4 bg-slate-600 text-white px-4 py-2 rounded-lg"
                  onClick={(e) => handleApprove(e,app._id)}
                >
                <span className="text-xl font-bold">  Approve </span> 
                </button>
              </>
            )}
          </div>
        )):<div className="w-full h-[29vh]">
                <h1 className=" text-center font-bold text-5xl text-green-700 tracking-wider " style={{textShadow:"2px 2px 4px #000000"}}>No Applications</h1>
        </div>
        }
    </div>
  );
}
