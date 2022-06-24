import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  FIVE, SIX, NINE, TWELVE, THIRTEEN, FOURTEEN, TWENTY_NINE, FOURTY_NINE,
  ApiFoods, ApiDrink, ApiListFood, ApiListDrink,
} from '../pages/helpers';
import Context from './Context';

export default function ContextProvider({ children }) {
  const [recipesFood, setRecipesFood] = useState([]);
  const [recipesDrink, setRecipesDrink] = useState([]);
  const [listFood, setListFood] = useState([]);
  const [listDrink, setListDrink] = useState([]);
  const [cards, setCards] = useState([]);
  const [category, setCategory] = useState('');
  const [allCategories, setAllCategories] = useState(false);
  const [foodDetail, setFoodDetail] = useState([]);
  const [drinkDetail, setDrinkDetail] = useState([]);
  const [foodIngredients, setFoodIngredients] = useState([]);
  const [foodIngredientsMeasurement, setFoodIngredientsMeasurement] = useState([]);
  const [drinkRecommendation, setDrinkRecommendation] = useState([]);
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const [drinkIngredientsMeasurement, setDrinkIngredientsMeasurement] = useState([]);
  const [foodRecommendation, setFoodRecommendation] = useState([]);

  useEffect(() => {
    const recipesFoods = async () => {
      const request = await fetch(ApiFoods);
      const response = await request.json();
      const allProducts = response.meals.filter((_food, index) => index < TWELVE);
      setRecipesFood(allProducts);
    };
    recipesFoods();
  }, []); // break line
  useEffect(() => {
    const recipesDrinks = async () => {
      const request = await fetch(ApiDrink);
      const response = await request.json();
      const allProducts = response.drinks.filter((_drink, index) => index < TWELVE);
      setRecipesDrink(allProducts);
    };
    recipesDrinks();
  }, []); // break line
  useEffect(() => {
    const listFiltersFood = async () => {
      const request = await fetch(ApiListFood);
      const response = await request.json();
      const filterFood = response.meals.filter((_foodCategory, index) => index < FIVE);
      setListFood(filterFood);
    };
    listFiltersFood();
  }, []); // break line
  useEffect(() => {
    const listFiltersDrink = async () => {
      const request = await fetch(ApiListDrink);
      const response = await request.json();
      const filterDrink = response.drinks.filter((_drinkCategory, index) => index < FIVE);
      setListDrink(filterDrink);
    };
    listFiltersDrink();
  }, []);

  // break line

  const handleCategory = async (categoryValue) => {
    const foodArray = ['Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];
    let allProducts = [];
    if (cards.length > 0 && category === categoryValue) {
      setCards([]);
    } else {
      if (foodArray.includes(categoryValue)) {
        const request = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryValue}`,
        );
        const responseFood = await request.json();
        allProducts = responseFood.meals.filter((_food, index) => index < TWELVE);
      } else {
        const request = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryValue}`,
        );
        const responseDrink = await request.json();
        allProducts = responseDrink.drinks.filter((_drink, index) => index < TWELVE);
      }
      setCategory(categoryValue);
      setCards(allProducts);
    }
  }; // break line
  const handleAllCategories = () => {
    setAllCategories(!allCategories);
  }; // break line
  useEffect(() => {
    let recipeID = '';
    const foodDetails = async () => {
      if (pathname.includes('/foods') && pathname.length === TWELVE) {
        recipeID = pathname.replace('/foods/', '');
        const request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID}`);
        const response = await request.json();
        setFoodDetail(response);
        const foodArray = response.meals[0];
        const foodValues = Object.values(foodArray);
        const slicedFoodIngredients = foodValues.slice(NINE, TWENTY_NINE);
        const slicedFoodMeasurements = foodValues.slice(TWENTY_NINE, FOURTY_NINE);
        setFoodIngredients(slicedFoodIngredients);
        setFoodIngredientsMeasurement(slicedFoodMeasurements);
        const requestRecommendation = await fetch(ApiDrink);
        const responseRecommendation = await requestRecommendation.json();
        const allRecommendation = responseRecommendation.drinks.filter(
          (_drink, index) => index < SIX,
        );
        setDrinkRecommendation(allRecommendation);
      } else if (pathname.includes('/drinks')
      && (pathname.length === THIRTEEN || pathname.length === FOURTEEN)) {
        recipeID = pathname.replace('/drinks/', '');
        const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeID}`);
        const response = await request.json();
        setDrinkDetail(response);
        const drinkArray = response.drinks[0];
        const drinkArrayEntries = Object.entries(drinkArray)
          .filter((e) => e[0].includes('strIngredient') || e[0].includes('strMeasure'));
        const drinkArrayIngredients = [];
        const drinkArrayMeasurements = [];
        drinkArrayEntries.forEach((e) => {
          if (e[0].includes('strIngredient')) drinkArrayIngredients.push(e[1]);
          else drinkArrayMeasurements.push(e[1]);
        });
        setDrinkIngredients(drinkArrayIngredients);
        setDrinkIngredientsMeasurement(drinkArrayMeasurements);
        const requestRecommendation = await fetch(ApiFoods);
        const responseRecommendation = await requestRecommendation.json();
        const allRecommendation = responseRecommendation.meals.filter(
          (_food, index) => index < SIX,
        );
        setFoodRecommendation(allRecommendation);
      }
    };
    foodDetails();
  }, [pathname]); // break line
  const contextValue = {
    handleSearch,
    handleRadio,
    searchButton,
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
    foodIngredients,
    foodIngredientsMeasurement,
    drinkRecommendation,
    drinkIngredients,
    drinkIngredientsMeasurement,
    foodRecommendation }; // break line
  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
