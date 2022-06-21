import React from 'react';

function Search() {
  return (
    <div>
      Ingrediente:
      <input
        type="radio"
        data-testid="ingredient-search-radio"
        name="ingredient"
        onChange={ handleRadio }
      />
      Nome:
      <input
        type="radio"
        data-testid="name-search-radio"
        name="name"
        onChange={ handleRadio }

      />
      Primeira letra:
      <input
        type="radio"
        data-testid="first-letter-search-radio"
        name="first-letter"
        onChange={ handleRadio }
      />
      <button
        type="button"
        data-testid="exec-search-btn"
        name="search-btn"
      >
        Search
      </button>
    </div>

  );
}

export default Search;
