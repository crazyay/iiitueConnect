import React, { useState, useMemo } from 'react';
import StudentCard from './StudentCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faBriefcase, 
    faGraduationCap, 
    faTrophy, 
    faUsers, 
    faChartLine, 
    faFilter, 
    faSearch,
    faDollarSign
} from '@fortawesome/free-solid-svg-icons';

const PlacementList = ({ placements }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCompany, setSelectedCompany] = useState('');
    const [sortBy, setSortBy] = useState('package');

    // Calculate statistics
    const stats = useMemo(() => {
        const totalPlacements = placements.length;
        const uniqueCompanies = [...new Set(placements.map(p => p.company))].length;
        const packages = placements.map(p => parseInt(p.package.replace(/[^0-9]/g, '')));
        const highestPackage = Math.max(...packages);
        const averagePackage = Math.round(packages.reduce((a, b) => a + b, 0) / packages.length);
        
        return {
            totalPlacements,
            uniqueCompanies,
            highestPackage,
            averagePackage
        };
    }, [placements]);

    // Filter and sort placements
    const filteredPlacements = useMemo(() => {
        let filtered = placements.filter(placement => {
            const matchesSearch = placement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                placement.company.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCompany = selectedCompany === '' || placement.company === selectedCompany;
            return matchesSearch && matchesCompany;
        });

        // Sort placements
        filtered.sort((a, b) => {
            if (sortBy === 'package') {
                const aPackage = parseInt(a.package.replace(/[^0-9]/g, ''));
                const bPackage = parseInt(b.package.replace(/[^0-9]/g, ''));
                return bPackage - aPackage;
            } else if (sortBy === 'name') {
                return a.name.localeCompare(b.name);
            } else if (sortBy === 'company') {
                return a.company.localeCompare(b.company);
            }
            return 0;
        });

        return filtered;
    }, [placements, searchTerm, selectedCompany, sortBy]);

    const uniqueCompanies = [...new Set(placements.map(p => p.company))];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <FontAwesomeIcon icon={faBriefcase} className="text-5xl mb-4" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Student Placements</h1>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                        Celebrating our students' achievements and successful career placements
                    </p>
                </div>
            </div>

            {/* Statistics Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-200">
                        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FontAwesomeIcon icon={faUsers} className="text-2xl text-blue-600" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-2">{stats.totalPlacements}</h3>
                        <p className="text-gray-600 font-medium">Total Placements</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-200">
                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FontAwesomeIcon icon={faBriefcase} className="text-2xl text-green-600" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-2">{stats.uniqueCompanies}</h3>
                        <p className="text-gray-600 font-medium">Partner Companies</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-200">
                        <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FontAwesomeIcon icon={faTrophy} className="text-2xl text-yellow-600" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-2">₹{stats.highestPackage.toLocaleString()}</h3>
                        <p className="text-gray-600 font-medium">Highest Package</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-200">
                        <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FontAwesomeIcon icon={faChartLine} className="text-2xl text-purple-600" />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-2">₹{stats.averagePackage.toLocaleString()}</h3>
                        <p className="text-gray-600 font-medium">Average Package</p>
                    </div>
                </div>

                {/* Filters Section */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 items-center">
                        {/* Search */}
                        <div className="flex-1 w-full lg:w-auto">
                            <div className="relative">
                                <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search students or companies..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                />
                            </div>
                        </div>

                        {/* Company Filter */}
                        <div className="w-full lg:w-auto">
                            <select
                                value={selectedCompany}
                                onChange={(e) => setSelectedCompany(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            >
                                <option value="">All Companies</option>
                                {uniqueCompanies.map(company => (
                                    <option key={company} value={company}>{company}</option>
                                ))}
                            </select>
                        </div>

                        {/* Sort */}
                        <div className="w-full lg:w-auto">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            >
                                <option value="package">Sort by Package</option>
                                <option value="name">Sort by Name</option>
                                <option value="company">Sort by Company</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600 text-lg">
                        Showing <span className="font-semibold text-blue-600">{filteredPlacements.length}</span> of <span className="font-semibold">{placements.length}</span> placements
                    </p>
                </div>

                {/* Placements Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredPlacements.map((placement, index) => (
                        <StudentCard key={index} student={placement} />
                    ))}
                </div>

                {/* No Results */}
                {filteredPlacements.length === 0 && (
                    <div className="text-center py-12">
                        <FontAwesomeIcon icon={faSearch} className="text-6xl text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No placements found</h3>
                        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlacementList;
