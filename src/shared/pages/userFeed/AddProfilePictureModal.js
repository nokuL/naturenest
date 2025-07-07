import React, { useState, useRef } from 'react';

const AddProfilePictureModal = ({ show, onClose, onSubmit }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if form is valid
    if (!image) {
      console.error('Please select an image');
      return;
    }
    
    // Log the data before submitting to verify
    console.log('Form data before submission:', {
      image: image ? {
        name: image.name,
        type: image.type,
        size: image.size
      } : 'No image'
    });
    
    // Submit form data to parent component
    onSubmit({ image });
    
    // Reset form after submission
    resetForm();
  };

  const resetForm = () => {
    setImage(null);
    setPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-forest-dark">Add Profile Picture</h2>
          <button 
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="text-mountain-dark hover:text-forest text-xl"
          >
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Image Preview */}
          {preview && (
            <div className="mb-4 flex justify-center">
              <div className="w-32 h-32 relative">
                <img
                  src={preview}
                  alt="Profile preview"
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
                />
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <label className="block text-forest-dark mb-1">Image</label>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleImageChange}
              className="w-full p-2 border border-mountain/30 rounded"
              accept="image/*"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="px-4 py-2 border border-mountain/30 text-mountain-dark rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-forest text-white rounded hover:bg-forest-light"
            >
              Add Picture
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProfilePictureModal;