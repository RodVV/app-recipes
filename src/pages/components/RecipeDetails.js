import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FoodDetails from './FoodDetails';
import DrinkDetails from './DrinkDetails';
import '../../App.css';
import RecipeCard from './RecipeCard';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function RecipeDetails({ context }) {
  const foodDetailsSlice = useSelector(({ foodDetail }) => foodDetail);
  const {
    foodDetail,
  } = foodDetailsSlice;

  const drinkDetailsSlice = useSelector(({ drinkDetail }) => drinkDetail);
  const {
    drinkDetail,
  } = drinkDetailsSlice;

  const [isFavorite, setIsFavorite] = useState(false);
  const [unfavorite, setUnfavorite] = useState(false);
  const [localStorageS, setLocalStorageS] = useState([{
    id: '',
    type: '',
    nationality: '',
    category: '',
    alcoholicOrNot: '',
    name: '',
    image: '',
  }]);

  useEffect(() => {
    setLocalStorageS(JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
  }, [isFavorite, unfavorite]);

  const renderFoodDetail = Object.entries(foodDetail).length > 0
    && (
      <FoodDetails
        localStorageS={ localStorageS }
        setIsFavorite={ setIsFavorite }
        setUnfavorite={ setUnfavorite }
      />);

  const renderDrinkDetail = Object.entries(drinkDetail).length > 0
    && (
      <DrinkDetails
        localStorageS={ localStorageS }
        setIsFavorite={ setIsFavorite }
        setUnfavorite={ setUnfavorite }
      />
    );

  if (context === 'listFoods') {
    return renderFoodDetail;
  }
  if (context === 'listDrinks') {
    return renderDrinkDetail;
  }
}

export default RecipeDetails;
