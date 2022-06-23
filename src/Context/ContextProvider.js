import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from './Context';

export default function ContextProvider({ children }) {
  // loginProvider
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recipesFood, setRecipesFood] = useState([]);
  const [recipesDrink, setRecipesDrink] = useState([]);
  const [listFood, setListFood] = useState([]);
  const [listDrink, setListDrink] = useState([]);
  const [cards, setCards] = useState([]);
  const [category, setCategory] = useState('');
  const [allCategories, setAllCategories] = useState(false);
  const [foodDetail, setFoodDetail] = useState([]);
  const [drinkDetail, setDrinkDetail] = useState([]);

  const ApiFoods = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const ApiDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const ApiListFood = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const ApiListDrink = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

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

  useEffect(() => {
    const recipesFoods = async () => {
      const maxLimitRecipes = 12;
      const request = await fetch(ApiFoods);
      const response = await request.json();
      const allProducts = response.meals
        .filter((food, index) => index < maxLimitRecipes && food);
      setRecipesFood(allProducts);
    };
    recipesFoods();
  }, []);

  useEffect(() => {
    const recipesDrinks = async () => {
      const maxLimitRecipes = 12;
      const request = await fetch(ApiDrink);
      const response = await request.json();
      const allProducts = response.drinks
        .filter((drink, index) => index < maxLimitRecipes && drink);
      setRecipesDrink(allProducts);
    };
    recipesDrinks();
  }, []);

  useEffect(() => {
    const listFiltersFood = async () => {
      const maxLimitFilter = 5;
      const request = await fetch(ApiListFood);
      const response = await request.json();
      const filterByFoods = response.meals
        .filter((foodCategory, index) => index < maxLimitFilter && foodCategory);
      setListFood(filterByFoods);
    };
    listFiltersFood();
  }, []);

  useEffect(() => {
    const listFiltersDrink = async () => {
      const maxLimitFilter = 5;
      const request = await fetch(ApiListDrink);
      const response = await request.json();
      const filterByDrinks = response.drinks
        .filter((drinkCategory, index) => index < maxLimitFilter && drinkCategory);
      setListDrink(filterByDrinks);
    };
    listFiltersDrink();
  }, []);

  const handleCategory = async (categoryValue) => {
    const foodArray = ['Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];

    let allProducts = [];
    if (cards.length > 0 && category === categoryValue) {
      setCards([]);
    } else {
      const maxLimitRecipes = 12;
      if (foodArray.includes(categoryValue)) {
        const request = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryValue}`,
        );
        const responseFood = await request.json();
        allProducts = responseFood.meals
          .filter((food, index) => index < maxLimitRecipes && food);
      } else {
        const request = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryValue}`,
        );
        const responseDrink = await request.json();
        allProducts = responseDrink.drinks
          .filter((drink, index) => index < maxLimitRecipes && drink);
      }
      setCategory(categoryValue);
      setCards(allProducts);
    }
  };

  const handleAllCategories = () => {
    setAllCategories(!allCategories);
  };

  useEffect(() => {
    let recipeID = '';
    const foodDetails = async () => {
      if (pathname.includes('/foods')) {
        recipeID = pathname.replace('/foods/', '');
        const request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID}`);
        const response = await request.json();
        setFoodDetail(response);
      } else if (pathname.includes('/drinks')) {
        recipeID = pathname.replace('/drinks/', '');
        const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeID}`);
        const response = await request.json();
        setDrinkDetail(response);
      }
    };
    foodDetails();
  }, [pathname]);

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
    recipesFood,
    recipesDrink,
    listFood,
    listDrink,
    cards,
    handleCategory,
    allCategories,
    handleAllCategories,
    foodDetail,
    drinkDetail,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
