import React, { useRef, useEffect } from 'react';

import './Map.css';
import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';

const center = {lat: 48.8584, lng: 2.2945};
const zoom = 16;


const Map = props => {
  const mapRef = useRef();
  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,

  })

  if(!isLoaded){
    console.log('Not loaded');
  }
   
 /*  const { center, zoom } = props;

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom
    });
  
    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);  */ 

  return (
   <GoogleMap
    mapContainerStyle={{height: '100%', width: '100%'}}
    center={center}
    zoom={zoom}
   ></GoogleMap>
  );
};

export default Map;
