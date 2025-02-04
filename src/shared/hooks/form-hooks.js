import React , {useEffect, useCallback, useReducer} from "react";
const formReducer = (state,action)=>{
    switch(action.type){
        case 'INPUT_CHANGE':
            let formIsvalid = true;
            for(const inputId in state.inputs){
                {if (!state.inputs[inputId])
                    continue;
                }
                if(inputId === action.inputId){
                    formIsvalid = formIsvalid && action.isValid;
                }else{
                    formIsvalid = formIsvalid && state.inputs[inputId].isValid;
                }
            }
            return{
                ...state, 
                inputs: {
                    ...state.inputs,
                    [action.inputId]:{value: action.value, isValid: action.isValid}
                },
                isValid: formIsvalid
            };
        default:
            return state;
    }
}


export const useForm = (initialInputs, initialFormValidity)=>{

    const [formState, dispatch ] =   useReducer(formReducer, {
        inputs: initialInputs,
         isValid: initialFormValidity
    });

    const inputHandler = useCallback((id, value, isValid)=>{
        dispatch({
            type:'INPUT_CHANGE',
             value: value,
             isValid: isValid,
             inputId: id
        })
    }, [])

    const setFormData =  useCallback((initialData, formValidity)=>{
        dispatch({
            type:'SET_DATA',
            inputs: initialData,
            formIsvalid: formValidity
        })
    });

    return [formState, inputHandler, setFormData];

}
export default useForm;