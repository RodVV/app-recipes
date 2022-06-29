import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import '../App.css';
import shareIcon from '../images/shareIcon.svg';
import FavoriteBtn from './components/FavoriteBtn';
import { fetchDrink } from './helpers';

function FoodsInProgress() {
  const dispatch = useDispatch();
  const foodDetailSlice = useSelector(({ drinkDetail }) => drinkDetail);
  const { drinkDetail, drinkIngredients, drinkIngredientsMeasurement } = foodDetailSlice;
  const { drinks } = drinkDetail;

  const [check, setCheck] = useState([]);

  const localStorageMeals = JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  );
  const { pathname } = useLocation();
  const drinksID = pathname.split('/')[2];

  useEffect(() => {
    if (localStorageMeals === null || drinks === undefined) {
      fetchDrink(dispatch, drinksID);
    }
  }, []);

  const handleRadio = (i) => {
    if (check.some((e) => e === i)) {
      const a = check.filter((e) => e !== i);
      setCheck(a);
    } else {
      setCheck([...check, i]);
    }
  };

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
        <FavoriteBtn drinks={ drinks } isMeal={ false } />

        <ul>
          {drinkIngredients.map((ingredient, i) => (
            <li key={ i }>
              <label
                className={ check.some((e) => e === i) ? 'checked' : '' }
                data-testid={ `${index}-ingredient-step` }
                htmlFor={ i }
              >
                {`${ingredient} - ${drinkIngredientsMeasurement[i]}`}
                <input
                  onChange={ () => handleRadio(i) }
                  type="checkbox"
                  id={ i }
                />
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
