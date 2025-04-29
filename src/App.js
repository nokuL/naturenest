import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Users from './users/pages/Users';
import NewPlace from './places/components/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/components/UpdatePlace';
import { AuthContext } from './shared/context/authContext';
import Home from './home/home';
import Footer from './shared/component/Navigation/Footer';
import SignUp from './shared/pages/SignUp';
import { useAuth } from './shared/hooks/auth-hook';
import UserFeed from './shared/pages/userFeed/UserFeed';

function App() {
  const { token, login, logout, userId } = useAuth();
  
  let routes;
  
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/:userId/places" exact component={UserPlaces} />
        <Route path="/auth" exact component={Home} /> 
        <Route path="/places/newPlace" exact component={NewPlace} />
        <Route path="/places/:placeId" exact component={UpdatePlace} />
        <Route path="/places/:placeId" exact component={UpdatePlace} />
        <Route path="/userFeed/:userId" exact component={UserFeed} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/:userId/places" exact component={UserPlaces} />
        <Route path="/auth" exact component={Home} /> 
        <Route path="/signup" exact component={SignUp} />
        <Redirect to="/auth" />
      </Switch>
    );
  }
  
  return (
    <AuthContext.Provider 
      value={{ 
        isLoggedIn: !!token, 
        token: token, 
        userId: userId, 
        login: login, 
        logout: logout 
      }}
    >
      <Router>
        <main>
          {routes}
        </main>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;