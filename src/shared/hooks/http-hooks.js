import React, {useState, useCallback, useEffect} from "react";
export const useHttpClient = ()=>{
     const [isLoading, setIsLoading] = useState(false);
     const [error, setError] = useState();

     const activeHttpRequests = useRef([]); //storing data across rerender cycles
     //using callback so that the function doesnt recreate when the component rerenders, this is to cache the function itself

     const sendRequest = useCallback(async(url, method = 'GET', headers={}, body=null)=>{

        setIsLoading(true);

        const httpAbbortController = new AbortController(); // for cancelling the API call when the component unmonunts
        activeHttpRequests.current.push(httpAbbortController);
        try{
            const response = await fetch(url, {
                method, 
                body,
                headers,
                signal: httpAbbortController.signal
            });
    
            const responseData = response.json();
            if(!response.ok){
                throw Error(responseData.message);
            }

            return responseData;
        }catch(err){
            setError(err.message);
            throw err;

        }
        activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbbortController);// clkaring the abort controller
        setIsLoading(false)
     


     }, []);
     const clearError = ()=>{
        setError(null);
     }
     useEffect(()=>{
        return ()=>{
            activeHttpRequests.current.array.forEach(abbortCtrl => {
                abbortCtrl.abort();
                
            });
        };
     }, [])
     return {isLoading, error, sendRequest, clearError}
}