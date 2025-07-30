import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faImages, 
    faTimes, 
    faChevronLeft, 
    faChevronRight,
    faExpand
} from '@fortawesome/free-solid-svg-icons';

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Innovation Lab",
      category: "Academics",
      description: "Students working on cutting-edge technology projects"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Campus Life",
      category: "Student Life",
      description: "Students enjoying campus activities and events"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Modern Classrooms",
      category: "Infrastructure",
      description: "State-of-the-art learning facilities"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Computer Lab",
      category: "Academics",
      description: "Advanced computing facilities for students"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Library",
      category: "Infrastructure",
      description: "Comprehensive library with digital resources"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Team Collaboration",
      category: "Student Life",
      description: "Students collaborating on group projects"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1529390079861-591de354faf5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Campus Architecture",
      category: "Infrastructure",
      description: "Beautiful modern campus buildings"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Research Lab",
      category: "Academics",
      description: "Advanced research facilities and equipment"
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      title: "Graduation Ceremony",
      category: "Events",
      description: "Annual graduation ceremony celebration"
    }
  ];

  const categories = ['All', 'Academics', 'Student Life', 'Infrastructure', 'Events'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredImages = activeCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const openModal = (image, index) => {
    setSelectedImage(image);
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (selectedIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
    setSelectedIndex(nextIndex);
  };

  const prevImage = () => {
    const prevIndex = selectedIndex === 0 ? filteredImages.length - 1 : selectedIndex - 1;
    setSelectedImage(filteredImages[prevIndex]);
    setSelectedIndex(prevIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FontAwesomeIcon icon={faImages} className="text-5xl mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Campus Gallery</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Explore the vibrant life and modern facilities at IIIT Una through our photo gallery
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <GalleryItem 
              key={image.id} 
              image={image} 
              index={index}
              onClick={() => openModal(image, index)}
            />
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              >
                <FontAwesomeIcon icon={faTimes} className="text-2xl" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="text-3xl" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <FontAwesomeIcon icon={faChevronRight} className="text-3xl" />
              </button>

              {/* Image */}
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full max-h-full object-contain"
              />

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
                <h3 className="text-xl font-bold mb-2">{selectedImage.title}</h3>
                <p className="text-sm text-gray-300 mb-2">{selectedImage.description}</p>
                <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {selectedImage.category}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function GalleryItem({ image, index, onClick }) {
  return (
    <div 
      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-w-4 aspect-h-3">
        <img
          src={image.src}
          alt={image.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-lg font-bold mb-1">{image.title}</h3>
          <p className="text-sm text-gray-200 mb-2">{image.description}</p>
          <span className="inline-block bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
            {image.category}
          </span>
        </div>
        
        {/* Expand Icon */}
        <div className="absolute top-4 right-4">
          <FontAwesomeIcon icon={faExpand} className="text-white text-lg" />
        </div>
      </div>
    </div>
  );
}

export default Gallery;
