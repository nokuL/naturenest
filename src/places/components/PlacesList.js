import React from "react";
import Card from "../../users/components/UIElements/Card";
import PlacesItem from "./PlacesItem";


const PlacesList = props=>{

    if (!props.items || props.items.length === 0) {
        return <div className="place-list center">
            <Card>
                <h2>No Places found. Maybe create one ?</h2>
                <button>Share Place</button>
            </Card>
        </div>
    }
    return <ul className="place-list">
        {props.items.map(place => <PlacesItem key={place.id} id={place.id}
            image={place.image} title={place.title} description={place.description}
            creatorId={place.creator} coordinates={place.location}
            address={place.address} onDelete={props.onDelete} fetchPlaces={props.fetchPlaces} />)}

    </ul>
}
export default PlacesList;