import React, { useEffect, useState } from "react";
import PlacesList from "../components/PlacesList";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hooks";
import ErrorModal from "../../users/components/UIElements/ErrorModal";
import LoadingSpinner from "../../users/components/UIElements/LoadingSpinner";

const DUMMY_PLACES = [{ id:'p1', title:'My place', description:'my home', 
    imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj-M-wWd6B0Qd1sHtffb052909ULmjK5OU6w&s',
    location:{lat:40.7484, lng:-73.9857}, creatorId:'u1'}, 
    { id:'p1', title:'My place', description:'my home', 
        imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj-M-wWd6B0Qd1sHtffb052909ULmjK5OU6w&s',
        location:{lat:40.7484, lng:-73.9857}, creatorId:'u2'}]

const UserPlaces = props => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedPlaces, setLoadedPlaces] = useState();
    const userId = useParams().userId;
    useEffect(()=>{
        const fetchPlaces = async()=>{
            try{
                const responseData = await sendRequest(`http://localhost:5003/api/places/user/${userId}`);
                setLoadedPlaces(responseData.places);
            }catch(err){}
        }
        fetchPlaces();
    }, [sendRequest])
 ;

   return <React.Fragment>
     <ErrorModal error={error} onClear={clearError}/>
     {isLoading && <div className="center">
         <LoadingSpinner/>
     </div>}
        {!isLoading && loadedPlaces &&
       <PlacesList items={loadedPlaces}/>
        }

   </React.Fragment>

}
export default UserPlaces;