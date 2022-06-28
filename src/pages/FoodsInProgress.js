import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { setMeals } from '../redux/slices/recipeProgressSlice';
import { useLocation } from 'react-router-dom';
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
  console.log(meals);

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
                <input type="checkbox" id={ i } />
              </label>
            </li>
          ))}
        </ul>

        <p data-testid="instructions">{recipe.strInstructions}</p>

        <button type="button" data-testid="finish-recipe-btn">
          Finish recipe
        </button>
      </div>
    ))
    : null;
}

export default FoodsInProgress;

// const { pathname } = useLocation();
// const foodsID = pathname.replace('/foods/', '');
// const drinksID = pathname.replace('/drinks/', '');
// const [inProgress, setInProgress] = useState(false); // setar comida em progresso (estado para renderizar a página)
// const [alert, setAlert] = useState(''); // setar link da página no clipboard (estado para renderizar o link copied)

// const recipesInProgress = (JSON.parse(localStorage.getItem('inProgressRecipes')))
// || { meals: {}, cocktails: {} };

// const handleFunction = () => { // função de start recipe
//   if (pathname.includes('/foods/')) {
//     localStorage.setItem('inProgressRecipes',
//       JSON.stringify(
//         {
//           cocktails: { ...recipesInProgress.cocktails },
//           meals: { ...recipesInProgress.meals, [foodsID]: [] },
//         },
//       ));
//     setInProgress(!inProgress);
//   } else if (pathname.includes('/drinks/')) {
//     localStorage.setItem('inProgressRecipes',
//       JSON.stringify(
//         {
//           cocktails: { ...recipesInProgress.cocktails, [drinksID]: [] },
//           meals: { ...recipesInProgress.meals },
//         },
//       ));
//     setInProgress(!inProgress);
//   }
// };
