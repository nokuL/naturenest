import React, {useEffect, useState} from "react";

import '../components/UsersList.js'
import UsersList from "../components/UsersList.js";
import ErrorModal from "../components/UIElements/ErrorModal.js";
import LoadingSpinner from "../components/UIElements/LoadingSpinner.js";
import { useHttpClient } from "../../shared/hooks/http-hooks.js";
  
  const Users = () => {
   const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedUsers, setLoadesUsers] = useState(false);

  useEffect(()=>{
    const  fetchUsers = async()=>{
      try{
        const responseData = await sendRequest('http://localhost:5003/api/users');
        setLoadesUsers(responseData.users);

      }catch(err){

      }
      fetchUsers();
    }
  }, [sendRequest])

 
    return<React.Fragment>
      <ErrorModal errror={error} onClear={clearError}/>
      {isLoading&&<div className="center">
        <LoadingSpinner></LoadingSpinner></div>}
      {!isLoading&& loadedUsers&&<UsersList items={loadedUsers} />};

    </React.Fragment> 
  };
export default Users;