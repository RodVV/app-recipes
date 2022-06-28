import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  setDrinkDetail,
  setDrinkIngredients,
  setDrinkIngredientsMeasurement,
} from '../redux/slices/drinkDetailSlice';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import { NINE, TWENTY_NINE, FOURTY_NINE } from './helpers';

function FoodsInProgress() {
  const dispatch = useDispatch();
  const foodDetailSlice = useSelector(({ drinkDetail }) => drinkDetail);
  const { drinkDetail, drinkIngredients, drinkIngredientsMeasurement } = foodDetailSlice;
  const { drinks } = drinkDetail;
  console.log(drinks);

  const localStorageMeals = JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  );
  const { pathname } = useLocation();
  const drinksID = pathname.split('/')[2];

  const fetchFood = async () => {
    const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinksID}`);
    const response = await request.json();
    dispatch(setDrinkDetail(response));
    const drinkArray = response.drinks[0];
    const drinkArrayEntries = Object.entries(drinkArray)
      .filter((e) => e[0].includes('strIngredient') || e[0].includes('strMeasure'));
    const drinkArrayIngredients = [];
    const drinkArrayMeasurements = [];
    drinkArrayEntries.forEach((e) => {
      if (e[0].includes('strIngredient')) drinkArrayIngredients.push(e[1]);
      else drinkArrayMeasurements.push(e[1]);
    });
    const slicedDrinkArrayIngredients = drinkArrayIngredients
      .filter((ingred) => ingred !== '' && ingred !== null);
    dispatch(setDrinkIngredients(slicedDrinkArrayIngredients));
    dispatch(setDrinkIngredientsMeasurement(drinkArrayMeasurements));

    const newStorage = {
      cocktails: { [response.drinks[0].idDrink]: [] },
      meals: {},
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
  };

  useEffect(() => {
    if (localStorageMeals === null || drinks === undefined) {
      fetchFood();
    }
  }, []);

  return drinks
    ? drinks.map((recipe, index) => (
      <div key={ index }>
        <p data-testid="recipe-title">{recipe.strMeal}</p>
        <p data-testid="recipe-category">{recipe.strCategory}</p>
        <img
          src={ recipe.strDrinkThumb }
          alt="Recipe in progress"
          data-testid="recipe-photo"
        />
        <input
          type="image"
          src={ shareIcon }
          alt="Share icon"
          data-testid="share-btn"
        />
        <input
          type="image"
          src={ whiteHeartIcon }
          alt="White heart icon"
          data-testid="favorite-btn"
        />

        <ul>
          {drinkIngredients.map((ingredient, i) => (
            <li key={ i }>
              <label data-testid={ `${index}-ingredient-step` } htmlFor={ i }>
                {`${ingredient} - ${drinkIngredientsMeasurement[i]}`}
                <input onChange={ () => handleRadio(i) } type="checkbox" id={ i } />
              </label>
            </li>
          ))}
        </ul>

        <p data-testid="instructions">{recipe.strInstructions}</p>

        <Link to="/done-recipes">
          <button type="button" data-testid="finish-recipe-btn">
            Finish recipe
          </button>
        </Link>
      </div>
    ))
    : null;
}

export default FoodsInProgress;
