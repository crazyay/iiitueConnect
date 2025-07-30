import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUser, 
    faBriefcase, 
    faDollarSign,
    faBuilding
} from '@fortawesome/free-solid-svg-icons';
const StudentCard = ({ student }) => {
    const packageAmount = parseInt(student.package.replace(/[^0-9]/g, ''));
    
    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
            {/* Company Logo Section */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <img 
                        className="w-16 h-16 object-contain rounded-full" 
                        src={student.logo} 
                        alt={student.company}
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                    <div className="w-16 h-16 bg-gray-100 rounded-full hidden items-center justify-center">
                        <FontAwesomeIcon icon={faBuilding} className="text-2xl text-gray-400" />
                    </div>
                </div>
                <h4 className="text-white font-bold text-lg">{student.company}</h4>
            </div>
            
            {/* Student Info Section */}
            <div className="p-6">
                <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FontAwesomeIcon icon={faUser} className="text-2xl text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{student.name}</h3>
                </div>
                
                {/* Package Info */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                        <FontAwesomeIcon icon={faDollarSign} className="text-green-600 mr-2" />
                        <span className="text-sm font-medium text-green-700">Package</span>
                    </div>
                    <p className="text-2xl font-bold text-green-800">{student.package}</p>
                    
                    {/* Package Badge */}
                    <div className="mt-3">
                        {packageAmount >= 1000000 ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                🏆 Premium Package
                            </span>
                        ) : packageAmount >= 500000 ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                ⭐ High Package
                            </span>
                        ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                ✅ Good Package
                            </span>
                        )}
                    </div>
                </div>
                
                {/* Achievement Badge */}
                <div className="mt-4 text-center">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
                        Successfully Placed
                    </span>
                </div>
            </div>
        </div>
    );
};

export default StudentCard;
