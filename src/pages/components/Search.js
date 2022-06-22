import React from 'react';

function Search() {
  return (
    <div>
      <label htmlFor="search-input">
        Search Recipe
        <input
          type="text"
          data-testid="search-input"
          id="search-input"
          name="search"
          placeholder="Search"
          // value={ search }
          // onChange={ handleSearch }
        />
      </label>
      <label htmlFor="ingredient-radio">
        Ingrediente:
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="ingredient"
          id="ingredient-radio"
          // onChange={ handleRadio }
        />
      </label>
      <label htmlFor="name-radio">
        Nome:
        <input
          type="radio"
          data-testid="name-search-radio"
          name="name"
          id="name-radio"
          // onChange={ handleRadio }
        />
      </label>
      <label htmlFor="letter-radio">
        Primeira letra:
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="first-letter"
          id="letter-radio"
          // onChange={ handleRadio }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        name="search-btn"
        id="search-btn"
      >
        Search
      </button>
    </div>

  );
}

export default Search;
