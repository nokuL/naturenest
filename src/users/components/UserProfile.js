import React, { useState } from "react";
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

  return (
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
          <div className="w-[150px] h-[150px] mr-10">
            <img 
              src={userData.avatar} 
              alt={userData.displayName} 
              className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-1">{userData.displayName}</h1>
            <p className="text-gray-600 text-base mb-3">@{userData.username}</p>
            <p className="mb-4 text-base leading-normal">{userData.bio}</p>
            <div className="flex mb-5">
              <div className="mr-6 text-center">
                <span className="block text-xl font-bold">{userData.stats.places}</span>
                <span className="text-sm text-gray-600">Places</span>
              </div>
              <div className="mr-6 text-center">
                <span className="block text-xl font-bold">{userData.stats.followers}</span>
                <span className="text-sm text-gray-600">Followers</span>
              </div>
              <div className="mr-6 text-center">
                <span className="block text-xl font-bold">{userData.stats.following}</span>
                <span className="text-sm text-gray-600">Following</span>
              </div>
            </div>
            <button className="bg-green-800 hover:bg-green-700 text-white py-2 px-4 rounded font-semibold">
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
            {placesData.map((place) => (
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
            {placesData.map((place) => (
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
          <button className="bg-green-800 hover:bg-green-700 text-white py-2 px-4 rounded font-semibold text-sm w-full">
            Add New Place
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
  );
}
