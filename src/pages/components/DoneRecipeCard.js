import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';

function DoneRecipeCard({
  image,
  name,
  category,
  nationality,
  id,
  type,
  alcoholicOrNot,
  index,
  date,
}) {
  const [alert, setAlert] = useState('');

  switch (type) {
  case 'food':
    return (
      <div id={ id }>
        <Link to={ `/${type}s/${id}` }>
          <input
            style={ { width: '50%' } }
            type="image"
            src={ image }
            alt={ name }
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>

        <Link to={ `/${type}s/${id}` }>
          <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
        </Link>

        <p
          data-testid={ `${index}-horizontal-done-date` }
        >
          Data:
          { date }
        </p>

        <p data-testid={ `${index}-horizontal-top-text` }>
          { `${nationality} - ${category}` }
        </p>

        <input
          type="image"
          src={ shareIcon }
          alt="Share icon"
          data-testid={ `${index}-horizontal-share-btn` }
          onClick={ () => {
            navigator.clipboard.writeText(`http://localhost:3000/foods/${id}`);
            setAlert('Link copied!');
          } }
        />

        <p>{alert}</p>
      </div>
    );
  default:
    return (
      <div id={ id }>
        <Link to={ `/${type}s/${id}` }>
          <input
            style={ { width: '50%' } }
            type="image"
            src={ image }
            alt={ name }
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>

        <Link to={ `/${type}s/${id}` }>
          <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
        </Link>

        <p
          data-testid={ `${index}-horizontal-done-date` }
        >
          Data:
          { '' }
          { date }
        </p>

        <p data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</p>

        <input
          type="image"
          src={ shareIcon }
          alt="Share icon"
          data-testid={ `${index}-horizontal-share-btn` }
          onClick={ () => {
            navigator.clipboard.writeText(`http://localhost:3000/drinks/${id}`);
            setAlert('Link copied!');
          } }
        />
        <p>{alert}</p>
      </div>
    );
  }
}
DoneRecipeCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
};

export default DoneRecipeCard;
