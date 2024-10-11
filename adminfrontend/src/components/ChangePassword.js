import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
const apiUrl = process.env.REACT_APP_API_BASE_URL;

function ChangePassword() {
    // let [email, setEmail] = useState("");
    const [oldPassword, setoldPassword] = useState("");
    const [newPassword, setnewPassword] = useState("");
    const navigate = useNavigate();
   

    const collectData = async (e) => {
     e.preventDefault();
        let response = await fetch(`${apiUrl}/staff/changepassword`, {
            method: 'post',
            body: JSON.stringify({ oldPassword, newPassword }),
            headers: {
                'content-type': 'application/json'
            },
            credentials:'include',
        });
      
       let result = await response.json();
        console.log(result);
        
      
        if (response.ok) {
            toast.success("Password Updated")
            // student_name = result.email; // Assuming there is a 'name' field in the user object
            // student_roll_no = result.rollNo; // Assuming there is a 'roll_no' field in the user object
            // localStorage.setItem("user", JSON.stringify(result));
            navigate('/');
        } else {
            toast.error("Please enter correct details")
           
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            collectData();
        }
    };
      
    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="https://upload.wikimedia.org/wikipedia/en/8/83/Indian_Institute_of_Information_Technology%2C_Una_logo.png" alt="logo" />
                        IIIT UNA
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                               Change your Password
                            </h1>
                            <div className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> oldPassword</label>
                                    <input value={oldPassword} onChange={(e) => setoldPassword(e.target.value)} placeholder="old Password" type="password" name="oldPassword" id="oldPassword" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input value={newPassword} onChange={(e) => setnewPassword(e.target.value)} onKeyPress={handleKeyPress} type="password" name="newPassword" id="password" placeholder="new Password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                {/* <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                        </div>
                                    </div>
                                    <a href="/" className="text-sm font-medium text-blue-500 hover:underline dark:text-primary-500">Forgot password?</a>
                                </div> */}
                                
                                <button onClick={collectData} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Change Password</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ChangePassword;
