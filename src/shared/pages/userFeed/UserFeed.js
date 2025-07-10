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
import { Link } from 'react-router-dom';
import SearchModal from './SearchModal';


function UserFeed() {
    const [places, setPlaces] = useState([]);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const userId = useParams().userId;
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const [feedback, setFeedback] = useState({
        visible: false,
        message: '',
        type: 'success'
    });
    const mountedRef = useRef(true);
    const [showSearch, setShowSearch] = useState(false);

    const handleDelete = (id) => {
        setPlaces(prevPlaces => prevPlaces.filter(place => place.id !== id));
       
        showFeedback('Place deleted successfully', 'success');
    }
    const handleSearchClick = ()=>{
        setShowSearch(true);
    }
    const handleSearchOnClose = () => {
        setShowSearch(false);
    }

    const handleSearchResultSelect = (place) => {}

    useEffect(() => {
        // Set up the mounted ref
        mountedRef.current = true;

        // Cleanup function
        return () => {
            mountedRef.current = false;
        };
    }, []);
    const [refresh, setRefresh] = useState(false);

    // Re-fetch places whenever userId changes or refresh is toggled
    useEffect(() => {
        fetchPlaces();
    }, [userId, refresh]);
    const handleMyProfile = () => { }
    const handleNewPlace = () => {
        setShowModal(true);
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

    const fetchPlaces = async () => {
        try {
            const responseData = await sendRequest(
                `http://localhost:5000/api/places/user/${userId}`
            );
            console.log('Fetched places:', responseData.places);

            setPlaces(responseData.places);


            // Only update state if component is still mounted
            if (mountedRef.current) {
                setPlaces(responseData.places);
            }
        } catch (err) {
            // Only handle errors if component is mounted and it's not an abort error
            if (mountedRef.current && err.name !== 'AbortError') {
                console.error('Error fetching places:', err);
                showFeedback('Failed to load places', 'error');
            }
        }
    };

    // Initial fetch of places
    useEffect(() => {
        fetchPlaces();
    }, [userId]);

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

            fetchPlaces();
            setShowModal(false);
            showFeedback('Place successfully added!', 'success');

            // Update places state with the new place
            /*   if (mountedRef.current) {
                  fetchPlaces();
                  setShowModal(false);
                  showFeedback('Place successfully added!', 'success');
              } */
        } catch (err) {
            console.error('Error adding place:', err);
            showFeedback('Failed to add place. Please try again.', 'error');
        }
    };

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
            <SearchModal
            show={showSearch}
            onClose={handleSearchOnClose}
            onSelectPlace={handleSearchResultSelect}
            places={[]}
            />
            {/* Main container with responsive flexbox grid */}
            <div className="container mx-auto px-4 py-6 bg-gray-50">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left sidebar - small column */}
                    <div className="lg:w-1/5 bg-white p-4 rounded-lg shadow border border-mountain/10">
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold mb-3 text-forest-dark">Navigation</h2>
                            <ul className="space-y-2">
                                <li className="p-2 bg-sky-light/20 text-forest rounded-md cursor-pointer hover:bg-sky-light/30 transition-colors flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    Search
                                </li>
                                <li className="p-2 hover:bg-sky-light/20 rounded-md cursor-pointer transition-colors">
                                    <Link to={`/users/profile/${userId}`} className="block w-full h-full flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                         Profile
                                    </Link>
                                </li>
                                <li className="p-2 hover:bg-sky-light/20 rounded-md cursor-pointer transition-colors flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    Favorites
                                </li>
                                <li className="p-2 hover:bg-sky-light/20 rounded-md cursor-pointer transition-colors flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Explore
                                </li>
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

                        {/* Simplified rendering of places */}
                        <div className="my-4">
                            <PlacesList items={places} onDelete={handleDelete} fetchPlaces={fetchPlaces} />
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