// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import AuthPage from '../shared/pages/AuthenticationPage';
import naturenest from '../assets/images/naturenest.png';
import mountainView from '../assets/images/beautiful-background-td7gsxerv3ecl20h.jpg'

const Home = () => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-sky-100'>
      <div className="relative flex flex-col m-6 space-y-10 bg-white shadow-2xl  shadow-green-900 shadow-r-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0">
    

      {/* left */}
      <div className='p-6 md:p-20 flex flex-col items-center'>
        <img src={naturenest} alt="logo" className="w-40 h-40 rounded-full mb-4"/>
        <p className="max-w-sm mb-7 font-light text-gray-500">
          Login to your account to continue
        </p>
        <AuthPage />

        <p className='mt-5 text-medium text-forest-dark'>Don't have an account? <Link to="/signup" className='text-forest-dark underline hover:text-sky-light'>Sign up</Link></p>

      </div>

      {/* right */}
      <img 
        src={mountainView} 
        className="w-[630px] hidden md:block rounded-r-lg" 
      />



      </div>
    </div>
  
  );
};

export default Home;