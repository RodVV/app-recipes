import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  setFoodDetail,
  setFoodIngredients,
  setFoodIngredientsMeasurement,
} from '../redux/slices/foodDetailSlice';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { NINE, TWENTY_NINE, FOURTY_NINE } from './helpers';

function FoodsInProgress() {
  const dispatch = useDispatch();
  const foodDetailSlice = useSelector(({ foodDetail }) => foodDetail);
  const { foodDetail, foodIngredients, foodIngredientsMeasurement } = foodDetailSlice;
  const { meals } = foodDetail;

  const localStorageMeals = JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  );
  const { pathname } = useLocation();
  const foodsID = pathname.split('/')[2];

  const fetchFood = async () => {
    const request = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodsID}`,
    );
    const response = await request.json();
    dispatch(setFoodDetail(response));
    const foodArray = response.meals[0];
    const foodValues = Object.values(foodArray);
    const slicedFoodIngredients = foodValues
      .slice(NINE, TWENTY_NINE)
      .filter((ingredient) => ingredient !== '' && ingredient !== null);
    const slicedFoodMeasurements = foodValues.slice(TWENTY_NINE, FOURTY_NINE);
    dispatch(setFoodIngredients(slicedFoodIngredients));
    dispatch(setFoodIngredientsMeasurement(slicedFoodMeasurements));

    const newStorage = {
      cocktails: {},
      meals: { [response.meals[0].idMeal]: [] },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
  };

  useEffect(() => {
    if (localStorageMeals === null || meals === undefined) {
      fetchFood();
      console.log(foodIngredients);
    }
  }, []);

  return meals
    ? meals.map((recipe, index) => (
      <div key={ index }>
        <p data-testid="recipe-title">{recipe.strMeal}</p>
        <p data-testid="recipe-category">{recipe.strCategory}</p>
        <img
          src={ recipe.strMealThumb }
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
          {foodIngredients.map((ingredient, i) => (
            <li key={ i }>
              <label data-testid={ `${index}-ingredient-step` } htmlFor={ i }>
                {`${ingredient} - ${foodIngredientsMeasurement[i]}`}
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
