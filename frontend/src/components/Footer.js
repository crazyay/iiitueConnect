import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faFacebook, 
    faTwitter, 
    faLinkedin, 
    faInstagram, 
    faYoutube 
} from '@fortawesome/free-brands-svg-icons';
import { 
    faEnvelope, 
    faPhone, 
    faMapMarkerAlt 
} from '@fortawesome/free-solid-svg-icons';

function Bottom() {
    return (
        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Institute Info */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-3 mb-6">
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/en/8/83/Indian_Institute_of_Information_Technology%2C_Una_logo.png" 
                                className="h-12 w-12" 
                                alt="IIIT Una Logo" 
                            />
                            <div>
                                <h3 className="text-2xl font-bold">IIIT Una</h3>
                                <p className="text-gray-300 text-sm">Excellence in Technology Education</p>
                            </div>
                        </div>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Indian Institute of Information Technology Una is committed to providing world-class education 
                            in information technology and fostering innovation in research and development.
                        </p>
                        
                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3 text-gray-300">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-400" />
                                <span className="text-sm">Saloh, Himachal Pradesh, India - 177209</span>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-300">
                                <FontAwesomeIcon icon={faPhone} className="text-blue-400" />
                                <span className="text-sm">+91-1975-233001</span>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-300">
                                <FontAwesomeIcon icon={faEnvelope} className="text-blue-400" />
                                <span className="text-sm">info@iiitu.ac.in</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="/Registration" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm">
                                    Registration
                                </a>
                            </li>
                            <li>
                                <a href="/Fees" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm">
                                    Fee Payment
                                </a>
                            </li>
                            <li>
                                <a href="/application" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm">
                                    Applications
                                </a>
                            </li>
                            <li>
                                <a href="/Placements" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm">
                                    Placements
                                </a>
                            </li>
                            <li>
                                <a href="/News" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm">
                                    News & Updates
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Support & Legal */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-white">Support & Legal</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="/Complaint" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm">
                                    Submit Complaint
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm">
                                    Help & Support
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm">
                                    Terms & Conditions
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm">
                                    Accessibility
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 my-8"></div>

                {/* Bottom Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    {/* Copyright */}
                    <div className="text-gray-300 text-sm text-center md:text-left">
                        <p>
                            2024{' '}
                            <a 
                                href="https://iiitu.ac.in/" 
                                className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                IIIT Una
                            </a>
                            . All rights reserved.
                        </p>
                    </div>

                    {/* Social Media Links */}
                    <div className="flex space-x-4">
                        <a 
                            href="#" 
                            className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                            aria-label="Facebook"
                        >
                            <FontAwesomeIcon icon={faFacebook} className="text-white text-sm" />
                        </a>
                        <a 
                            href="#" 
                            className="w-10 h-10 bg-gray-700 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                            aria-label="Twitter"
                        >
                            <FontAwesomeIcon icon={faTwitter} className="text-white text-sm" />
                        </a>
                        <a 
                            href="#" 
                            className="w-10 h-10 bg-gray-700 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                            aria-label="LinkedIn"
                        >
                            <FontAwesomeIcon icon={faLinkedin} className="text-white text-sm" />
                        </a>
                        <a 
                            href="#" 
                            className="w-10 h-10 bg-gray-700 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                            aria-label="Instagram"
                        >
                            <FontAwesomeIcon icon={faInstagram} className="text-white text-sm" />
                        </a>
                        <a 
                            href="#" 
                            className="w-10 h-10 bg-gray-700 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                            aria-label="YouTube"
                        >
                            <FontAwesomeIcon icon={faYoutube} className="text-white text-sm" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Bottom;