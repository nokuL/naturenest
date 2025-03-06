

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Users from './users/pages/Users';
import NewPlace from './places/components/NewPlace';
import MainNavigation from './shared/component/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/components/UpdatePlace';
import AuthPage from './shared/pages/AuthenticationPage';
import { AuthContext } from './shared/context/authContext';
import { use, useCallback, useState } from 'react';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const login = useCallback((uid)=>{
    setIsLoggedIn(true);
    setUserId(uid);
  })

  const logout = useCallback(()=>{
    setIsLoggedIn(false);
    setUserId(null);
  });

  let routes;
  if(isLoggedIn){
    routes =
    <Switch>
    <Route path="/" exact component={Users} />
    <Route path="/:userId/places" exact component={UserPlaces}></Route>
    <Route path="/auth" exact component={AuthPage} /> 
    <Route path="/places/newPlace" exact component={NewPlace} />
    <Route path="/places/:placeId" exact component={UpdatePlace}/>
    <Redirect to ="/"/>

 </Switch>

  }else{
    routes = (
      <Switch>
         <Route path="/" exact component={Users} />
         <Route path="/:userId/places" exact component={UserPlaces}></Route>
         <Route path="/auth" exact component={AuthPage} /> 
         <Redirect to ="/auth"/>
      </Switch>
    )
  }
  return (
    <AuthContext.Provider value={{isLoggedIn : isLoggedIn, uid: uid, login: login, logout: logout}}>
    <Router>
    <MainNavigation />
    <main>
           {routes}
        
    </main>
</Router>
</AuthContext.Provider>
  );
}

export default App;