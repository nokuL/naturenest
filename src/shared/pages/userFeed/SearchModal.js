import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Star, Filter } from 'lucide-react';

const SearchModal = ({ show, onClose, onSelectPlace, places = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [searchResults, setSearchResults] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const searchInputRef = useRef(null);

  // Sample data - replace with your actual places data
  const samplePlaces = [
    {
      id: 1,
      title: "Mountain View Cafe",
      description: "Cozy cafe with stunning mountain views",
      address: "123 Highland Ave, Mountain View",
      category: "restaurant",
      rating: 4.5,
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      title: "Sunset Beach",
      description: "Beautiful beach perfect for watching sunsets",
      address: "456 Coastal Rd, Sunset Bay",
      category: "attraction",
      rating: 4.8,
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      title: "Grand Hotel",
      description: "Luxury hotel in the heart of the city",
      address: "789 Downtown St, City Center",
      category: "hotel",
      rating: 4.2,
      image: "/api/placeholder/300/200"
    },
    {
      id: 4,
      title: "Adventure Park",
      description: "Family-friendly park with hiking trails",
      address: "321 Forest Lane, Pine Valley",
      category: "attraction",
      rating: 4.6,
      image: "/api/placeholder/300/200"
    }
  ];

  const dataToSearch = places.length > 0 ? places : samplePlaces;

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'restaurant', label: 'Restaurants' },
    { value: 'hotel', label: 'Hotels' },
    { value: 'attraction', label: 'Attractions' },
    { value: 'shopping', label: 'Shopping' }
  ];

  const ratings = [
    { value: 'all', label: 'All Ratings' },
    { value: '4+', label: '4+ Stars' },
    { value: '3+', label: '3+ Stars' },
    { value: '2+', label: '2+ Stars' }
  ];

  // Filter and search logic
  useEffect(() => {
    let filtered = dataToSearch;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(place => 
        place.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(place => place.category === selectedCategory);
    }

    // Filter by rating
    if (selectedRating !== 'all') {
      const minRating = parseFloat(selectedRating);
      filtered = filtered.filter(place => place.rating >= minRating);
    }

    setSearchResults(filtered);
  }, [searchQuery, selectedCategory, selectedRating, dataToSearch]);

  const handleSelectPlace = (place) => {
    onSelectPlace(place);
    resetSearch();
    onClose();
  };

  const resetSearch = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedRating('all');
    setSearchResults([]);
    setShowFilters(false);
  };

  const handleClose = () => {
    resetSearch();
    onClose();
  };

  // Focus search input when modal opens
  useEffect(() => {
    if (show && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-mountain/30">
          <h2 className="text-xl font-semibold text-forest-dark">Search Places</h2>
          <button 
            onClick={handleClose}
            className="text-mountain-dark hover:text-forest text-xl"
          >
            &times;
          </button>
        </div>
        
        {/* Search Input */}
        <div className="p-6 border-b border-mountain/30">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-mountain-dark w-5 h-5" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search places, descriptions, or addresses..."
              className="w-full pl-10 pr-4 py-2 border border-mountain/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest/30"
            />
          </div>
          
          {/* Filter Toggle */}
          <div className="flex justify-between items-center mt-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-forest hover:text-forest-light"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            <span className="text-sm text-mountain-dark">
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          {/* Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-forest-dark mb-1 text-sm">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border border-mountain/30 rounded"
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-forest-dark mb-1 text-sm">Rating</label>
                  <select
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}
                    className="w-full p-2 border border-mountain/30 rounded"
                  >
                    {ratings.map(rating => (
                      <option key={rating.value} value={rating.value}>
                        {rating.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Results */}
        <div className="flex-1 overflow-y-auto p-6">
          {searchResults.length > 0 ? (
            <div className="space-y-4">
              {searchResults.map(place => (
                <div
                  key={place.id}
                  onClick={() => handleSelectPlace(place)}
                  className="flex items-start space-x-4 p-4 border border-mountain/30 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-forest/20 to-mountain/20 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-forest" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-forest-dark truncate">
                          {place.title}
                        </h3>
                        <p className="text-sm text-mountain-dark mt-1">
                          {place.description}
                        </p>
                        <div className="flex items-center space-x-1 mt-2">
                          <MapPin className="w-4 h-4 text-mountain-dark" />
                          <span className="text-xs text-mountain-dark">
                            {place.address}
                          </span>
                        </div>
                      </div>
                      
                      {place.rating && (
                        <div className="flex items-center space-x-1 flex-shrink-0">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-mountain-dark">
                            {place.rating}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-mountain/40 mx-auto mb-4" />
              <p className="text-mountain-dark">
                {searchQuery ? 'No places found matching your search.' : 'Start typing to search for places...'}
              </p>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-mountain/30">
          <button
            onClick={handleClose}
            className="px-4 py-2 border border-mountain/30 text-mountain-dark rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;