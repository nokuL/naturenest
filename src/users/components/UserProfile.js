import React, { useState, useContext, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../shared/context/authContext";
import { useHttpClient } from "../../shared/hooks/http-hooks";
import ErrorModal from "./UIElements/ErrorModal";
import LoadingSpinner from "./UIElements/LoadingSpinner";
import AddPlaceModal from "../../shared/pages/userFeed/AddPlaceModal";
import FeedbackPopup from "../../shared/component/Feedback/Feedback";
import { Link } from 'react-router-dom';
import AddProfilePictureModal from "../../shared/pages/userFeed/AddProfilePictureModal";

// No CSS import needed for Tailwind

const userData = {
  username: "nokul",
  displayName: "NokuL",
  bio: "Explorer & food enthusiast | Sharing my favorite places",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  stats: {
    places: 24,
    followers: 352,
    following: 168
  }
};

const placesData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    title: "New Place",
    likes: 45,
    comments: 6
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=600&q=80",
    title: "Paris Café",
    likes: 72,
    comments: 14
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80",
    title: "City Park",
    likes: 38,
    comments: 4
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80",
    title: "Mountain View",
    likes: 93,
    comments: 12
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=600&q=80",
    title: "Beach Resort",
    likes: 67,
    comments: 8
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    title: "Cozy Restaurant",
    likes: 42,
    comments: 7
  }
];

export default function ProfilePlaces() {
  const [activeTab, setActiveTab] = useState("grid");
     const [showModal, setShowModal] = useState(false);
     const [showProfilePicModal, setShowProfilePictureModal] = useState(false);
      const [feedback, setFeedback] = useState({
          visible: false,
          message: '',
          type: 'success'
      });
     const userId = useParams().userId;
     const { isLoading, error, sendRequest, clearError } = useHttpClient();
     const auth = useContext(AuthContext);
     const [places, setPlaces] = useState([]);
     const mountedRef = useRef(true);
     const [userData, setUserData] = useState(null);
     const fileInputRef = useRef(null);


        useEffect(() => {
             // Set up the mounted ref
             mountedRef.current = true;
             
             // Cleanup function
             return () => {
                 mountedRef.current = false;
             };
         }, []);
      

      useEffect(() => {
             fetchPlaces();
         }, [userId]);


useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await sendRequest(
        `http://localhost:5000/api/users/${userId}` // Adjust endpoint as per your backend
      );
      setUserData(response.user); // Adjust according to your backend response
    } catch (err) {
      showFeedback('Failed to load user profile', 'error');
    }
  };
  fetchUser();
}, [userId]);

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

  const showProfilePicModalFunc = ()=>{
    setShowProfilePictureModal(true);
  }
     
  const onCloseProfilePicModal = ()=>{
    setShowProfilePictureModal(false);
  }

 

  const handleProfilePictureUpload = async (profileData) => {
    try {
        console.log('Profile picture data received from modal:', profileData);

        if (!profileData.image) {
            console.error('No image selected');
            showFeedback('Please select an image for your profile', 'error');
            return;
        }

        const formData = new FormData();
        formData.append('image', profileData.image);

        const responseData = await sendRequest(
            `http://localhost:5000/api/users/update-profile-picture/${userId}`,
            'PATCH',
            {
                Authorization: 'Bearer ' + auth.token
            },
            formData
        );

        console.log('Profile picture upload response:', responseData);

        // Update the userData with the new profile picture
        setUserData(prevUserData => ({
            ...prevUserData,
            image: responseData.imageUrl
        }));

        setShowProfilePictureModal(false);
        showFeedback('Profile picture updated successfully!', 'success');

    } catch (err) {
        console.error('Error uploading profile picture:', err);
        showFeedback('Failed to update profile picture. Please try again.', 'error');
    }
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

          fetchPlaces();
          setShowModal(false);
          showFeedback('Place successfully added!', 'success');

      } catch (err) {
          console.error('Error adding place:', err);
          showFeedback('Failed to add place. Please try again.', 'error');
      }
  }; 

  const onHandlePlaceClick = ()=>{
    setShowModal(true);
  }
  if (!userData) {
    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        <LoadingSpinner asOverlay />
      </React.Fragment>
    );
  }
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Selected file:', file);
      // Handle the file upload here
      // You can call your upload function or open a modal
      // uploadProfilePicture(file);
    }
  };

  const stats = userData.stats || { places: 0, followers: 0, following: 0 };
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
            <AddProfilePictureModal
            show={showProfilePicModal}
            onClose={onCloseProfilePicModal}
            onSubmit={handleProfilePictureUpload}>

            </AddProfilePictureModal>
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar Navigation */}
      <nav className="w-56 bg-white border-r border-gray-200 p-4 pt-8">
        <h2 className="text-lg font-bold mb-3">Navigation</h2>
        <ul className="mb-8">
          <li className="my-2.5">
            <a href="#" className="text-gray-800 hover:text-green-800">Feed</a>
          </li>
          <li className="my-2.5">
            <a href="#" className="font-bold text-green-800">My Places</a>
          </li>
          <li className="my-2.5">
            <a href="#" className="text-gray-800 hover:text-green-800">Favorites</a>
          </li>
          <li className="my-2.5">
            <a href="#" className="text-gray-800 hover:text-green-800">Explore</a>
          </li>
        </ul>
        <div className="mt-6">
          <h3 className="font-bold mb-2">Trending Tags</h3>
          <span className="inline-block bg-green-50 text-green-800 rounded-xl px-3 py-1 text-sm mr-1.5 mt-1.5">#Travel</span>
          <span className="inline-block bg-green-50 text-green-800 rounded-xl px-3 py-1 text-sm mr-1.5 mt-1.5">#Food</span>
          <span className="inline-block bg-green-50 text-green-800 rounded-xl px-3 py-1 text-sm mr-1.5 mt-1.5">#Adventure</span>
        </div>
      </nav>

      {/* Main Profile Section */}
      <section className="flex-grow p-8 min-w-[460px]">
        {/* Profile Header */}
        <div className="flex pb-8 border-b border-gray-200 mb-6">
      <div className="w-[150px] h-[150px] mr-10 relative">
      <img
  src={userData.image || "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=600&q=80"}
  alt={userData.name}
  className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
