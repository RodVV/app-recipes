import React, { useContext } from 'react';
import Context from '../../Context/Context';
import RecipeCard from './RecipeCard';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function RecipeDetails({ context }) {
  const {
    foodDetail,
    foodIngredients,
    foodIngredientsMeasurement,
    drinkRecommendation,
    drinkDetail,
    drinkIngredients,
    drinkIngredientsMeasurement,
    foodRecommendation,
  } = useContext(Context);
  const { meals } = foodDetail;
  const { drinks } = drinkDetail;

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
        />
        <input
          data-testid="favorite-btn"
          type="image"
          src={ whiteHeartIcon }
          alt="Botão de favoritar"
        />
        <h1 data-testid="recipe-title">{ meals[0].strMeal }</h1>
        <p data-testid="recipe-category">{ meals[0].strCategory }</p>
        <ul>
          { foodIngredients
            .filter((ingredient) => ingredient !== '' && ingredient !== null)
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
          src={ meals[0].strYoutube.replace('watch?v=', 'embed/') } // https://stackoverflow.com/questions/25661182/embed-youtube-video-refused-to-display-in-a-frame-because-it-set-x-frame-opti
          title="video"
          data-testid="video"
        />
        <p>Recomendações:</p>
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
        <button
          type="button"
          data-testid="start-recipe-btn"
        >
          Start Recipe
        </button>
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
        />
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
          { drinkIngredients.filter((ingred) => ingred !== '' && ingred !== null)
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
        <button
          type="button"
          data-testid="start-recipe-btn"
        >
          Start Recipe
        </button>
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
