import React, { useState, useRef, useEffect } from 'react';

const EditPlaceModal = ({ show, onClose, onSubmit, initialData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  

  // Set initial values when the modal opens or initialData changes
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setAddress(initialData.address || '');
      // We don't set the image since we can't pre-fill a file input
      // User can choose to upload a new image or keep the existing one
    }
  }, [initialData, show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if form is valid (except image which is optional for editing)
    if (!title || !description || !address) {
      console.error('Please fill all required fields');
      return;
    }
    
    // Log the data before submitting to verify
    console.log('Form data before submission:', {
      title,
      description,
      address,
      image: image ? {
        name: image.name,
        type: image.type,
        size: image.size
      } : 'No new image'
    });
    
    // Submit form data to parent component
    // If image is null, the existing image will be kept
    onSubmit({ id: initialData.id, title, description, address, image });
    
    // Don't reset form after submission for editing
    // as user may want to make additional edits
    onClose();
  };

  const resetForm = () => {
    // Reset to initial values instead of empty
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setAddress(initialData.address || '');
    } else {
      setTitle('');
      setDescription('');
      setAddress('');
    }
    
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-forest-dark">Edit Place</h2>
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
          <div className="mb-4">
            <label className="block text-forest-dark mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-mountain/30 rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-forest-dark mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-mountain/30 rounded h-24"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-forest-dark mb-1">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border border-mountain/30 rounded"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-forest-dark mb-1">Image (Optional)</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                console.log("Selected file:", e.target.files[0]);
                setImage(e.target.files[0]);
              }}
              className="w-full p-2 border border-mountain/30 rounded"
              accept="image/*"
            />
            <p className="text-xs text-mountain-dark mt-1">
              Leave empty to keep current image
            </p>
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
              className="px-4 py-2 bg-sky text-white rounded hover:bg-sky-light"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPlaceModal;