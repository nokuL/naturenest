import React , {useCallback, useEffect, useReducer} from "react";
import Input from "../../shared/component/FormElements/Input";
import Button from "../../shared/component/FormElements/Button";
import './NewPlace.css';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/Validators";
import { useForm } from "../../shared/hooks/form-hooks";


const NewPlace = ()=>{
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
        }
    },  false); 



    const placeSubmitHandler = (event)=>{
        event.preventDefault();
        console.log(formState.inputs)

    }
    return (
        <div>
            <form className="place-form" onSubmit={placeSubmitHandler}>
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
                  <Button type="submit" disabled={!formState.isValid}>ADD PLACE

                  </Button>
            </form>
        </div>

    );

}
export default NewPlace;