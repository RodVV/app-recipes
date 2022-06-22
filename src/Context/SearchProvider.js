import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from './Context';

let LINK_API = '';

export default function SearchProvider({ children }) {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [radioFilter, setRadioFilter] = useState('');

  const { pathname } = useLocation();
  const history = useHistory();

  const handleSearch = ({ target: { value } }) => {
    setSearch(value);
  };

  const handleRadio = ({ target: { id } }) => {
    setRadioFilter(id);
  };

  const redirectData = (fetchedData) => {
    console.log(fetchedData);

    if (fetchedData.meals === null || fetchedData.drinks === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (pathname === '/foods'
    && fetchedData.meals !== null
    && fetchedData.meals.length === 1) {
      history.push(`/foods/${fetchedData.meals[0].idMeal}`);
    }
    if (pathname === '/drinks'
    && fetchedData.drinks !== null
    && fetchedData.drinks.length === 1) {
      history.push(`/drinks/${fetchedData.drinks[0].idDrink}`);
    }
  };

  const searchButton = () => {
    if (radioFilter === 'letter' && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      setSearch('');
    } else {
      if (pathname === '/foods') {
        switch (radioFilter) {
        case 'ingredient': {
          LINK_API = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
          break;
        }
        case 'name': {
          LINK_API = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
          break;
        }
        case 'letter': {
          LINK_API = `https://www.themealdb.com/api/json/v1/1/search.php?f=${search.charAt(0)}`;
          break;
        }
        default:
          return;
        }
      } else {
        switch (radioFilter) {
        case 'ingredient': {
          LINK_API = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`;
          break;
        }
        case 'name': {
          LINK_API = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
          break;
        }
        case 'letter': {
          LINK_API = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search.charAt(0)}`;
          break;
        }
        default:
          return;
        }
      }

      const fetchApi = async () => {
        const response = await fetch(LINK_API);
        const fetchedData = await response.json();
        setData(fetchedData);
        redirectData(fetchedData);
      };
      fetchApi();
    }
  };

  const contextValue = {
    data,
    search,
    handleSearch,
    handleRadio,
    searchButton,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
