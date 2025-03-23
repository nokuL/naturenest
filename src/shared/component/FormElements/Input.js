import React, {act, useReducer, useEffect} from "react";
import { validate } from "../../utils/Validators";



const inputReducer = (state, action)=>{
    switch (action.type){
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)


            };
            case 'TOUCH':{
                return {
                    ...state,
                    isTouched: true

                }
            }
        default:
            return state;
    }
}

const Input = props => {
   const [inputState, dispatch] = useReducer(inputReducer,
     {
        value:props.initialValue||'', 
        isValid: props.initialValid || false, 
        isTouched: false});

   const {id, onInput} = props;
   const {value, isValid} = inputState

   useEffect(()=>{
    onInput(id, value, isValid)
   }, [id, value, isValid, onInput])
   

    const onChangeHandler = event =>{
        dispatch({type:'CHANGE', val: event.target.value, validators: props.validators})
    };
    
    const touchHandler =  ()=>{
        dispatch({
            type: 'TOUCH'
        })

    }
    const element = props.element === 'input' ?
     <input 
     id={props.id}
      type={props.type}
       placeholder={props.placeholder}
       value={inputState.value}
       onChange={onChangeHandler}
       onBlur={touchHandler} 
       className={props.type === 'text'? 'w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:forest-light placeholder:text-sm placeholder:text-gray-400 placeholder:font-light' 
        : 'w-full p-3 border border-gray-300 rounded-lg placeholder:text-sm placeholder:text-gray-400 placeholder:font-light focus:outline-none focus:ring-2 focus:forest-light'}
     />
       : <textarea
     id={props.id} 
     rows={props.rows || 3} 
     onChange={onChangeHandler}
     onBlur={touchHandler}
     value={inputState.value}/>

    return <div className={`form-control ${!inputState.isValid && inputState.isTouched && 'form-control--invalid'}`}>
        <label htmlFor={props.id}>{props.label}</label>
        {element}
        {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}

    </div>

};

export default Input;