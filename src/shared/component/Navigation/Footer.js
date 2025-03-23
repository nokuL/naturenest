import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white shadow-md mt-10">
      <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-600">
          <p className="text-sm">© 2025 Nature Nest. All rights reserved.</p>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-600 hover:text-gray-800">Privacy Policy</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">Terms of Service</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">Contact Us</a>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-600 hover:text-gray-800">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;