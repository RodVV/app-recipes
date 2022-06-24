import React, { useContext } from 'react';
import { TWELVE } from './helpers/index';
import Header from './components/Header';
import Footer from './components/Footer';
import Context from '../Context/Context';
import RecipeCard from './components/RecipeCard';
import ButtonFilter from './components/ButtonFilters';
import '../App.css';

function Foods() {
  // const { data, recipesFood, cards, allCategories } = useContext(Context);
  const dataSearch = useSelector(({ search }) => (search.data));
  const { meals } = dataSearch;

  return (
    <div>
      <Header />
      <ButtonFilter context="listFood" />
      { ((!meals && cards.length === 0)
      || allCategories) && recipesFood.map((food, index) => (
        <div key={ index }>
          <RecipeCard index={ index } food={ food } />
        </div>
      )) }
      { (meals && cards.length === 0
      && !allCategories) && meals.filter((_food, index) => index <= TWELVE)
        .map((filteredFood, filteredIndex) => (
          <div key={ filteredIndex }>
            <RecipeCard index={ filteredIndex } food={ filteredFood } />
          </div>
        )) }
      { (cards.length > 0 && !allCategories) && cards.map((foodCategory, index) => (
        <div key={ index }>
          <RecipeCard index={ index } food={ foodCategory } />
        </div>
      )) }
      <Footer />
    </div>
  );
}

export default Foods;
