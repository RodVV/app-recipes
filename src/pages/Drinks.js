import React, { useContext } from 'react';
import { ELEVEN } from './helpers';
import Header from './components/Header';
import Footer from './components/Footer';
import Context from '../Context/Context';
import RecipeCard from './components/RecipeCard';
import ButtonFilter from './components/ButtonFilters';
import '../App.css';

function Drinks() {
  const { data, recipesDrink } = useContext(Context);
  const { drinks } = data;

  return (
    <div>
      <Header />
      <ButtonFilter context="listDrink" />
      {recipesDrink
        .map((drink, index) => (
          <div key={ index }>
            <RecipeCard
              index={ index }
              food={ undefined }
              drink={ drink }
            />
          </div>
        ))}
      { drinks && drinks.filter((e, i) => i <= ELEVEN)
        .map((e, i) => (
          <div key={ i }>
            <RecipeCard index={ i } drink={ e } />
          </div>
        )) }
      <Footer />
    </div>
  );
}

export default Drinks;
