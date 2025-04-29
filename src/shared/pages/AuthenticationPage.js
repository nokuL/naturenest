import React, {useState, useContext} from "react";
import Input from "../component/FormElements/Input";
import Button from "../component/FormElements/Button";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../utils/Validators";
import { useForm } from "../hooks/form-hooks";
import { AuthContext } from "../context/authContext";
import ErrorModal from "../../users/components/UIElements/ErrorModal";
import LoadingSpinner from "../../users/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../hooks/http-hooks";
import google from '../../assets/images/google.png';
import facebook from '../../assets/images/facebook.png';
import { useHistory } from "react-router-dom";


const AuthPage = props => {
    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        },
        false
    );
    const [isLogin, setIsLogin] = useState(false);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    const auth = useContext(AuthContext);
    const history = useHistory();


    const switchLoginHanlder = ()=>{
        if(!isLogin){
            setFormData({
                ...formState.inputs,
                name: null}, formState.inputs.email?.isValid && formState.inputs.password?.isValid
        );
        }else{
            setFormData(
                {
                    ...formState.inputs, 
                    name: {
                        value: '',
                        isValid: false
                    }
                }, false
            )
        }
        setIsLogin(prevMode => !prevMode)
    }

    const authSubmitHandler = async event => {
        event.preventDefault();        
            try{

           const responseData =  await sendRequest('http://localhost:5000/api/users/login', 'POST', {
                'Content-Type':'application/json'
            }, JSON.stringify({
                email: formState.inputs.email.value,
                password: formState.inputs.password.value
            }) );

            console.log(">>>>>>>>> !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! "+responseData)
             
            auth.login(responseData.user.id, responseData.token);

            history.push(`userFeed/${responseData.user.userId}`);

            }catch(err){
                console.log(err)

            }
      
    };

    const googleAuthHandler = async () => {
       window.open('http://localhost:5003/api/users/google', '_self');
    }
   
    return (
            <React.Fragment>
                <ErrorModal error={error} onClear={clearError}></ErrorModal>
                {isLoading && <LoadingSpinner asOverLay/>}
                <div className="flex flex-col items-center ">
            <form  className="flex flex-col gap-4" onSubmit={authSubmitHandler}>
                    <Input
                    element="input"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email"
                    onInput={inputHandler}
                />
                
                <Input
                    element="input"
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    validators={[VALIDATOR_MINLENGTH(6)]}
                    errorText="Please enter a valid password (min. 6 characters)"
                    onInput={inputHandler}
                />

                <div className="flex flex-col items-center justify-between mt-4 space-y-6  md:flex-row md:space-0">
                    <div className="font-medium text-forest-dark ">Forgot your password?
                    <button className="text-mountain-dark hover:text-sky-light underline flex flex-col space-x-2">Reset password</button>
                    </div>
                    
                </div>
                
                <button
                    type="submit"
                    className="bg-forest text-white p-2 rounded-md border border-forest-dark shadow-lg
                     hover:bg-forest-dark hover:shadow-xl hover:bg-opacity-90 transition hover:-translate-y-0.5 duration-150"
                >
                    Login
                </button>
            
            </form>

            <div className="mt-12 border-t border-mountain-dark w-full"></div>

            <p  className="text-thin text-mountain-dark py-6">Or continue with</p>

          <div
            class="flex flex-col space-x-0 space-y-6 md:flex-row md:space-x-4 md:space-y-0"
          >
            <button
              class="flex items-center justify-center py-2 px-4 space-x-2 border border-gray-300 rounded shadow-sm hover:bg-opacity-30 hover:shadow-lg hover:-translate-y-0.5 transition duration-150 md:w-1/2"
            >
              <img src={facebook} alt="" class="w-9" />
              <span class="font-thin">Facebook</span>
            </button>
            <button
              class="flex items-center justify-center py-2 px-4 space-x-3 border border-gray-300 rounded shadow-sm hover:bg-opacity-30 hover:shadow-lg hover:-translate-y-0.5 transition duration-150 md:w-1/2"
            >
              <img src={google} alt="" class="w-9" />
              <span class="font-thin">Google</span>
            </button>
          </div>
        </div>

                
            </React.Fragment>
        );
};

export default AuthPage;