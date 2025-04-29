import React, { useContext } from 'react';
import Input from '../component/FormElements/Input';
import Button from '../component/FormElements/Button';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../utils/Validators';
import { useForm } from '../hooks/form-hooks';
import naturenest from '../../assets/images/naturenest.png';
import google from '../../assets/images/google.png';
import facebook from '../../assets/images/facebook.png';
import { Link } from 'react-router-dom';
import { useHttpClient } from '../hooks/http-hooks';
import { AuthContext } from '../context/authContext';
import { useHistory } from 'react-router-dom';



const SignUp = () => {
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: '',
        isValid: false
      },
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      },
      userName: {
        value: '',
        isValid: false
      },
    },
    false
  );
  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  const auth = useContext(AuthContext);
  const history = useHistory();

  const signUpSubmitHandler = async event => {
    event.preventDefault();
    try{
      const formData = new FormData();
      formData.append('name', formState.inputs.name.value);
      formData.append('email', formState.inputs.email.value);
      formData.append('password', formState.inputs.password.value);
      formData.append('userName', formState.inputs.userName.value);
     // formData.append('image', formState.inputs.image.value);
      console.log(formData);
   
    const responseData = await sendRequest(
      'http://localhost:5000/api/users/signup',
      'POST',
      {},
     formData
    );

    auth.login(responseData.user.userId, responseData.token);
    history.push(`userFeed/${responseData.user.userId}`);
  }catch(err){
    console.log(err);
  }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-100">
      <div className='flex flex-col items-center justify-center bg-white  border border-forest-light py-4 rounded-lg'>
            <img src={naturenest} alt="logo" className="w-40 h-40 rounded-full mb-4"/>
            <p className='text-mountain-dark text-2xl font-thin'>Sign up to explore the world</p>
            <p className='text-mountain-dark text-sm font-thin mt-5'>Sign up with</p>
            <div
            class="flex flex-col space-x-0 space-y-6 md:flex-row md:space-x-4 md:space-y-0 mt-5"
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

          <div className="flex items-center justify-center mt-12">
  <div className="border-t border-mountain-dark w-32"></div>
  <span className="mx-4 text-gray-500">OR</span>
  <div className="border-t border-mountain-dark w-32"></div>
</div>     

 <form className=" flex flex-col gap-3 w-full max-w-md p-8 space-y-6" onSubmit={signUpSubmitHandler}>
        <Input
          element="input"
          id="name"
          type="text"
          placeholder="Enter your name"
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid name."
          onInput={inputHandler}
        />
        
        <Input
          element="input"
          id="email"
          type="email"
          placeholder="Enter your email"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="userName"
          type="text"
          placeholder="Enter your prefered username"
          label="Username"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter your prefered username"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          placeholder="Enter your password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid password (min. 6 characters)."
          onInput={inputHandler}
        />
        <button type="submit" className="bg-forest text-white p-2 rounded-md border border-forest-dark shadow-lg
                     hover:bg-forest-dark hover:shadow-xl hover:bg-opacity-90 transition hover:-translate-y-0.5 duration-150"
                     disabled={isLoading}>
          {isLoading? 'Signing Up': 'Sign Up'}
        </button>
      </form>
      {error && (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
    <span className="block sm:inline">{error}</span>
    <button 
      className="absolute top-0 right-0 px-4 py-3" 
      onClick={clearError}
    >
      <span className="text-red-500">&times;</span>
    </button>
  </div>
)}
    </div>
    <p className='text-mountain-dark text-sm font-medium mt-5'>Already have an account? <Link to="/login" className='text-forest-dark underline hover:text-sky-light'>Login</Link></p>
    </div>
  );
};

export default SignUp; 