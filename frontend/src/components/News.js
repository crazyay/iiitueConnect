import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCalendarAlt, 
    faClock, 
    faMapMarkerAlt,
    faUsers,
    faImage,
    faNewspaper
} from '@fortawesome/free-solid-svg-icons';

const News = () => {
  // Sample data for upcoming events, photos, and past events
  const upcomingEvents = [
    { 
      id: 1, 
      title: "Annual Tech Fest 2024", 
      date: "March 25, 2024", 
      time: "10:00 AM",
      location: "Main Auditorium",
      description: "Join us for the biggest tech event of the year featuring competitions, workshops, and guest speakers from top tech companies.",
      category: "Event",
      attendees: 500
    },
    { 
      id: 2, 
      title: "Placement Drive - TCS", 
      date: "April 10, 2024", 
      time: "9:00 AM",
      location: "Placement Cell",
      description: "TCS will be conducting campus recruitment for final year students. Eligible students should register by April 5th.",
      category: "Placement",
      attendees: 150
    },
    { 
      id: 3, 
      title: "Research Symposium", 
      date: "April 15, 2024", 
      time: "2:00 PM",
      location: "Conference Hall",
      description: "Annual research symposium showcasing innovative projects by students and faculty members.",
      category: "Academic",
      attendees: 200
    }
  ];

  const photos = [
    { 
      id: 1, 
      url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", 
      title: "Campus Life",
      description: "Students enjoying campus activities and events" 
    },
    { 
      id: 2, 
      url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", 
      title: "Academic Excellence",
      description: "State-of-the-art laboratories and learning facilities" 
    },
    { 
      id: 3, 
      url: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", 
      title: "Innovation Hub",
      description: "Students working on cutting-edge technology projects" 
    }
  ];

  const pastEvents = [
    { 
      id: 1, 
      title: "Hackathon 2024", 
      date: "March 10, 2024", 
      description: "48-hour coding marathon with participants from across the region. Winner team received ₹50,000 prize money.",
      category: "Competition",
      participants: 120
    },
    { 
      id: 2, 
      title: "Industry Expert Lecture Series", 
      date: "February 28, 2024", 
      description: "Guest lecture by Google Senior Engineer on 'Future of AI and Machine Learning in Industry'.",
      category: "Lecture",
      participants: 300
    },
    { 
      id: 3, 
      title: "Cultural Fest - Techno Cultural", 
      date: "February 15, 2024", 
      description: "Three-day cultural extravaganza featuring music, dance, drama, and art competitions.",
      category: "Cultural",
      participants: 800
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      'Event': 'bg-blue-100 text-blue-800',
      'Placement': 'bg-green-100 text-green-800',
      'Academic': 'bg-purple-100 text-purple-800',
      'Competition': 'bg-orange-100 text-orange-800',
      'Lecture': 'bg-indigo-100 text-indigo-800',
      'Cultural': 'bg-pink-100 text-pink-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FontAwesomeIcon icon={faNewspaper} className="text-5xl mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">News & Events</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Stay updated with the latest happenings, events, and announcements at IIIT Una
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Upcoming Events Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-3 text-blue-600" />
              Upcoming Events
            </h2>
            <p className="text-lg text-gray-600">Don't miss out on these exciting upcoming events</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map(event => (
              <div key={event.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <FontAwesomeIcon icon={faUsers} className="mr-1" />
                      {event.attendees}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{event.title}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-blue-500" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <FontAwesomeIcon icon={faClock} className="mr-2 text-blue-500" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-blue-500" />
                      {event.location}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>
                  
                  <button className="mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Campus Gallery Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              <FontAwesomeIcon icon={faImage} className="mr-3 text-blue-600" />
              Campus Gallery
            </h2>
            <p className="text-lg text-gray-600">Glimpses of life at IIIT Una</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photos.map(photo => (
              <div key={photo.id} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="aspect-w-16 aspect-h-12">
                  <img 
                    src={photo.url} 
                    alt={photo.description} 
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-lg font-bold mb-2">{photo.title}</h3>
                    <p className="text-sm text-gray-200">{photo.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Past Events Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Past Events
            </h2>
            <p className="text-lg text-gray-600">Highlights from our recent events and activities</p>
          </div>
          
          <div className="space-y-6">
            {pastEvents.map(event => (
              <div key={event.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold mr-3 ${getCategoryColor(event.category)}`}>
                        {event.category}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <FontAwesomeIcon icon={faUsers} className="mr-1" />
                        {event.participants} participants
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-3">{event.description}</p>
                    
                    <div className="flex items-center text-gray-500 text-sm">
                      <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-blue-500" />
                      {event.date}
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-lg transition-colors duration-200">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default News;
