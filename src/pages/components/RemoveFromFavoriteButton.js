import React from 'react';
import propTypes from 'prop-types';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function RemoveFromFavoriteButton({ handleFunction, testId }) {
  return (
    <input
      data-testid={ `${testId === '' ? 'favorite-btn' : testId} ` }
      type="image"
      src={ blackHeartIcon }
      alt="Botão de desfavoritar"
      onClick={ handleFunction }
    />
  );
}

RemoveFromFavoriteButton.propTypes = {
  handleFunction: propTypes.func.isRequired,
  testId: propTypes.string,
};
RemoveFromFavoriteButton.defaultProps = {
  testId: '',
};

export default RemoveFromFavoriteButton;
