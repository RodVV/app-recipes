import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TWELVE, ApiFoods } from './helpers/index';
import Header from './components/Header';
import Footer from './components/Footer';
// import Context from '../Context/Context';
import RecipeCard from './components/RecipeCard';
import ButtonFilter from './components/ButtonFilters';
import { setInitialMeals } from '../redux/slices/sliceOfFood';
import '../App.css';

function Foods() {
  const dispatch = useDispatch();
  const foodSelector = useSelector(({ foodSlice }) => (foodSlice));
  const searchSelector = useSelector(({ search }) => (search));
  const { meals } = searchSelector.data;
  // const { data, recipesFood, cards, allCategories } = useContext(Context);
  const { initialMeals } = foodSelector;
  const buttonSelector = useSelector(({ buttonFilter }) => buttonFilter);
  const { cards, allCategory } = buttonSelector;

  useEffect(() => {
    const recipesFoods = async () => {
      const request = await fetch(ApiFoods);
      const response = await request.json();
      const allProducts = response.meals.filter((_food, index) => index < TWELVE);
      dispatch(setInitialMeals(allProducts));
      console.log(initialMeals);
    };
    recipesFoods();
  }, []);

  return (
    <div>
      <Header />
      <ButtonFilter context="listFood" />
      { ((!meals && cards.length === 0)
      || allCategory) && initialMeals.map((food, index) => (
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
