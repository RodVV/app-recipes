import React, { useContext } from 'react';
import { TWELVE } from './helpers';
import Header from './components/Header';
import Footer from './components/Footer';
import Context from '../Context/Context';
import RecipeCard from './components/RecipeCard';
import ButtonFilter from './components/ButtonFilters';
import '../App.css';

function Drinks() {
  const { data, recipesDrink, cards, allCategories } = useContext(Context);
  const { drinks } = data;

  return (
    <div>
      <Header />
      <ButtonFilter context="listDrink" />
      { ((!drinks && cards.length === 0) || allCategories)
      && recipesDrink.map((drink, index) => (
        <div key={ index }>
          <RecipeCard index={ index } drink={ drink } />
        </div>
      )) }
      { (drinks && cards.length === 0 && !allCategories)
      && drinks.filter((_drink, index) => index < TWELVE)
        .map((filteredDrink, filteredIndex) => (
          <div key={ filteredIndex }>
            <RecipeCard index={ filteredIndex } drink={ filteredDrink } />
          </div>
        )) }
      { (cards.length > 0 && !allCategories) && cards.map((drinksCategory, index) => (
        <div key={ index }>
          <RecipeCard index={ index } drink={ drinksCategory } />
        </div>
      )) }
      <Footer />
    </div>
  );
}

export default Drinks;
