import React, { useEffect, useState, useRef } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { useContext } from 'react';

import PlacesList from '../../../places/components/PlacesList';
import { AuthContext } from '../../../shared/context/authContext';
import { useHttpClient } from '../../../shared/hooks/http-hooks';
import ErrorModal from '../../../users/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../users/components/UIElements/LoadingSpinner';
import AddPlaceModal from './AddPlaceModal';
import FeedbackPopup from '../../component/Feedback/Feedback';
function UserFeed() {
    const [places, setPlaces] = useState([]);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const userId = useParams().userId;
    const token = auth.token;
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const [feedback, setFeedback] = useState({
        visible: false,
        message: '',
        type: 'success'
    });
    const mountedRef = useRef(true);


    const Dummy_Places = [{
        id: '1',
        title: 'Test Place',
        description: 'Test Description',
        image: 'test.jpg',
        creator: 'u1',
        location: { lat: 0, lng: 0 },
        address: '123 Test Street'
    }];

    useEffect(() => {
        return () => {
          mountedRef.current = false;
        };
      }, []);

    const handleNewPlace = () => {
        setShowModal(true); // Show modal instead of redirecting
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

    const handleAddPlace = async (placeData) => {
        try {
            console.log('PlaceData received from modal:', placeData);

            if (!placeData.image) {
                console.error('No image selected');
                showFeedback('Please select an image for your place', 'error');
                return;
            }

            const formData = new FormData();
            formData.append('title', placeData.title);
            formData.append('description', placeData.description);
            formData.append('address', placeData.address);
            formData.append('image', placeData.image);
            formData.append('creator', userId);

            const responseData = await sendRequest(
                'http://localhost:5000/api/places',
                'POST',
                {
                    Authorization: 'Bearer ' + auth.token
                },
                formData
            );

            console.log('Response from server:', responseData);

            // Only update state after successful request
            setPlaces(prevPlaces => [responseData.place, ...prevPlaces]);
            setShowModal(false);
            showFeedback('Place successfully added!', 'success');
        } catch (err) {
            console.error('Error adding place:', err);
            showFeedback('Failed to add place. Please try again.', 'error');
        }
    };

   
    useEffect(() => {
        const fetchPlaces = async () => {
          try {
            const responseData = await sendRequest(
              `http://localhost:5000/api/places/user/${userId}`
            );
            console.log('Fetched places::::::::', responseData.places);

            setPlaces(responseData.places);

            
            // Only update state if component is still mounted
          /*   if (mountedRef.current) {
                console.log("unmounted here ????????????")
              setPlaces(responseData.places);
            } */
          } catch (err) {
            // Only handle errors if component is mounted and it's not an abort error
            if (mountedRef.current && err.name !== 'AbortError') {
              console.error('Error fetching places:', err);
              showFeedback('Failed to load places', 'error');
            }
          }
        };
    
        fetchPlaces();
    
        return () => {
          // Cleanup function for this specific effect
          mountedRef.current = false;
        };
      }, [sendRequest, userId]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverLay />}
            <AddPlaceModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleAddPlace}
            />
            <FeedbackPopup
                visible={feedback.visible}
                message={feedback.message}
                type={feedback.type}
                onClose={closeFeedback}
                timeout={3000}
            />

            {/* Main container with responsive flexbox grid */}
            <div className="container mx-auto px-4 py-6 bg-gray-50">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left sidebar - small column */}
                    <div className="lg:w-1/5 bg-white p-4 rounded-lg shadow border border-mountain/10">
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold mb-3 text-forest-dark">Navigation</h2>
                            <ul className="space-y-2">
                                <li className="p-2 bg-sky-light/20 text-forest rounded-md cursor-pointer hover:bg-sky-light/30 transition-colors">Feed</li>
                                <li className="p-2 hover:bg-sky-light/20 rounded-md cursor-pointer transition-colors">My Places</li>
                                <li className="p-2 hover:bg-sky-light/20 rounded-md cursor-pointer transition-colors">Favorites</li>
                                <li className="p-2 hover:bg-sky-light/20 rounded-md cursor-pointer transition-colors">Explore</li>
                            </ul>
                        </div>
                        <div className="border-t border-mountain/20 pt-4">
                            <h3 className="text-lg font-medium mb-2 text-forest">Trending Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                <span className="bg-sky/10 text-sky-dark px-2 py-1 rounded-full text-sm">#Travel</span>
                                <span className="bg-forest/10 text-forest px-2 py-1 rounded-full text-sm">#Food</span>
                                <span className="bg-mountain/10 text-mountain-dark px-2 py-1 rounded-full text-sm">#Adventure</span>
                            </div>
                        </div>
                    </div>

                    {/* Main content - medium column */}
                    <div className="lg:w-3/5 bg-white p-4 rounded-lg shadow border border-mountain/10">
                        <h1 className="text-2xl font-bold mb-4 border-b border-mountain/20 pb-2 text-forest">User Feed</h1>

                        {/* Using places state instead of Dummy_Places for real data */}
                        <div className="my-4">
                            <PlacesList items={places.length > 0 ? places : places} />
                        </div>
                    </div>

                    {/* Right sidebar - small column */}
                    <div className="lg:w-1/5 bg-white p-4 rounded-lg shadow border border-mountain/10">
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold mb-3 text-forest-dark">User Profile</h2>
                            <div className="flex items-center mb-3">
                                <div className="w-12 h-12 bg-sky rounded-full mr-3"></div>
                                <div>
                                    <p className="font-medium text-forest-dark">Username</p>
                                    <p className="text-sm text-mountain">@user_handle</p>
                                </div>
                            </div>
                            <button onClick={handleNewPlace} className="w-full bg-forest text-white py-2 rounded-md hover:bg-forest-light transition-colors">
                                Add New Place
                            </button>
                        </div>

                        <div className="border-t border-mountain/20 pt-4">
                            <h3 className="text-lg font-medium mb-2 text-forest">Suggestions</h3>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-sky-light rounded-full mr-2"></div>
                                    <p className="text-sm text-mountain-dark">User 1</p>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-sky-light rounded-full mr-2"></div>
                                    <p className="text-sm text-mountain-dark">User 2</p>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-sky-light rounded-full mr-2"></div>
                                    <p className="text-sm text-mountain-dark">User 3</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default UserFeed;