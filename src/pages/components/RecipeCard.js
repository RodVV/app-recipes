import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard({ index, food, drink }) {
  if (food !== undefined) {
    const { strMealThumb, strMeal } = food;
    return (
      <div data-testid={ `${index}-recipe-card` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ strMealThumb }
          alt="comida bonita"
        />
        <p data-testid={ `${index}-card-name` }>{strMeal}</p>
      </div>
    );
  }
  if (drink !== undefined) {
    const { strDrinkThumb, strDrink } = drink;
    return (
      <div data-testid={ `${index}-recipe-card` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ strDrinkThumb }
          alt="comida bonita"
        />
        <p data-testid={ `${index}-card-name` }>{strDrink}</p>
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
