import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from './Components/Login';
import Register from './Components/Register';
import Main from './Components/Main';
import UserPage from './Components/UserPage';
import QueryRecipes from './Components/QueryRecipes';
import CreateRecipe from './Components/CreateRecipe';
import SubscribedRecipes from './Components/SubscribedRecipes';
import ChangePassword from './Components/ChangePassword';

function App()
{
  return(
      <Router>
        <Switch>
          <Route exact path= "/" component={Login}/>
          <Route exact path= "/login" component={Login}/>
          <Route exact path= "/register" component={Register}/>
          <Route exact path= "/main" component={Main}/>
          <Route exact path= "/user-page" component={UserPage}/>
          <Route exact path= "/list-query" component={QueryRecipes}/>
          <Route exact path= "/create" component={CreateRecipe}/>
          <Route exact path= "/subscribed-recipes" component={SubscribedRecipes}/>
          <Route exact path= "/change-password" component={ChangePassword}/>
        </Switch>
      </Router>
  );
}

export default App;
