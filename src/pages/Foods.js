import React, { useContext } from 'react';
import { ELEVEN } from './helpers/index';
import Header from './components/Header';
import Footer from './components/Footer';
import Context from '../Context/Context';
import RecipeCard from './components/RecipeCard';
import ButtonFilter from './components/ButtonFilters';
import '../App.css';

function Foods() {
  const { data, recipesFood } = useContext(Context);
  const { meals } = data;

  return (
    <div>
      <Header />
      <ButtonFilter context="listFood" />
      {!meals && recipesFood.map((food, index) => (
        <div key={ index }>
          <RecipeCard
            index={ index }
            food={ food }
            drink={ null }
          />
        </div>
      ))}
      { meals && meals.filter((e, i) => i <= ELEVEN)
        .map((e, i) => (
          <div key={ i }>
            <RecipeCard index={ i } food={ e } />
          </div>
        )) }
      <Footer />
    </div>
  );
}

export default Foods;
