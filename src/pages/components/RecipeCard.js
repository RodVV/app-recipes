import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipeCard({ index, food, drink }) {
  if (food !== undefined) {
    const { strMealThumb, strMeal, idMeal } = food;
    return (
      <div data-testid={ `${index}-recipe-card` }>
        <Link to={ `/foods/${idMeal}` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ strMealThumb }
            alt="comida bonita"
          />
          <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
        </Link>
      </div>
    );
  }
  if (drink !== undefined) {
    const { strDrinkThumb, strDrink, idDrink } = drink;
    return (
      <div data-testid={ `${index}-recipe-card` }>
        <Link to={ `/drinks/${idDrink}` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ strDrinkThumb }
            alt="comida bonita"
          />
          <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
        </Link>
      </div>
    );
  }
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  food: PropTypes.objectOf(PropTypes.any),
  drink: PropTypes.objectOf(PropTypes.any),
};

RecipeCard.defaultProps = {
  food: undefined,
  drink: undefined,
};

export default RecipeCard;
