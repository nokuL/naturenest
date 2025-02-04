import React from "react";
import PlacesList from "../components/PlacesList";
import { useParams } from "react-router-dom";

const DUMMY_PLACES = [{ id:'p1', title:'My place', description:'my home', 
    imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj-M-wWd6B0Qd1sHtffb052909ULmjK5OU6w&s',
    location:{lat:40.7484, lng:-73.9857}, creatorId:'u1'}, 
    { id:'p1', title:'My place', description:'my home', 
        imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj-M-wWd6B0Qd1sHtffb052909ULmjK5OU6w&s',
        location:{lat:40.7484, lng:-73.9857}, creatorId:'u2'}]

const UserPlaces = props => {
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creatorId === userId);
   return <PlacesList items={loadedPlaces}/>

}
export default UserPlaces;