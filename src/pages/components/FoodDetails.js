import React, { useState } from 'react';
import propTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { handleFoods } from '../helpers';
import RecipeCard from './RecipeCard';
import shareIcon from '../../images/shareIcon.svg';
import AddToFavoriteButton from './AddToFavoriteButton';
import RemoveFromFavoriteButton from './RemoveFromFavoriteButton';
import '../../App.css';

function FoodDetails({ localStorageS, setIsFavorite, setUnfavorite }) {
  const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'))
  || { meals: {}, cocktails: {} };

  const foodDetailsSlice = useSelector(({ foodDetail }) => foodDetail);
  const {
    foodDetail,
    foodIngredients,
    foodIngredientsMeasurement,
    drinkRecommendation,
  } = foodDetailsSlice;

  const { meals } = foodDetail;

  const { pathname } = useLocation();
  const foodsID = pathname.replace('/foods/', '');
  const [teste, setTeste] = useState(false); // setar comida em progresso (estado para renderizar a página)
  const [alert, setAlert] = useState(''); // setar link da página no clipboard (estado para renderizar o link copied)

  const addFavoriteFood = () => {
    const favoriteRecipe = {
      id: meals[0].idMeal,
      type: 'food',
      nationality: meals[0].strArea,
      category: meals[0].strCategory,
      alcoholicOrNot: '',
      name: meals[0].strMeal,
      image: meals[0].strMealThumb,
    };

    setIsFavorite(true);

    if (Object.values(localStorageS)
      .filter((e) => e.id === meals[0].idMeal).length === 0) {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...localStorageS, favoriteRecipe]));
    }
  };

  const deleteFavoriteFood = () => {
    setUnfavorite(true);

    const filteredFavoriteRecipes = localStorageS
      .filter((e) => e.id !== meals[0].idMeal);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredFavoriteRecipes));

    if (filteredFavoriteRecipes.length === 0) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  };

  return (
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
      {localStorageS && Object.values(localStorageS)
        .filter((e) => e.id === meals[0].idMeal).length > 0
        ? <RemoveFromFavoriteButton handleFunction={ deleteFavoriteFood } />
        : <AddToFavoriteButton handleFunction={ addFavoriteFood } /> }
      <p>{ alert }</p>
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
          && Object.keys(recipesInProgress.meals).includes(foodsID))
        ? (
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
              onClick={ () => {
                handleFoods(foodsID, foodIngredients);
                setTeste(!teste);
              } }
            >
              Start Recipe
            </button>
          </Link>
        ) }
    </div>
  );
}

FoodDetails.propTypes = {
  localStorageS: propTypes.arrayOf(propTypes.any).isRequired,
  setIsFavorite: propTypes.func.isRequired,
  setUnfavorite: propTypes.func.isRequired,
};

export default FoodDetails;
