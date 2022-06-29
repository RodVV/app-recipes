import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import shareIcon from '../../images/shareIcon.svg';
import { fetchFood } from '../helpers';
import FavoriteBtn from './FavoriteBtn';

function InProgressFoodCard({ handleRadio, check }) {
  const dispatch = useDispatch();
  const foodDetailSlice = useSelector(({ foodDetail }) => foodDetail);
  const { foodDetail, foodIngredients, foodIngredientsMeasurement } = foodDetailSlice;
  const { meals } = foodDetail;

  const [alert, setAlert] = useState(''); // setar link da página no clipboard (estado para renderizar o link copied)

  const localStorageMeals = JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  );
  const { pathname } = useLocation();
  const foodsID = pathname.split('/')[2];

  useEffect(() => {
    if (localStorageMeals === null || meals === undefined) {
      fetchFood(dispatch, foodsID);
    }
  }, []);

  return (
    meals ? (meals.map((recipe, index) => (
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
          onClick={ () => {
            navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
            setAlert('Link copied!');
          } }
        />

        <FavoriteBtn meals={ meals } isMeal />

        <p>{ alert }</p>

        <ul>
          {foodIngredients.map((ingredient, i) => (
            <li key={ i }>
              <label
                className={ check.some((e) => e === i) ? 'checked' : '' }
                data-testid={ `${index}-ingredient-step` }
                htmlFor={ i }
              >
                {`${ingredient} - ${foodIngredientsMeasurement[i]}`}
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
    ))) : null
  );
}

export default InProgressFoodCard;
