import React, { useContext } from 'react';
import { ELEVEN } from './helpers';
import Header from './components/Header';
import Footer from './components/Footer';
import Context from '../Context/Context';
import RecipeCard from './components/RecipeCard';
import ButtonFilter from './components/ButtonFilters';
import '../App.css';

function Drinks() {
  const { data, recipesDrink, cards } = useContext(Context);
  const { drinks } = data;

  return (
    <div>
      <Header />
      <ButtonFilter context="listDrink" />
      { (!drinks && cards.length === 0) && recipesDrink.map((drink, index) => (
        <div key={ index }>
          <RecipeCard
            index={ index }
            drink={ drink }
          />
        </div>
      )) }
      { (drinks && cards.length === 0) && drinks.filter((e, i) => i <= ELEVEN)
        .map((e, i) => (
          <div key={ i }>
            <RecipeCard index={ i } drink={ e } />
          </div>
        )) }
      { cards.length > 0 && cards.map((drinksCategory, index) => (
        <div key={ index }>
          <RecipeCard
            index={ index }
            drink={ drinksCategory }
          />
        </div>
      )) }
      <Footer />
    </div>
  );
}

export default Drinks;
