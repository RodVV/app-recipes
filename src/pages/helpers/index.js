const SIX = 6;

const verifyEmail = /\S+@\S+\.\S+/;

const { email } = JSON.parse(localStorage.getItem('user')) || {};

const FIVE = 5;

const NINE = 9;

const TWELVE = 12;

const THIRTEEN = 13;

const FOURTEEN = 14;

const TWENTY_NINE = 29;

const FOURTY_NINE = 49;

const ApiFoods = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const ApiFoodIngredients = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

const ApiDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const ApiDrinkIngredients = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

const ApiListFood = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

const ApiListDrink = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

const handleFoods = (foodsID) => {
  const recipesInProgress = (JSON.parse(localStorage.getItem('inProgressRecipes')))
  || { cocktails: {}, meals: {} };

  localStorage.setItem('inProgressRecipes',
    JSON.stringify(
      {
        cocktails: { ...recipesInProgress.cocktails },
        meals: { ...recipesInProgress.meals, [foodsID]: [] },
      },
    ));
};

const handleDrinks = (drinksID) => {
  const recipesInProgress = (JSON.parse(localStorage.getItem('inProgressRecipes')))
  || { cocktails: {}, meals: {} };

  localStorage.setItem('inProgressRecipes',
    JSON.stringify(
      {
        cocktails: { ...recipesInProgress.cocktails, [drinksID]: [] },
        meals: { ...recipesInProgress.meals },
      },
    ));
};

export {
  verifyEmail,
  email,
  FIVE,
  SIX,
  NINE,
  TWELVE,
  THIRTEEN,
  FOURTEEN,
  TWENTY_NINE,
  FOURTY_NINE,
  ApiFoods,
  ApiDrink,
  ApiListFood,
  ApiListDrink,
  ApiFoodIngredients,
  ApiDrinkIngredients,
  handleFoods,
  handleDrinks,
};
