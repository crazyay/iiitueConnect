import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

function Login() {
    // console.log(apiUrl);
    
    let [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    let student_name = "";
    let student_roll_no = "";
    
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    });

    const collectData = async () => {
        let response = await fetch(`${apiUrl}/users/Login`, {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'content-type': 'application/json'
            },
            credentials:'include',
            
        });
      
       let result = await response.json();
        console.log(result); 
      
        if (response.ok) {
            student_name = result.email; // Assuming there is a 'name' field in the user object
            student_roll_no = result.rollNo; // Assuming there is a 'roll_no' field in the user object
            localStorage.setItem("user", JSON.stringify(result));
            toast.success("Login Successfully")
            navigate('/');
        } else {
             toast.error("Please enter correct details"); 
            // alert("Please enter correct details");
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
                                Sign in to your account
                            </h1>
                            <div className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="22110@iiitu.ac.in" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress} type="password" name="password" id="password" placeholder="123" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                <div className="flex items-center justify-between">
                                    {/* <div className="flex items-start"> */}

                                    {  /*  <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                        </div>*/}

                                        {/* <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                        </div> */}
                                    {/* </div> */}
                                    {/* <a href="/" className="text-sm font-medium text-blue-500 hover:underline dark:text-primary-500">Forgot password?</a> */}
                                </div>

                                <button onClick={collectData} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                               <p className='pt-2 text-red-500'> Please note: The server may take up to 50 seconds to respond due to inactivity. Thank you for your patience! </p>
                              
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
