import React, { useEffect } from 'react';

const FeedbackPopup = ({ message, type, visible, onClose, timeout = 3000 }) => {
  // Auto close popup after specified timeout
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, timeout);
      
      return () => clearTimeout(timer);
    }
  }, [visible, onClose, timeout]);

  // Early return if not visible
  if (!visible) return null;

  // Determine appropriate styling based on feedback type
  const getStylesByType = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 border-green-500 text-green-700';
      case 'error':
        return 'bg-red-100 border-red-500 text-red-700';
      case 'info':
        return 'bg-blue-100 border-blue-500 text-blue-700';
      case 'warning':
        return 'bg-yellow-100 border-yellow-500 text-yellow-700';
      default:
        return 'bg-gray-100 border-gray-500 text-gray-700';
    }
  };
   // Define inline keyframes style
   const fadeInKeyframes = `
   @keyframes fadeIn {
     from {
       opacity: 0;
       transform: translateY(10px);
     }
     to {
       opacity: 1;
       transform: translateY(0);
     }
   }
 `;

  return (
    <>
        <style>{fadeInKeyframes}</style>

        <div className="fixed top-6 right-6 z-50 animate-fade-in">
        <div className={`${getStylesByType()} px-4 py-3 rounded-lg shadow-lg border flex items-center max-w-md`}>
        {/* Icon based on type */}
        <div className="mr-3">
          {type === 'success' && (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          )}
          {type === 'error' && (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          )}
          {type === 'info' && (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          )}
          {type === 'warning' && (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          )}
        </div>
        
        {/* Message */}
        <p className="flex-1">{message}</p>
        
        {/* Close button */}
        <button 
          onClick={onClose} 
          className="ml-4 text-gray-500 hover:text-gray-800 focus:outline-none"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
    </>
  );
};

export default FeedbackPopup;