import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function FavoriteCard({
  image,
  name,
  category,
  nationality,
  id,
  type,
  alcoholicOrNot,
  index,
}) {
  switch (type) {
  case 'food':
    return (
      <div id={ id }>
        <input
          type="image"
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />
        <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
        <p data-testid={ `${index}-horizontal-top-text` }>
          { `${nationality} - ${category}` }
        </p>
        <input
          data-testid={ `${index}-horizontal-favorite-btn` }
          type="image"
          src={ blackHeartIcon }
          alt="Botão de desfavoritar"
        />
        <input
          type="image"
          src={ shareIcon }
          alt="compartilhar"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </div>
    );
  default:
    return (
      <div id={ id }>
        <input
          type="image"
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />
        <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
        <p data-testid={ `${index}-horizontal-top-text` }>{alcoholicOrNot}</p>
        <input
          data-testid={ `${index}-horizontal-favorite-btn` }
          type="image"
          src={ blackHeartIcon }
          alt="Botão de desfavoritar"
        />
        <input
          type="image"
          src={ shareIcon }
          alt="compartilhar"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </div>
    );
  }
}

FavoriteCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  alcoholicOrNot: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default FavoriteCard;
