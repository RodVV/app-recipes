import React from 'react';
import propTypes from 'prop-types';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function AddToFavoriteButton({ handleFunction, testId }) {
  return (
    <input
      data-testid={ `${testId === '' ? 'favorite-btn' : testId} ` }
      type="image"
      src={ whiteHeartIcon }
      alt="Botão de favoritar"
      onClick={ handleFunction }
    />
  );
}

AddToFavoriteButton.propTypes = {
  handleFunction: propTypes.func.isRequired,
  testId: propTypes.string,
};
AddToFavoriteButton.defaultProps = {
  testId: '',
};

export default AddToFavoriteButton;
