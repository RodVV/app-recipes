import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
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
  const [alert, setAlert] = useState('');

  // const { pathname } = useLocation();
  // const shareLink = pathname.replace('/favorite-recipes', '');

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
