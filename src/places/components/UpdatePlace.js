import React from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/component/FormElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/Validators";
import Button from "../../shared/component/FormElements/Button";
import './NewPlace.css'
import useForm from "../../shared/hooks/form-hooks";



const DUMMY_PLACES = [{ id:'p1', title:'My place', description:'my home', 
    imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj-M-wWd6B0Qd1sHtffb052909ULmjK5OU6w&s',
    location:{lat:40.7484, lng:-73.9857}, creatorId:'u1'}, 
    { id:'p1', title:'My place', description:'my home', 
        imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj-M-wWd6B0Qd1sHtffb052909ULmjK5OU6w&s',
        location:{lat:40.7484, lng:-73.9857}, creatorId:'u2'}]

const UpdatePlace = props =>{
    const placeId = useParams().placeId;

    const identifiedPlace = DUMMY_PLACES.find(p=>p.id === placeId);

    const [formState, inputHandler]= useForm({

    title:{
        value: identifiedPlace.title,
        isValid: true
    },
    description:{
        value: identifiedPlace.description,
        isValid: true
    }
    }, true)

    const placeUpdateSubmitHandler = event =>{
        event.preventDefault();
        console.log(formState.inputs)
    }

    if(!identifiedPlace){
        return (
            <h2>Place not found for id {placeId}</h2>
        )}else{
            return  ( 
            <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
                <Input
                id='title'
                element="input"
                type="text"
                label="Title"
                validators={VALIDATOR_REQUIRE()}
                errorText="Please enter a valid text"
                onInput={inputHandler}
                initialValue={formState.inputs.title.value}
                initialValid={formState.inputs.title.isValid}/>

                 <Input
                id='description'
                element="textarea"
                label="Description"
                validators={VALIDATOR_MINLENGTH(5)}
                errorText="Please enter a valid description"
                onInput={inputHandler}
                initialValue={formState.inputs.description.value}
                initialValid={formState.inputs.description.isValid}/>
                <Button
                type="submit"
                disabled={!formState.isValid}>UPDATE PLACE</Button>
            </form>
            )

        }



}
export default UpdatePlace;