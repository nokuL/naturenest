import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useContext } from 'react';

import PlacesList from '../../../places/components/PlacesList';
import { AuthContext } from '../../../shared/context/authContext';
import { useHttpClient } from '../../../shared/hooks/http-hooks';
import ErrorModal from '../../../users/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../users/components/UIElements/LoadingSpinner';
function UserFeed() {
    const [places, setPlaces] = useState([]);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const userId = useParams().userId;
    const token = auth.token;

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
        async function fetchPlaces() {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/users/user/userFeed/${userId}`);
                setPlaces(responseData);
            } catch (error) {
                console.error('Error fetching places:', error);
            }
        }
        fetchPlaces();
    }, [sendRequest, userId]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverLay />}
            
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
                            <PlacesList items={places.length > 0 ? places : Dummy_Places} />
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
                            <button className="w-full bg-forest text-white py-2 rounded-md hover:bg-forest-light transition-colors">
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