import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import ContextProvider from './Context/ContextProvider';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import FoodDetails from './pages/FoodDetails';
import DrinkDetails from './pages/DrinkDetails';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoodsByIngredients from './pages/ExploreFoodsByIngredients';
import ExploreDrinksByIngredients from './pages/ExploreDrinksByIngredients';
import ExploreFoodsByNationality from './pages/ExploreFoodsByNationality';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import NotFound from './pages/NotFound';

function App() {
  return (
    // <ContextProvider>
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route path="/foods/:id" component={ FoodDetails } />
      <Route path="/drinks/:id" component={ DrinkDetails } />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExploreFoods } />
      <Route exact path="/explore/drinks" component={ ExploreDrinks } />
      <Route
        exact
        path="/explore/foods/ingredients"
        component={ ExploreFoodsByIngredients }
      />
      <Route
        exact
        path="/explore/drinks/ingredients"
        component={ ExploreDrinksByIngredients }
      />
      <Route
        exact
        path="/explore/foods/nationalities"
        component={ ExploreFoodsByNationality }
      />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route route="*" component={ NotFound } />
    </Switch>
    // </ContextProvider>
  );
}

export default App;
