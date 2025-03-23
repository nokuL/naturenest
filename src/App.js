

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Users from './users/pages/Users';
import NewPlace from './places/components/NewPlace';
import MainNavigation from './shared/component/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/components/UpdatePlace';
import AuthPage from './shared/pages/AuthenticationPage';
import { AuthContext } from './shared/context/authContext';
import { use, useCallback, useState, useEffect } from 'react';
import { useHttpClient } from './shared/hooks/http-hooks';
import Home from './home/home';
import Footer from './shared/component/Navigation/Footer';
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  const login = useCallback((uid)=>{
    setIsLoggedIn(true);
    setUserId(uid);
  })

  const logout = useCallback(()=>{
    setIsLoggedIn(false);
    setUserId(null);
  });

  useEffect(()=>{

    const user = async()=>{
      await sendRequest('http://auth/login/success', 'GET', null, {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${window.location.search.split('=')[1]}`
      });
    }

  })

  let routes;
  if(isLoggedIn){
    routes =
    <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/:userId/places" exact component={UserPlaces}></Route>
    <Route path="/auth" exact component={Home} /> 
    <Route path="/places/newPlace" exact component={NewPlace} />
    <Route path="/places/:placeId" exact component={UpdatePlace}/>
    <Redirect to ="/"/>

 </Switch>

  }else{
    routes = (
      <Switch>
         <Route path="/" exact component={Home} />
         <Route path="/:userId/places" exact component={UserPlaces}></Route>
         <Route path="/auth" exact component={Home} /> 
         <Redirect to ="/auth"/>
      </Switch>
    )
  }
  return (
//<AuthContext.Provider value={{isLoggedIn : isLoggedIn, userId: userId, login: login, logout: logout}}>
    <Router>
    <MainNavigation />
    <main>
           {routes}
        
    </main>
    <Footer />
</Router>
//</AuthContext.Provider>
  );
}

export default App;