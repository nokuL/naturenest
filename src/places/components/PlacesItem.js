import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Card from "../../users/components/UIElements/Card";
import Button from "../../shared/component/FormElements/Button";
import Modal from "../../users/components/UIElements/Modal";
import { AuthContext } from '../../shared/context/authContext';
import Map from '../../users/components/UIElements/Map';
import { useHttpClient } from '../../shared/hooks/http-hooks';
import EditPlaceModal from '../../shared/pages/userFeed/EditPlaceModal';
import mountainView from '../../assets/images/beautiful-background-td7gsxerv3ecl20h.jpg';
import FeedbackPopup from '../../shared/component/Feedback/Feedback';


const PlaceItem = props => {
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
      const userId = useParams().userId;
  
     const [feedback, setFeedback] = useState({
          visible: false,
          message: '',
          type: 'success'
      });

  
  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  const showDeleteWarningHandler = () => setShowConfirmModal(true);
  const cancelDeleteWarningHandler = () => setShowConfirmModal(false);
  
  const handleImageLoad = () => {
    setImageLoading(false);
  };
  
  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };
  const showFeedback = (message, type = 'success') => {
    setFeedback({
        visible: true,
        message,
        type
    });
};

const closeFeedback = () => {
    setFeedback(prev => ({
        ...prev,
        visible: false
    }));
};
  
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const handleEditPlaceModalSHow = () => {
    setShowEditModal(true);
  }


  const handleEditPlace = async (placeData) => {
    try {
        console.log('PlaceData received from modal%%%%%%%%%%%%%%%%%%:', placeData);
        
        // Validate required fields
        if (!placeData.title || !placeData.description || !placeData.address) {
            console.error('Missing required fields');
            showFeedback('Please fill in all required fields', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('title', placeData.title);
        formData.append('description', placeData.description);
        formData.append('address', placeData.address);
        
        // Only append image if a new one is provided
        if (placeData.image && placeData.image instanceof File) {
            formData.append('image', placeData.image);
        }
        
        // Include the place ID and creator info
        formData.append('creator', placeData.creator || userId);

        const responseData = await sendRequest(
            `http://localhost:5000/api/places/${placeData.id}`, // Use the place ID in the URL
            'PATCH', // Use PATCH for updates
            {
                Authorization: 'Bearer ' + auth.token
            },
            formData
        );

        console.log('Response from server:', responseData);

        // Refresh the places list and close modal
        props.fetchPlaces();
        setShowEditModal(false);
        showFeedback('Place successfully updated!', 'success');

    } catch (err) {
        console.error('Error updating place:', err);
        showFeedback('Failed to update place. Please try again.', 'error');
    }
};
  
  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${props.id}`,
        'DELETE',
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.token
        },
        null
      );
      props.onDelete(props.id);
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <React.Fragment>
      {/* Map Modal */}
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.title}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<button onClick={closeMapHandler}   className="px-4 py-2 rounded-md bg-forest text-white font-medium hover:bg-forest-light transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg flex items-center"
>CLOSE</button>}
      >
        <div className="map-container h-64 rounded-md overflow-hidden">
          <Map center={props.coordinates} zoom={16}></Map>
        </div>
      </Modal>
      <FeedbackPopup
                visible={feedback.visible}
                message={feedback.message}
                type={feedback.type}
                onClose={closeFeedback}
                timeout={3000}
            />
      
      {/* Delete Confirmation Modal */}
      <Modal 
        show={showConfirmModal}
        onCancel={cancelDeleteWarningHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <div className="flex flex-row gap-2 justify-center">
            <button onClick={cancelDeleteWarningHandler}  className="px-4 py-2 rounded-md bg-forest text-white font-medium hover:bg-forest-light transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg flex items-center"
            >CANCEL</button>
            <button onClick={confirmDeleteHandler} disabled={isLoading} 
            className="px-4 py-2 rounded-md bg-red-500 text-white font-medium hover:bg-red-600 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg flex items-center"
            >
              {isLoading ? 'DELETING...' : 'DELETE'}
            </button>
            </div>
          </React.Fragment>
        }
      >
        <p className="text-mountain-dark">Are you sure you want to proceed and delete this place? This action cannot be undone.</p>
      </Modal>
      <EditPlaceModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditPlace}
        initialData={props}
      >

      </EditPlaceModal>
      
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-200 text-red-800 p-4 mb-4 rounded-lg">
          <p>{error}</p>
          <Button onClick={clearError} className="mt-2 bg-white text-red-600 border border-red-300 hover:bg-red-50">Dismiss</Button>
        </div>
      )}
      
      {/* Main Place Item Card */}
      <li className="place-item mb-6">
        <Card className="overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-mountain/10">
          <div className="flex flex-col">
            {/* Image Section - Full width like social media */}
            <div className="place-item__image w-full">
              <div className="relative h-96 overflow-hidden">
                {/* Loading Spinner */}
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-mountain border-t-forest"></div>
                  </div>
                )}
                
                {/* Error State */}
                {imageError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10">
                    <svg className="w-16 h-16 text-mountain" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                    <p className="mt-2 text-mountain-dark">Failed to load image</p>
                  </div>
                )}
                
                {/* Image with smooth transition */}
                <img 
                  src={props.image} 
                  alt={props.title}
                  className={`absolute h-full w-full object-cover transition-all duration-500 hover:scale-105 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col w-full">
              {/* Info Section - Social media style */}
              <div className="p-5 flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-forest flex items-center justify-center text-white font-bold mr-3">
                      {props.title[0].toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-forest-dark">{props.title}</h2>
                      <h3 className="text-xs font-medium text-mountain flex items-center">
                        <svg className="w-3 h-3 mr-1 text-mountain" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        {props.address}
                      </h3>
                    </div>
                  </div>
                  <span className="bg-sky/10 text-sky-dark text-xs px-2 py-1 rounded-full">Place</span>
                </div>
                <div className="text-mountain-dark mb-4">
                  <p>{props.description}</p>
                </div>
                <div className="flex items-center text-xs text-mountain">
                  <span className="mr-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    0 likes
                  </span>
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    0 comments
                  </span>
                </div>
              </div>
              
              {/* Actions Section - Social media style */}
              <div className="px-5 py-3 border-t border-mountain/10 flex flex-wrap items-center justify-between">
                <div className="flex gap-4">
                  <button className="text-mountain hover:text-forest flex items-center transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <button className="text-mountain hover:text-sky flex items-center transition-colors" onClick={openMapHandler}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                    </svg>
                  </button>
                  <button className="text-mountain hover:text-sky flex items-center transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                </div>
                
                {auth.isLoggedIn && (
                  <div className="flex gap-4">
                    <button 
                      onClick={handleEditPlaceModalSHow}
                      to={`/places/${props.id}`}
                      className="text-mountain hover:text-forest flex items-center transition-colors" 
                      title="Edit Place"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                    
                    <button 
                      onClick={showDeleteWarningHandler}
                      className="text-mountain hover:text-red-500 flex items-center transition-colors"
                      
                      title="Delete Place"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              
            {/*   {/* View on Map button - Larger, more prominent */}
            
            </div>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;