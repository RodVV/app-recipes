import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMeals } from '../redux/slices/recipeProgressSlice';
// import { useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FoodsInProgress() {
  // const dispatch = useDispatch();
  const recipeNotFinished = useSelector(({ foodDetail }) => foodDetail);
  const { foodIngredients, foodDetail } = recipeNotFinished;
  const { meals } = foodDetail;
  // const recipeProgressSlice = useSelector(({ recipeProgress }) => recipeProgress);

  // useEffect(() => {
  //   const inProgressMeals = localStorage.getItem('inProgressMeals') || { meals: [] };
  //   const inProgressMealsJson = JSON.parse(inProgressMeals);
  //   dispatch(setMeals(inProgressMealsJson.meals));
  // }, []);

  // {recipeNotFinished.foodDetail.meals
  //   && recipeNotFinished.foodDetail.meals.map((recipe) => (
  //       <>
  //         <p
  //           data-testid="recipe-title"
  //         >
  //           {recipe.strMeal}
  //         </p>
  //         <img
  //           src={ recipe.strMealThumb }
  //           alt="Recipe in progress"
  //           data-testid="recipe-photo"
  //         />
  //         <p
  //           data-testid="recipe-category"
  //         >
  //           {recipe.strCategory}
  //         </p>
  //         <img
  //           src={ shareIcon }
  //           alt="Share icon"
  //           data-testid="share-btn"
  //         />
  //         <img
  //           src={ whiteHeartIcon }
  //           alt="White heart icon"
  //           data-testid="favorite-btn"
  //           />
  //           {recipeNotFinished.foodIngredients.map((ingredient, index) => (
  //           <>
  //             <label
  //               htmlFor={ index }
  //               key={ index }
  //               data-testid={ `${index}-ingredient-step` }
  //               >
  //               {ingredient}
  //             </label>
  //             <input
  //             type="checkbox"
  //             id={ index }
  //             />
  //             </>
  //         ))}
  //         <p
  //           data-testid="instructions"
  //           >
  //           {'Instructions'}
  //           {' '}
  //           {recipe.strInstructions}
  //           `
  //         </p>
  //         <button
  //           type="button"
  //           data-testid="finish-recipe-btn"
  //           >
  //           Finish recipe
  //           </button>
  //       </>
  //     ))}
  return (
    meals && meals.map((recipe, index) => (
      <div key={ index }>
        <p
          data-testid="recipe-title"
        >
          {recipe.strMeal}
        </p>
        <p
          data-testid="recipe-category"
        >
          {recipe.strCategory}
        </p>
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
              <label htmlFor={ i }>{ingredient}</label>
              <input
                type="checkbox"
                id={ i }
              />
            </li>
          ))}
        </ul>

        <p data-testid="instructions">{recipe.strInstructions}</p>

        <button
          type="button"
          data-testid="finish-recipe-btn"
        >
          Finish recipe
        </button>
      </div>
    ))
  );
}

export default FoodsInProgress;
