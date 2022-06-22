import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from './Context';

export default function ContextProvider({ children }) {
  // loginProvider
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleInput = ({ target: { name, value } }) => (
    name === 'email' ? setEmail(value) : setPassword(value)
  );

  const handleLogin = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  // searchProvider
  let API_URL = '';

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
          API_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
          setSearch('');
          break;
        }
        case 'name': {
          API_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
          setSearch('');
          break;
        }
        default:
          API_URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${search.charAt(0)}`;
          setSearch('');
        }
      } else {
        switch (radioFilter) {
        case 'ingredient': {
          API_URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`;
          setSearch('');
          break;
        }
        case 'name': {
          API_URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
          setSearch('');
          break;
        }
        default:
          API_URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search.charAt(0)}`;
          setSearch('');
        }
      }

      const fetchAPI = async () => {
        const response = await fetch(API_URL);
        const fetchedData = await response.json();
        setData(fetchedData);
        redirectData(fetchedData);
      };
      fetchAPI();
    }
  };

  const contextValue = {
    handleInput,
    handleLogin,
    handleSearch,
    handleRadio,
    searchButton,
    email,
    password,
    data,
    search,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
