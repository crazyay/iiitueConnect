import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faNewspaper, 
    faSearch, 
    faCalendarAlt, 
    faEye, 
    faEdit, 
    faTrash,
    faPlus,
    faSpinner,
    faClock,
    faMapMarkerAlt,
    faUsers,
    faFilter,
    faImage
} from '@fortawesome/free-solid-svg-icons';
const News = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("upcoming");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Sample data for news and events
  const newsData = {
    upcoming: [
      { 
        id: 1, 
        title: "Annual Tech Symposium 2024", 
        date: "2024-03-25", 
        time: "10:00 AM", 
        location: "Main Auditorium", 
        description: "Join us for an exciting tech symposium featuring industry leaders and innovative presentations on emerging technologies.", 
        category: "academic",
        attendees: 200,
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      { 
        id: 2, 
        title: "Cultural Fest Registration", 
        date: "2024-04-10", 
        time: "9:00 AM", 
        location: "Student Center", 
        description: "Registration opens for the annual cultural festival. Don't miss out on showcasing your talents!", 
        category: "cultural",
        attendees: 500,
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      { 
        id: 3, 
        title: "Career Fair 2024", 
        date: "2024-04-15", 
        time: "11:00 AM", 
        location: "Sports Complex", 
        description: "Meet with top recruiters and explore career opportunities across various industries.", 
        category: "career",
        attendees: 300,
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ],
    past: [
      { 
        id: 4, 
        title: "Hackathon 2024 Winners", 
        date: "2024-03-10", 
        time: "6:00 PM", 
        location: "Computer Lab", 
        description: "Congratulations to all participants and winners of the 48-hour coding challenge.", 
        category: "academic",
        attendees: 150,
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      { 
        id: 5, 
        title: "Sports Day Championship", 
        date: "2024-02-28", 
        time: "8:00 AM", 
        location: "Sports Ground", 
        description: "Annual sports day concluded with record-breaking performances and team spirit.", 
        category: "sports",
        attendees: 400,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      },
      { 
        id: 6, 
        title: "Alumni Meet 2024", 
        date: "2024-02-15", 
        time: "5:00 PM", 
        location: "Main Hall", 
        description: "Successful alumni gathering with networking sessions and inspiring talks.", 
        category: "networking",
        attendees: 250,
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      }
    ]
  };

  const [filteredNews, setFilteredNews] = useState(newsData[selectedTab]);

  // Filter news based on search term and category
  useEffect(() => {
    let filtered = newsData[selectedTab];
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    setFilteredNews(filtered);
  }, [selectedTab, searchTerm, selectedCategory]);

  const categories = ["all", "academic", "cultural", "career", "sports", "networking"];

  const getCategoryColor = (category) => {
    switch(category) {
      case 'academic': return 'from-blue-500 to-blue-600';
      case 'cultural': return 'from-purple-500 to-purple-600';
      case 'career': return 'from-green-500 to-green-600';
      case 'sports': return 'from-orange-500 to-orange-600';
      case 'networking': return 'from-indigo-500 to-indigo-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStats = () => {
    const upcomingCount = newsData.upcoming.length;
    const pastCount = newsData.past.length;
    const totalAttendees = [...newsData.upcoming, ...newsData.past].reduce((sum, event) => sum + event.attendees, 0);
    return { upcomingCount, pastCount, totalAttendees };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faNewspaper} className="text-2xl" />
              </div>
              <h1 className="text-4xl font-bold">News & Events Management</h1>
            </div>
            <p className="text-xl text-blue-100 mb-8">
              Manage campus news, events, and announcements
            </p>
            
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2">{stats.upcomingCount}</div>
                <div className="text-blue-100">Upcoming Events</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2">{stats.pastCount}</div>
                <div className="text-blue-100">Past Events</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <div className="text-3xl font-bold mb-2">{stats.totalAttendees}</div>
                <div className="text-blue-100">Total Attendees</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Search events by title, description, or location..."
              />
            </div>
            
            {/* Category Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faFilter} className="text-gray-400" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Add New Event Button */}
            <button className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105 shadow-lg">
              <FontAwesomeIcon icon={faPlus} />
              <span>Add Event</span>
            </button>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setSelectedTab("upcoming")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all duration-200 ${
                selectedTab === "upcoming"
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setSelectedTab("past")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all duration-200 ${
                selectedTab === "past"
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Past Events
            </button>
          </div>
        </div>

        {/* Events Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <FontAwesomeIcon icon={faSpinner} className="text-4xl text-blue-600 animate-spin mb-4" />
              <p className="text-gray-600">Loading events...</p>
            </div>
          </div>
        ) : filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                getCategoryColor={getCategoryColor}
                isPast={selectedTab === "past"}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faNewspaper} className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {searchTerm || selectedCategory !== "all" ? "No matching events" : "No events found"}
            </h3>
            <p className="text-gray-600">
              {searchTerm || selectedCategory !== "all" 
                ? "Try adjusting your search or filter criteria" 
                : `No ${selectedTab} events available`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Event Card Component
function EventCard({ event, getCategoryColor, isPast }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <FontAwesomeIcon icon={faSpinner} className="text-2xl text-gray-400 animate-spin" />
          </div>
        )}
        
        {imageError ? (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <FontAwesomeIcon icon={faImage} className="text-4xl text-gray-400" />
          </div>
        ) : (
          <img 
            src={event.image} 
            alt={event.title}
            className={`w-full h-full object-cover transition-all duration-300 hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
        
        {/* Category Badge */}
        <div className={`absolute top-3 left-3 bg-gradient-to-r ${getCategoryColor(event.category)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
        </div>
        
        {/* Status Badge */}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold ${
          isPast ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'
        }`}>
          {isPast ? 'Completed' : 'Upcoming'}
        </div>
      </div>
      
      {/* Event Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{event.title}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-3 text-sm" />
            <span className="text-sm">{new Date(event.date).toLocaleDateString()} at {event.time}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-3 text-sm" />
            <span className="text-sm">{event.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <FontAwesomeIcon icon={faUsers} className="mr-3 text-sm" />
            <span className="text-sm">{event.attendees} attendees</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-6 line-clamp-3">{event.description}</p>
        
        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            <FontAwesomeIcon icon={faEye} className="text-sm" />
            <span>View Details</span>
          </button>
          <button className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200">
            <FontAwesomeIcon icon={faEdit} className="text-sm" />
          </button>
          <button className="flex items-center justify-center space-x-2 bg-red-100 text-red-600 py-2 px-4 rounded-lg hover:bg-red-200 transition-colors duration-200">
            <FontAwesomeIcon icon={faTrash} className="text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default News;
