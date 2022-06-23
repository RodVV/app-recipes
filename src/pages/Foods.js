import React, { useContext } from 'react';
import { ELEVEN } from './helpers/index';
import Header from './components/Header';
import Footer from './components/Footer';
import Context from '../Context/Context';
import RecipeCard from './components/RecipeCard';
import ButtonFilter from './components/ButtonFilters';
import '../App.css';

function Foods() {
  const { data, recipesFood, cards, allCategories } = useContext(Context);
  const { meals } = data;

  return (
    <div>
      <Header />
      <ButtonFilter context="listFood" />
      { ((!meals && cards.length === 0)
      || allCategories) && recipesFood.map((food, index) => (
        <div key={ index }>
          <RecipeCard
            index={ index }
            food={ food }
          />
        </div>
      )) }
      { (meals && cards.length === 0
      && !allCategories) && meals.filter((e, i) => i <= ELEVEN)
        .map((e, i) => (
          <div key={ i }>
            <RecipeCard index={ i } food={ e } />
          </div>
        )) }
      { (cards.length > 0 && !allCategories) && cards.map((foodCategory, index) => (
        <div key={ index }>
          <RecipeCard
            index={ index }
            food={ foodCategory }
          />
        </div>
      )) }
      <Footer />
    </div>
  );
}

export default Foods;
