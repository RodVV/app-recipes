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

const ApiDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const ApiListFood = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

const ApiListDrink = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

const handleFoods = (foodsID, foodIngredients) => {
  const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'))
  || { meals: {}, cocktails: {} };

  localStorage.setItem('inProgressRecipes',
    JSON.stringify(
      {
        ...recipesInProgress,
        meals: { ...recipesInProgress.meals, [foodsID]: foodIngredients },
      },
    ));
};

const handleDrinks = (drinksID, drinkIngredients) => {
  const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'))
  || { meals: {}, cocktails: {} };

  localStorage.setItem('inProgressRecipes',
    JSON.stringify(
      {
        ...recipesInProgress,
        cocktails: { ...recipesInProgress.cocktails, [drinksID]: drinkIngredients },
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
  handleFoods,
  handleDrinks,
};
