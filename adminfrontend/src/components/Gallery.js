import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faImages, 
    faSearch, 
    faEye, 
    faDownload, 
    faCalendar,
    faSpinner,
    faPlus,
    faTimes,
    faExpand
} from '@fortawesome/free-solid-svg-icons';

function Gallery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [galleryImages, setGalleryImages] = useState([
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: "Campus Main Building",
      category: "campus",
      date: "2024-01-15"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: "Library Interior",
      category: "facilities",
      date: "2024-01-10"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: "Computer Lab",
      category: "labs",
      date: "2024-01-08"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: "Student Activities",
      category: "events",
      date: "2024-01-05"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: "Graduation Ceremony",
      category: "events",
      date: "2023-12-20"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: "Sports Complex",
      category: "facilities",
      date: "2023-12-15"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: "Student Hostel",
      category: "campus",
      date: "2023-12-10"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: "Tech Conference",
      category: "events",
      date: "2023-12-05"
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      caption: "Research Lab",
      category: "labs",
      date: "2023-12-01"
    }
  ]);
  const [filteredImages, setFilteredImages] = useState(galleryImages);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Filter images based on search term and category
  useEffect(() => {
    let filtered = galleryImages;
    
    if (searchTerm) {
      filtered = filtered.filter(img => 
        img.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
        img.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(img => img.category === selectedCategory);
    }
    
    setFilteredImages(filtered);
  }, [galleryImages, searchTerm, selectedCategory]);

  const categories = ["all", "campus", "facilities", "labs", "events"];

  const getCategoryColor = (category) => {
    switch(category) {
      case 'campus': return 'from-green-500 to-green-600';
      case 'facilities': return 'from-blue-500 to-blue-600';
      case 'labs': return 'from-purple-500 to-purple-600';
      case 'events': return 'from-orange-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStats = () => {
    const total = galleryImages.length;
    const byCategory = categories.slice(1).reduce((acc, cat) => {
      acc[cat] = galleryImages.filter(img => img.category === cat).length;
      return acc;
    }, {});
    return { total, byCategory };
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
                <FontAwesomeIcon icon={faImages} className="text-2xl" />
              </div>
              <h1 className="text-4xl font-bold">Gallery Management</h1>
            </div>
            <p className="text-xl text-blue-100 mb-8">
              Manage and organize campus images and media
            </p>
            
            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
              <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold mb-1">{stats.total}</div>
                <div className="text-blue-100 text-sm">Total Images</div>
              </div>
              {Object.entries(stats.byCategory).map(([category, count]) => (
                <div key={category} className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold mb-1">{count}</div>
                  <div className="text-blue-100 text-sm capitalize">{category}</div>
                </div>
              ))}
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
                placeholder="Search images by caption or category..."
              />
            </div>
            
            {/* Add New Image Button */}
            <button className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105 shadow-lg">
              <FontAwesomeIcon icon={faPlus} />
              <span>Add Image</span>
            </button>
          </div>
          
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <FontAwesomeIcon icon={faSpinner} className="text-4xl text-blue-600 animate-spin mb-4" />
              <p className="text-gray-600">Loading gallery...</p>
            </div>
          </div>
        ) : filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <GalleryItem 
                key={image.id} 
                image={image} 
                onView={() => setSelectedImage(image)}
                getCategoryColor={getCategoryColor}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon icon={faImages} className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {searchTerm || selectedCategory !== "all" ? "No matching images" : "No images found"}
            </h3>
            <p className="text-gray-600">
              {searchTerm || selectedCategory !== "all" 
                ? "Try adjusting your search or filter criteria" 
                : "No images have been uploaded yet"}
            </p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal 
          image={selectedImage} 
          onClose={() => setSelectedImage(null)}
          getCategoryColor={getCategoryColor}
        />
      )}
    </div>
  );
}

function GalleryItem({ image, onView, getCategoryColor }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <FontAwesomeIcon icon={faSpinner} className="text-2xl text-gray-400 animate-spin" />
          </div>
        )}
        
        {imageError ? (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <FontAwesomeIcon icon={faImages} className="text-4xl text-gray-400" />
          </div>
        ) : (
          <img 
            src={image.src} 
            alt={image.caption}
            className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
        
        {/* Category Badge */}
        <div className={`absolute top-3 left-3 bg-gradient-to-r ${getCategoryColor(image.category)} text-white px-2 py-1 rounded-full text-xs font-semibold`}>
          {image.category.charAt(0).toUpperCase() + image.category.slice(1)}
        </div>
        
        {/* Overlay with Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-3">
            <button
              onClick={onView}
              className="bg-white bg-opacity-90 text-gray-800 p-3 rounded-full hover:bg-opacity-100 transition-all duration-200 transform hover:scale-110"
              title="View Image"
            >
              <FontAwesomeIcon icon={faEye} />
            </button>
            <button
              onClick={() => window.open(image.src, '_blank')}
              className="bg-white bg-opacity-90 text-gray-800 p-3 rounded-full hover:bg-opacity-100 transition-all duration-200 transform hover:scale-110"
              title="Download Image"
            >
              <FontAwesomeIcon icon={faDownload} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Image Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{image.caption}</h3>
        <div className="flex items-center text-sm text-gray-500">
          <FontAwesomeIcon icon={faCalendar} className="mr-2" />
          <span>{new Date(image.date).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}

// Image Modal Component
function ImageModal({ image, onClose, getCategoryColor }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className={`bg-gradient-to-r ${getCategoryColor(image.category)} text-white p-4 flex items-center justify-between`}>
          <div>
            <h2 className="text-xl font-bold">{image.caption}</h2>
            <p className="text-sm opacity-90">{image.category.charAt(0).toUpperCase() + image.category.slice(1)} • {new Date(image.date).toLocaleDateString()}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faTimes} className="text-xl" />
          </button>
        </div>
        
        {/* Modal Body */}
        <div className="p-6">
          <div className="relative">
            <img 
              src={image.src} 
              alt={image.caption}
              className="w-full max-h-[60vh] object-contain rounded-lg"
            />
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={() => window.open(image.src, '_blank')}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faExpand} />
              <span>View Full Size</span>
            </button>
            <button
              onClick={() => window.open(image.src, '_blank')}
              className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faDownload} />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
