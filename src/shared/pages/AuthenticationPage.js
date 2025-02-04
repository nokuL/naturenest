import React, {useState, useContext} from "react";
import Input from "../component/FormElements/Input";
import Button from "../component/FormElements/Button";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../utils/Validators";
import { useForm } from "../hooks/form-hooks";
import './AuthPage.css';  
import Card from "../../users/components/UIElements/Card";
import { AuthContext } from "../context/authContext";


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

    const auth = useContext(AuthContext);


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

    const authSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs); // Here you can send the data to your backend
        auth.login();
    };

    return (
        <div className="authentication">
            <Card>
            <form  className="auth-form" onSubmit={authSubmitHandler}>
                {!isLogin &&
                ( <Input
                    element="input"
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    label="Name"
                    validators={[VALIDATOR_REQUIRE]}
                    errorText="Please enter a valid name"
                    onInput={inputHandler}
                />)
                }
                <Input
                    element="input"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    label="Email"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email"
                    onInput={inputHandler}
                />
                
                <Input
                    element="input"
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    label="Password"
                    validators={[VALIDATOR_MINLENGTH(6)]}
                    errorText="Please enter a valid password (min. 6 characters)"
                    onInput={inputHandler}
                />
                
                <Button 
                    type="submit" 
                    disabled={!formState.isValid}
                >
                    {isLogin ? "Login" : "Sign Up"}
                </Button>
                <Button inverse onClick={switchLoginHanlder}>Switch to {isLogin ? 'Sign Up': 'Login'}</Button>
            </form>
            </Card>
        </div>
    );
};

export default AuthPage;