import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FoodsInProgress() {
  const recipeNotFinished = useSelector(({ foodDetail }) => foodDetail);
  // const foodIngredientsAndMeasurement = [...recipeNotFinished.foodIngredients,
  //   ...recipeNotFinished.foodIngredientsMeasurement];
  const {
    foodIngredients,
  } = recipeNotFinished;

  const { pathname } = useLocation();
  const foodsID = pathname.replace('/foods/', '');
  const drinksID = pathname.replace('/drinks/', '');
  const [teste, setTeste] = useState(false); // setar comida em progresso (estado para renderizar a página)

  const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'))
  || { meals: {}, cocktails: {} };

  useEffect(() => {
    const handleFunction = () => { // função de start recipe
      if (pathname.includes('/foods/')) {
        localStorage.setItem('inProgressRecipes',
          JSON.stringify(
            {
              ...recipesInProgress,
              meals: { ...recipesInProgress.meals, [foodsID]: foodIngredients },
            },
          ));
        setTeste(!teste);
      } else if (pathname.includes('/drinks/')) {
        localStorage.setItem('inProgressRecipes',
          JSON.stringify(
            {
              ...recipesInProgress,
              cocktails: { ...recipesInProgress.cocktails, [drinksID]: drinkIngredients },
            },
          ));
        setTeste(!teste);
      }
    };
    handleFunction();
  }, []);

  return (
    <div>
      {recipeNotFinished.foodDetail.meals
      && recipeNotFinished.foodDetail.meals.map((recipe) => (
        <>
          <p
            data-testid="recipe-title"
          >
            {recipe.strMeal}
          </p>
          <img
            src={ recipe.strMealThumb }
            alt="Recipe in progress"
            data-testid="recipe-photo"
          />
          <p
            data-testid="recipe-category"
          >
            {recipe.strCategory}
          </p>
          <img
            src={ shareIcon }
            alt="Share icon"
            data-testid="share-btn"
          />
          <img
            src={ whiteHeartIcon }
            alt="White heart icon"
            data-testid="favorite-btn"
          />
          {recipeNotFinished.foodIngredients.map((ingredient, index) => (
            <>
              <label
                htmlFor={ index }
                key={ index }
                data-testid={ `${index}-ingredient-step` }
              >
                {ingredient}
              </label>
              <input
                type="checkbox"
                id={ index }
              />
            </>
          ))}
          <p
            data-testid="instructions"
          >
            {'Instructions'}
            {' '}
            {recipe.strInstructions}
            `
          </p>
          <button
            type="button"
            data-testid="finish-recipe-btn"
          >
            Finish recipe
          </button>
        </>
      ))}
    </div>
  );
}

export default FoodsInProgress;
