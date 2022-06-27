import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import '../../App.css';
import RecipeCard from './RecipeCard';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'))
  || { meals: {}, cocktails: {} };

function RecipeDetails({ context }) {
  const foodDetailsSlice = useSelector(({ foodDetail }) => foodDetail);
  const {
    foodDetail,
    foodIngredients,
    foodIngredientsMeasurement,
    drinkRecommendation,
  } = foodDetailsSlice;

  const drinkDetailsSlice = useSelector(({ drinkDetail }) => drinkDetail);
  const {
    drinkDetail,
    drinkIngredients,
    drinkIngredientsMeasurement,
    foodRecommendation,
  } = drinkDetailsSlice;

  const { meals } = foodDetail;
  const { drinks } = drinkDetail;

  const { pathname } = useLocation();
  const foodsID = pathname.replace('/foods/', '');
  const drinksID = pathname.replace('/drinks/', '');
  const [teste, setTeste] = useState(false); // setar comida em progresso (estado para renderizar a página)
  const [alert, setAlert] = useState(''); // setar link da página no clipboard (estado para renderizar o link copied)

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

  const renderFoodDetail = Object.entries(foodDetail).length > 0
    && (
      <div>
        <img
          src={ meals[0].strMealThumb }
          alt="Foto da comida"
          data-testid="recipe-photo"
        />
        <input
          data-testid="share-btn"
          type="image"
          src={ shareIcon }
          alt="Botão de compartilhar"
          onClick={ () => {
            navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
            setAlert('Link copied!');
          } }
        />
        <input
          data-testid="favorite-btn"
          type="image"
          src={ whiteHeartIcon }
          alt="Botão de favoritar"
        />
        <p>{alert}</p>
        <h1 data-testid="recipe-title">{ meals[0].strMeal }</h1>
        <p data-testid="recipe-category">{ meals[0].strCategory }</p>
        <ul>
          { foodIngredients
            .map((ingredientFiltered, index) => (
              <li
                key={ `${ingredientFiltered}-${index}` }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { `${ingredientFiltered} - ${foodIngredientsMeasurement[index]}` }
              </li>
            )) }
        </ul>
        <p data-testid="instructions">{ meals[0].strInstructions }</p>
        <iframe
          src={ meals[0].strYoutube.replace('watch?v=', 'embed/') } // https://stackoverflow.com/questions/25661182/embed-youtube-video-refused-to-display-in-a-frame-because-it-fx-frame-opti
          title="video"
          data-testid="video"
        />
        <p>Recomendações:</p>
        <div className="recommendation">
          { drinkRecommendation.map((drink, index) => (
            <div key={ index } data-testid={ `${index}-recomendation-card` }>
              <RecipeCard
                index={ index }
                drink={ drink }
                datatestid={ `${index}-recomendation-title` }
                detail
              />
            </div>
          )) }
        </div>
        { teste || (recipesInProgress.meals
          && Object.keys(recipesInProgress.meals).includes(foodsID)) ? (
            <Link to={ `/foods/${foodsID}/in-progress` }>
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="start-recipe-button"
              >
                Continue Recipe
              </button>
            </Link>
          )
          : (
            <Link to={ `/foods/${foodsID}/in-progress` }>
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="start-recipe-button"
                onClick={ handleFunction }
              >
                Start Recipe
              </button>
            </Link>
          ) }
      </div>
    );

  const renderDrinkDetail = Object.entries(drinkDetail).length > 0
    && (
      <div>
        <img
          src={ drinks[0].strDrinkThumb }
          alt="Foto da bebida"
          data-testid="recipe-photo"
        />
        <input
          data-testid="share-btn"
          type="image"
          src={ shareIcon }
          alt="Botão de compartilhar"
          onClick={ () => {
            navigator.clipboard.writeText(`http://localhost:3000${pathname}`);
            setAlert('Link copied!');
          } }
        />
        {alert}
        <input
          data-testid="favorite-btn"
          type="image"
          src={ whiteHeartIcon }
          alt="Botão de favoritar"
        />
        <h1 data-testid="recipe-title">{ drinks[0].strDrink }</h1>
        <p data-testid="recipe-category">{ drinks[0].strCategory }</p>
        <p data-testid="recipe-category">{ drinks[0].strAlcoholic }</p>
        <ul>
          { drinkIngredients
            .map((filteredIngred, index) => (
              <li
                key={ `${filteredIngred}-${index}` }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { drinkIngredientsMeasurement[index] !== null
                  ? `${filteredIngred} - ${drinkIngredientsMeasurement[index]}`
                  : `${filteredIngred}` }
              </li>
            )) }
        </ul>
        <p data-testid="instructions">{ drinks[0].strInstructions }</p>
        <p>Recomendações:</p>
        <div className="recommendation">
          { foodRecommendation.map((food, index) => (
            <div key={ index } data-testid={ `${index}-recomendation-card` }>
              <RecipeCard
                index={ index }
                food={ food }
                datatestid={ `${index}-recomendation-title` }
                detail
              />
            </div>
          )) }
        </div>
        { teste || (recipesInProgress.cocktails
          && Object.keys(recipesInProgress.cocktails).includes(drinksID)) ? (
            <Link to={ `/drinks/${drinksID}/in-progress` }>
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="start-recipe-button"
              >
                Continue Recipe
              </button>
            </Link>
          )
          : (
            <Link to={ `/drinks/${drinksID}/in-progress` }>
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="start-recipe-button"
                onClick={ handleFunction }
              >
                Start Recipe
              </button>
            </Link>
          ) }
      </div>
    );

  if (context === 'listFoods') {
    return renderFoodDetail;
  }
  if (context === 'listDrinks') {
    return renderDrinkDetail;
  }
}

export default RecipeDetails;
