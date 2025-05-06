import React, { useState, useCallback, useEffect, useRef } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
    
  // Add this in your useHttpClient hook
const activeHttpRequests = useRef([]);

const sendRequest = useCallback(async (url, method = 'GET', headers = {}, body = null) => {
  setIsLoading(true);
  const httpAbortController = new AbortController();
  activeHttpRequests.current.push(httpAbortController);

  try {
    const response = await fetch(url, {
      method,
      body,
      headers,
      signal: httpAbortController.signal
    });

    const responseData = await response.json();

    // Remove abort controller after request completes
    activeHttpRequests.current = activeHttpRequests.current.filter(
      reqCtrl => reqCtrl !== httpAbortController
    );

    if (!response.ok) {
      throw new Error(responseData.message || 'Request failed');
    }

    setIsLoading(false);
    return responseData;
  } catch (err) {
    setIsLoading(false);
    
    // Remove controller even if request failed
    activeHttpRequests.current = activeHttpRequests.current.filter(
      reqCtrl => reqCtrl !== httpAbortController
    );

    if (err.name !== 'AbortError') {
      setError(err.message || 'Something went wrong');
    }
    
    throw err;
  }
}, []);

// Add this cleanup function in the hook
useEffect(() => {
  return () => {
    activeHttpRequests.current.forEach(controller => controller.abort());
    activeHttpRequests.current = [];
  };
}, []);
  
  const clearError = () => {
    setError(null);
  }
  

  
  return { isLoading, error, sendRequest, clearError };
}