/>
        
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        
        {/* Upload Button */}
        <button 
          onClick={showProfilePicModalFunc}
          className="absolute bottom-2 right-2 bg-white hover:bg-gray-50 rounded-full p-2 shadow-lg border border-gray-200 transition-colors"
        >
          <svg 
            className="w-4 h-4 text-gray-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" 
            />
          </svg>
        </button>
      </div>
      
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-1">{userData.name}</h1>
        <p className="text-gray-600 text-base mb-3">@{userData.username}</p>
        <p className="mb-4 text-base leading-normal">{userData.bio}</p>
        <div className="flex mb-5">
          <div className="mr-6 text-center">
            <span className="block text-xl font-bold">{stats.places}</span>
            <span className="text-sm text-gray-600">Places</span>
          </div>
          <div className="mr-6 text-center">
            <span className="block text-xl font-bold">{stats.followers}</span>
            <span className="text-sm text-gray-600">Followers</span>
          </div>
          <div className="mr-6 text-center">
            <span className="block text-xl font-bold">{stats.following}</span>
            <span className="text-sm text-gray-600">Following</span>
          </div>
        </div>
        <button onClick={onHandlePlaceClick} className="bg-gradient-to-r from-green-700 via-green-600 to-green-800 hover:from-green-800 hover:to-green-600 text-white py-2 px-6 rounded-full font-bold shadow-md flex items-center gap-2 transform transition-transform duration-150 hover:scale-105">
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
  Add New Place
