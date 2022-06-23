import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipeCard({ index, food, drink }) {
  if (food !== undefined) {
    const { strMealThumb, strMeal, idMeal } = food;
    console.log(food);
    return (
      <Link to={ `/foods/${idMeal}` }>
        <div data-testid={ `${index}-recipe-card` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ strMealThumb }
            alt="comida bonita"
          />
          <p data-testid={ `${index}-card-name` }>{ strMeal }</p>
        </div>
      </Link>

    );
  }
  if (drink !== undefined) {
    const { strDrinkThumb, strDrink, idDrink } = drink;
    return (
      <Link to={ `/drinks/${idDrink}` }>
        <div data-testid={ `${index}-recipe-card` }>
          <img
            data-testid={ `${index}-card-img` }
            src={ strDrinkThumb }
            alt="comida bonita"
          />
          <p data-testid={ `${index}-card-name` }>{ strDrink }</p>
        </div>
      </Link>
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
