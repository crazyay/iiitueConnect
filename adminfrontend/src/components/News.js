import React from 'react';
import Gallery from './Gallery';
const News = () => {
  // Sample data for upcoming events, photos, and past events
  const upcomingEvents = [
    { id: 1, title: "Upcoming Event 1", date: "March 25, 2024", description: "Description of the upcoming event 1." },
    { id: 2, title: "Upcoming Event 2", date: "April 10, 2024", description: "Description of the upcoming event 2." }
  ];

  const photos = [
    { id: 1, url: "https://iiitu.ac.in/wp-content/uploads/2022/02/WhatsApp-Image-2022-10-15-at-3.08.22-PM-768x512.jpeg", description: "Description of photo 1." },
    { id: 2, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFQMiLMJ1ZqlFRArU4Y-spTDY0K4oEHibWr8zntuNQPQ&s", description: "Description of photo 2." },
    { id: 3, url: "https://iiitu.ac.in/wp-content/uploads/2022/11/IMG_3524-768x512.jpg", description: "Description of photo 3." }
  ];

  const pastEvents = [
    { id: 1, title: "Past Event 1", date: "March 10, 2024", description: "Description of the past event 1." },
    { id: 2, title: "Past Event 2", date: "February 28, 2024", description: "Description of the past event 2." }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">News</h2>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Upcoming Events</h3>
        <ul>
          {upcomingEvents.map(event => (
            <li key={event.id} className="mb-4">
              <h4 className="text-lg font-semibold">{event.title}</h4>
              <p className="text-sm text-gray-600">{event.date}</p>
              <p className="mt-2">{event.description}</p>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Photos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {photos.map(photo => (
            <div key={photo.id} className="flex flex-col items-center">
              <img src={photo.url} alt={photo.description} className="w-full h-auto rounded-lg" style={{ maxWidth: '100%', height: 'auto', minHeight: '200px', objectFit: 'cover' }} />
              <p className="mt-2">{photo.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Past Events</h3>
        <ul>
          {pastEvents.map(event => (
            <li key={event.id} className="mb-4">
              <h4 className="text-lg font-semibold">{event.title}</h4>
              <p className="text-sm text-gray-600">{event.date}</p>
              <p className="mt-2">{event.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Photos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {photos.map(photo => (
            <div key={photo.id} className="flex flex-col items-center">
              <img src={photo.url} alt={photo.description} className="w-full h-auto rounded-lg" style={{ maxWidth: '100%', height: 'auto', minHeight: '200px', objectFit: 'cover' }} />
              <p className="mt-2">{photo.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
