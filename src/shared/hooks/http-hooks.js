import React, { useState, useCallback, useEffect, useRef } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  
  // storing data across rerender cycles
  const activeHttpRequests = useRef([]);
  
  // using callback so that the function doesn't recreate when the component rerenders
  const sendRequest = useCallback(async (url, method = 'GET', headers = {}, body = null) => {
    setIsLoading(true);
    const httpAbortController = new AbortController(); // for cancelling the API call when the component unmounts
    activeHttpRequests.current.push(httpAbortController);
    
    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
        signal: httpAbortController.signal
      });
      
      const responseData = await response.json(); // Added await here
      
      activeHttpRequests.current = activeHttpRequests.current.filter(
        reqCtrl => reqCtrl !== httpAbortController
      ); // clearing the abort controller
      
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      
      setIsLoading(false);
      return responseData;
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
      throw err;
    }
  }, []);
  
  const clearError = () => {
    setError(null);
  }
  
  useEffect(() => {
    return () => {
      // Fixed the cleanup function
      activeHttpRequests.current.forEach(abortCtrl => {
        abortCtrl.abort();
      });
    };
  }, []);
  
  return { isLoading, error, sendRequest, clearError };
}