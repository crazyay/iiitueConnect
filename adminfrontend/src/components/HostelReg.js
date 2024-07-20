import { useEffect, useState } from "react";

export default function HostelReg(){
    const [data,setdata]=useState([]);
   const [comments,setComments]=useState([]); 

    const fetchData = async () => {
      try {  
        const response = await fetch("http://localhost:8000/hostel/hostelregistration");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        
        const data = await response.json();
        console.log(data);
        setdata(data);
        console.log(data); // Do something with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  useEffect(() => {
    fetchData();
  },[]);
  const handleApprove=async(id)=>{
    try {
      const response = await fetch(`http://localhost:8000/hostel/hostelregistrationapproval/${id}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: comments[id] }),
      });
      // console.log("hua");
      if (!response.ok) {
        throw new Error("Failed to approve application");
      }
  
      // setApplications(applications.map((app) =>
      // app._id === id ? { ...app, approved: true } : app
    // ));
      // const updatedApplications = applications.filter((app) => app._id !== id);
      // setApplications(updatedApplications);
      setComments((prevComments) => ({
        ...prevComments,
        [id]: "", // Clear the comment input after submission
      }));
      // setComments({ ...comments, [id]: "" });
      fetchData();
     
  
    } catch (error) {
      console.error("Error approving application:", error);
    }
  }
  
  // const handleCommentChange=(e,id)=>{
  //   const { value } = e.target;
  //   setComments({ ...comments, [id]: value });
  //  }
  
  
  const handleCommentChange = (e, id) => {
    console.log("handle comment");
    const { value } = e.target;
    setComments((prevComments) => ({
      ...prevComments,
      [id]: value,
    }));
  };

  return (
    <div>
    <h1 className=" text-center font-bold text-5xl text-green-700 tracking-wider " style={{textShadow:"2px 2px 4px #000000"}}>Registered students Details</h1>

<div className="flex justify-evenly p-10" >

{ data.length>0? data.map((item,index)=> { return(
<div className="text-white font-medium p-4 w-[300px] bg-slate-500">
<p>Roll_no: {item.rollno}</p> 
<p>Batch: {item.batch}</p> 
<p>Semester: {item.semester}</p> 
<p>Hostel: {item.hostel}</p>
<p>Email: {item.email}</p>
<div className=" flex flex-col ">
<span>Date: {new Date(item.createdAt).toDateString()}</span>
<span>Time: {new Date(item.createdAt).toLocaleTimeString()}</span>
</div>

{ item.status==='false'?
                <>
                <input
                  type="text"
                  value={comments[item._id]}
                  onChange={(e) => handleCommentChange(e,item._id)}
                  className="border text-black border-gray-300 rounded-lg px-3 py-1 mb-2 focus:outline-none focus:border-primary-500"
                  placeholder="Add a comment..."
                  key={item._id}
                />
                <button
                  type="submit"
                  className="bg-primary-600 border-4 bg-slate-600  text-white px-4 py-2 rounded-lg"
                  onClick={() => handleApprove(item._id)}
                >
                <span className="text-1xl font-bold "> Approve</span> 
                </button></>

               : <div className="p-4 flex justify-end " ><p className="text-2xl font-bold text-[#FCFFE0]" > Approved</p></div> }
</div>
)
}):<div className="w-full h-[29vh]">
<h1 className=" text-center font-bold text-5xl text-green-700 tracking-wider " style={{textShadow:"2px 2px 4px #000000"}}>No Record Found</h1>
</div>
}
</div>
</div>    
    
  );
}