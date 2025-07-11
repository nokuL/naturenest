import React, { useState, useRef } from 'react';


const AddPlaceModal = ({ show, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);



  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if form is valid
    if (!title || !description || !address || !image) {
     console.error('Please fill all fields and select an image');
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
      } : 'No image'
    });
    
    // Submit form data to parent component
    onSubmit({ title, description, address, image });
    
    // Reset form after submission
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setAddress('');
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
          <h2 className="text-xl font-semibold text-forest-dark">Add New Place</h2>
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
            <label className="block text-forest-dark mb-1">Image</label>
            <input
              type="file"
              onChange={(e) =>{ 
                setImage(e.target.files[0])}}
              className="w-full p-2 border border-mountain/30 rounded"
              accept="image/*"
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
              Add Place
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddPlaceModal;