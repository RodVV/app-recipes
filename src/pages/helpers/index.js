const SIX = 6;

const verifyEmail = /\S+@\S+\.\S+/;

const { email } = JSON.parse(localStorage.getItem('user')) || {};

const FIVE = 5;

const NINE = 9;

const ELEVEN = 11;

const TWELVE = 12;

const TWENTY_NINE = 29;

const FOURTY_NINE = 49;

const ApiFoods = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const ApiDrink = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const ApiListFood = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

const ApiListDrink = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

export {
  verifyEmail,
  email,
  FIVE,
  SIX,
  NINE,
  ELEVEN,
  TWELVE,
  TWENTY_NINE,
  FOURTY_NINE,
  ApiFoods,
  ApiDrink,
  ApiListFood,
  ApiListDrink };
