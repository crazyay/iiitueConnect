import { useState,useEffect } from "react";
import { toast } from "react-toastify";
export default function Hostelform(){
  const initialFormData = {
    rollno: "",
    email: "",
    name: "",
    phone: "",
    messname: "",
    hostelname: "",
    feeamount: "",
    receiptno: "",
    file: null,
  };
    const [data,setdata] =useState(initialFormData);
    
   
    const  handleSubmit = async (e) => {
         e.preventDefault();
     
      try {
        const formData = new FormData();
        formData.append("rollno", data.rollno);
        formData.append("email", data.email);
        formData.append("name", data.name);
        formData.append("phone", data.phone);
        formData.append("messname", data.messname);
        formData.append("hostelname", data.hostelname);
        formData.append("feeamount", data.feeamount);
        formData.append("receiptno", data.receiptno);
        formData.append("file", data.file);

        const response = await fetch("http://localhost:8000/hostel/hostelform", {
          method: "POST",
          body: formData,
        });
        console.log(response);
        
        if (response.ok) {
          console.log("File uploaded successfully!");
          setdata(initialFormData);
          toast.success("Form submitted")
          // You can handle success here (e.g., show a success message)
        } else {
          toast.error("Oops! Something went wrong! Try Again")
          console.error("Error uploading file");
          // Handle the error (e.g., show an error message)
        }
      } catch (error) {
        toast.error("Oops! Something went wrong! Try Again")

        console.error("Error uploading file", error);
        // Handle the error (e.g., show an error message)
      }
  };

   

    function updatedata(event){
      // event.preventDefault();
      const {name,value,type}=event.target;

      setdata((prevData) => 
      {
        return{
          ...prevData,
          [name]: type === "file" ? event.target.files[0] : value,
        }
      }
     
    );
   
  }
  
    return(
        <form className=" max-w-2xl mx-auto pt-20 pb-20" encType="multipart/form-data" onSubmit={handleSubmit} >
        <div className="relative z-0 w-full mb-5 group">
            <input type="text" value={data.rollno} onChange={updatedata} name="rollno" id="floating_password" className="block py-2.5 px-0 w-full text-sm dark:text-black text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Roll no</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input type="email" value={data.email} onChange={updatedata}  name="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm dark:text-black  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="text" name="name" value={data.name} onChange={updatedata} id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
              <input type="tel"  value={data.phone} onChange={updatedata} pattern="[0-9]{10}" name="phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label for="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
              <input type="text" name="messname" value={data.messname} onChange={updatedata} id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 dark:text-black focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label for="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mess Name</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
              <input type="text" name="hostelname" value={data.hostelname} onChange={updatedata} id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 dark:text-black focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label for="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Hostel Name</label>
          </div>
         




        <div className="relative z-0 w-full mb-5 group">
            <input type="text" name="feeamount" value={data.feeamount} onChange={updatedata} id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label for="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Fee Amount Paid</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
              <input type="text" name="receiptno"value={data.receiptno} onChange={updatedata} id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label for="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Fee Reciept number</label>
        </div>
          
<div className="max-w-lg mx-auto pb-10">
<label className="block mb-2 text-sm font-medium text-gray-900">Upload documents</label>
<input name="file" onChange={updatedata} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file" />
<div className="mt-1 text-sm text-black" id="user_avatar_help">Upload your fee receipt</div>
</div>   
</div>   
<button  type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Submit</button>
</form>
);
}
