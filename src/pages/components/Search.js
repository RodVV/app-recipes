import React, { useContext } from 'react';
import Context from '../../Context/Context';

function Search() {
  const { search, handleSearch, handleRadio, searchButton } = useContext(Context);

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
          value={ search }
          onChange={ handleSearch }
        />
      </label>
      <label htmlFor="ingredient">
        Ingrediente:
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="radio-filter"
          id="ingredient"
          onChange={ handleRadio }
        />
      </label>
      <label htmlFor="name">
        Nome:
        <input
          type="radio"
          data-testid="name-search-radio"
          name="radio-filter"
          id="name"
          onChange={ handleRadio }
        />
      </label>
      <label htmlFor="letter">
        Primeira letra:
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="radio-filter"
          id="letter"
          onChange={ handleRadio }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        name="search-btn"
        id="search-btn"
        onClick={ searchButton }
      >
        Search
      </button>
    </div>

  );
}

export default Search;