</button>
      </div>
    </div>

        {/* Profile Tabs */}
        <div className="flex mb-6 border-b border-gray-200">
          <button
            className={`flex items-center px-6 py-3 mr-2 ${
              activeTab === 'grid' 
              ? 'text-green-800 opacity-100 border-b-2 border-green-800 font-semibold' 
              : 'text-gray-600 opacity-70 hover:opacity-100'
            }`}
            onClick={() => setActiveTab('grid')}
          >
            <span className="mr-2 text-lg">◫</span> Grid
          </button>
          <button
            className={`flex items-center px-6 py-3 mr-2 ${
              activeTab === 'list' 
              ? 'text-green-800 opacity-100 border-b-2 border-green-800 font-semibold' 
              : 'text-gray-600 opacity-70 hover:opacity-100'
            }`}
            onClick={() => setActiveTab('list')}
          >
            <span className="mr-2 text-lg">≡</span> List
          </button>
          <button
            className={`flex items-center px-6 py-3 mr-2 ${
              activeTab === 'map' 
              ? 'text-green-800 opacity-100 border-b-2 border-green-800 font-semibold' 
              : 'text-gray-600 opacity-70 hover:opacity-100'
            }`}
            onClick={() => setActiveTab('map')}
          >
            <span className="mr-2 text-lg">◎</span> Map
          </button>
        </div>

        {/* Places Grid */}
        {activeTab === 'grid' && (
          <div className="grid grid-cols-3 gap-4">
            {places.map((place) => (
              <div key={place.id} className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group">
                <img 
                  src={place.image} 
                  alt={place.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="w-full text-white p-4">
                    <div className="flex justify-between mb-1">
                      <span>❤️ {place.likes}</span>
                      <span>💬 {place.comments}</span>
                    </div>
                    <h3 className="text-lg font-medium">{place.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Places List */}
        {activeTab === 'list' && (
          <div className="flex flex-col gap-4">
            {places.map((place) => (
              <div key={place.id} className="flex bg-white rounded-lg overflow-hidden shadow-sm">
                <img 
                  src={place.image} 
                  alt={place.title} 
                  className="w-[180px] h-[120px] object-cover" 
                />
                <div className="p-4 flex flex-col flex-1 relative">
                  <h3 className="text-lg font-medium mb-2">{place.title}</h3>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>❤️ {place.likes}</span>
                    <span>💬 {place.comments}</span>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="bg-transparent border-none cursor-pointer opacity-70 hover:opacity-100 text-base">✏️</button>
                    <button className="bg-transparent border-none cursor-pointer opacity-70 hover:opacity-100 text-base">🗑️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Map View */}
        {activeTab === 'map' && (
          <div className="bg-gray-200 rounded-lg h-[500px] flex justify-center items-center">
            <div className="text-center text-gray-600">
              <p className="text-2xl font-bold mb-2">Map View Coming Soon</p>
              <p>Your places will be displayed on an interactive map</p>
            </div>
          </div>
        )}
      </section>

      {/* User Profile Sidebar */}
      <aside className="w-[250px] bg-white border-l border-gray-200 p-8 pt-8">
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 rounded-full overflow-hidden mb-2.5">
            <img 
              src={userData.avatar} 
              alt={userData.displayName} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div>
            <div className="text-lg font-semibold mb-0.5">{userData.displayName}</div>
            <div className="text-base text-gray-600 mb-2">@{userData.username}</div>
          </div>
          <button
  onClick={onHandlePlaceClick}
  className="bg-gradient-to-r from-green-700 via-green-600 to-green-800 hover:from-green-800 hover:to-green-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform duration-150 hover:scale-110"
  title="Add New Place"
>
  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
</button>
        </div>
        <div className="mt-3">
          <h3 className="text-base font-bold mb-2">Suggestions</h3>
          <div className="inline-block bg-green-50 text-green-800 rounded-2xl py-2 px-4 text-base mb-1.5">User 1</div>
          <div className="inline-block bg-green-50 text-green-800 rounded-2xl py-2 px-4 text-base mb-1.5">User 2</div>
          <div className="inline-block bg-green-50 text-green-800 rounded-2xl py-2 px-4 text-base mb-1.5">User 3</div>
        </div>
      </aside>
    </div>
    </React.Fragment>
  );
}
