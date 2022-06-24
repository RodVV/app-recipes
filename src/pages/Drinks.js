import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FIVE, TWELVE, ApiListDrink } from './helpers';
import Header from './components/Header';
import Footer from './components/Footer';
import RecipeCard from './components/RecipeCard';
import ButtonFilter from './components/ButtonFilters';
import { setInitialDrinks } from '../redux/slices/sliceOfFood';
import '../App.css';

function Drinks() {
  const dispatch = useDispatch();
  const foodSelector = useSelector(({ foodSlice }) => (foodSlice));
  const searchSelector = useSelector(({ search }) => (search));
  const { drinks } = searchSelector.data;
  const { initialDrinks } = foodSelector;
  const buttonSelector = useSelector(({ buttonFilter }) => buttonFilter);
  const { cards, allCategory } = buttonSelector;

  useEffect(() => {
    const listFiltersDrink = async () => {
      const request = await fetch(ApiListDrink);
      const response = await request.json();
      const filterDrink = response.drinks.filter((_drinkCategory, index) => index < FIVE);
      dispatch(setInitialDrinks(filterDrink));
    };
    listFiltersDrink();
  }, []);

  // useEffect(() => {
  //   const recipesFoods = async () => {
  //     const request = await fetch(ApiFoods);
  //     const response = await request.json();
  //     const allProducts = response.meals.filter((_food, index) => index < TWELVE);
  //     dispatch(setInitialMeals(allProducts));
  //     console.log(initialMeals);
  //   };
  //   recipesFoods();
  // }, []);

  return (
    <div>
      <Header />
      <ButtonFilter context="listDrink" />
      { ((!drinks && cards.length === 0) || allCategory)
      && initialDrinks.map((drink, index) => (
        <div key={ index }>
          <RecipeCard index={ index } drink={ drink } />
        </div>
      )) }
      { (drinks && cards.length === 0 && !allCategory)
      && drinks.filter((_drink, index) => index < TWELVE)
        .map((filteredDrink, filteredIndex) => (
          <div key={ filteredIndex }>
            <RecipeCard index={ filteredIndex } drink={ filteredDrink } />
          </div>
        )) }
      { (cards.length > 0 && !allCategory) && cards.map((drinksCategory, index) => (
        <div key={ index }>
          <RecipeCard index={ index } drink={ drinksCategory } />
        </div>
      )) }
      <Footer />
    </div>
  );
}

export default Drinks;
