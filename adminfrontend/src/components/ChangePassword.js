import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEye, faEyeSlash, faKey, faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
const apiUrl = process.env.REACT_APP_API_BASE_URL;

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
   

    const collectData = async (e) => {
        e.preventDefault();
        
        if (!oldPassword || !newPassword || !confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match");
            return;
        }

        if (newPassword.length < 6) {
            toast.error("New password must be at least 6 characters long");
            return;
        }

        setIsLoading(true);
        try {
            let response = await fetch(`${apiUrl}/staff/changepassword`, {
                method: 'post',
                body: JSON.stringify({ oldPassword, newPassword }),
                headers: {
                    'content-type': 'application/json'
                },
                credentials: 'include',
            });

            let result = await response.json();
            console.log(result);

            if (response.ok) {
                toast.success("Password updated successfully!");
                navigate('/');
            } else {
                toast.error(result.message || "Please enter correct details");
            }
        } catch (error) {
            toast.error("Network error. Please try again.");
            console.error('Change password error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            collectData(event);
        }
    };
      
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto space-y-8">
                {/* Header Section */}
                <div className="text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors duration-200"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                        <span>Back to Dashboard</span>
                    </button>
                    
                    <div className="flex justify-center items-center space-x-3 mb-6">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                            <FontAwesomeIcon icon={faKey} className="text-blue-600 text-xl" />
                        </div>
                        <div className="text-left">
                            <h1 className="text-2xl font-bold text-gray-800">Change Password</h1>
                            <p className="text-sm text-blue-600 font-medium">Admin Security</p>
                        </div>
                    </div>
                    
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        Update Your Password
                    </h2>
                    <p className="text-gray-600">
                        Keep your admin account secure with a strong password
                    </p>
                </div>

                {/* Change Password Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                    <form onSubmit={collectData} className="space-y-6">
                        {/* Current Password Field */}
                        <div>
                            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Current Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FontAwesomeIcon icon={faLock} className="text-gray-400" />
                                </div>
                                <input
                                    id="oldPassword"
                                    name="oldPassword"
                                    type={showOldPassword ? "text" : "password"}
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    placeholder="Enter your current password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                >
                                    <FontAwesomeIcon icon={showOldPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
                        </div>

                        {/* New Password Field */}
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FontAwesomeIcon icon={faKey} className="text-gray-400" />
                                </div>
                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    type={showNewPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    placeholder="Enter your new password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                >
                                    <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters long</p>
                        </div>

                        {/* Confirm New Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FontAwesomeIcon icon={faCheck} className="text-gray-400" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                    placeholder="Confirm your new password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                >
                                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
                            {confirmPassword && newPassword !== confirmPassword && (
                                <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || !oldPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword}
                            className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                                isLoading || !oldPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 shadow-lg hover:shadow-xl'
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    <span>Updating Password...</span>
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faKey} />
                                    <span>Update Password</span>
                                </>
                            )}
                        </button>

                        {/* Security Tips */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                                    <FontAwesomeIcon icon={faLock} className="text-white text-xs" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-blue-800 mb-1">Security Tips</h4>
                                    <ul className="text-sm text-blue-700 space-y-1">
                                        <li>• Use a combination of letters, numbers, and symbols</li>
                                        <li>• Avoid using personal information</li>
                                        <li>• Don't reuse passwords from other accounts</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="text-center text-sm text-gray-500">
                    <p>© 2024 IIIT Una. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;
