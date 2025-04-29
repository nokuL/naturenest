import React , {useCallback, useEffect, useReducer,useState, useContext} from "react";
import Input from "../../shared/component/FormElements/Input";
import Button from "../../shared/component/FormElements/Button";
import './NewPlace.css';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/Validators";
import { useForm } from "../../shared/hooks/form-hooks";
import { AuthContext } from "../../shared/context/authContext";
import ErrorModal from "../../users/components/UIElements/ErrorModal";
import LoadingSpinner from "../../users/components/UIElements/LoadingSpinner";
import { useHistory } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hooks";
import ImageUpload from "../../shared/component/FormElements/ImageUpload";


const NewPlace = ()=>{
    const {isLoading , error, sendRequest, clearError} = useHttpClient();
    const auth = useContext(AuthContext);
   const [formState, inputHandler]= useForm({
        title:{
            value: '',
            isValid: false
        },
        description:{
            value: '',
            isValid: false
        },
        address: {  // Added address field
            value: '',
            isValid: false
        },
        image:{
            value: null,
            isValid: false
        }
    },  false); 

 const history = useHistory();

    const placeSubmitHandler = async (event)=>{
        event.preventDefault();
        try{
            const formData = new FormData();
            formData.append('title', formState.inputs.title.value);
            formData.append('description', formState.inputs.description.value);
            formData.append('address', formState.inputs.address.value); // Added address field
            formData.append('image', formState.inputs.image.value);
            formData.append('creator', auth.userId);
           const responseData = await sendRequest('http://localhost:5003/api/places', 'POST', 
           formData, {Authorization: 'Bearer '+ auth.token});
            history.push('/');

        }catch(err){}
     

    }
    return (
        <div>
            <React.Fragment>
                <ErrorModal error={error} onClear={clearError}></ErrorModal>
            <form className="place-form" onSubmit={placeSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
                <Input element="text"
                id='title'
                 type='text' 
                 label='title'
                  validators={[VALIDATOR_REQUIRE()]}  
                  errorText="Please enter a valid input value"
                  onInput={inputHandler}
                  ></Input>

                <Input element="textarea"
                 id='description'
                 type='input' 
                 label='Description'
                  validators={[VALIDATOR_MINLENGTH(5)]}  
                  errorText="Please enter a valid description value(atleast 5 characters)"
                  onInput={inputHandler}
                  ></Input>
                  
                     
                     <Input element="text"
                id='address'
                 type='input' 
                 label='address'
                  validators={[VALIDATOR_REQUIRE()]}  
                  errorText="Please enter a valid address value"
                  onInput={inputHandler}
                  ></Input>
                  <ImageUpload id="image" onInput={inputHandler} errorText="Please provide an image" center>
                      <p>Upload an image</p>

                  </ImageUpload>
                  <Button type="submit" disabled={!formState.isValid}>ADD PLACE

                  </Button>
            </form>
            </React.Fragment>
        </div>

    );

}
export default NewPlace;