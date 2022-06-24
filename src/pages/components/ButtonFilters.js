import React, { useContext } from 'react';
import propTypes from 'prop-types';
import Context from '../../Context/Context';

const ButtonFilter = ({ context }) => {
  const {
    listFood, listDrink, handleCategory, handleAllCategories,
  } = useContext(Context);

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
  };

  return (
    <div>
      { (context === 'listFood' ? listFood : listDrink)
        .map((category, index) => (
          <button
            type="button"
            name={ category.strCategory }
            key={ index }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ ({ target: { name } }) => {
              handleCategory(name);
            } }
          >
            { category.strCategory }
          </button>
        )) }
      <button
        type="button"
        name="All"
        data-testid="All-category-filter"
        onClick={ handleAllCategories }
      >
        All
      </button>
    </div>
  );
};

ButtonFilter.propTypes = {
  context: propTypes.string.isRequired,
};

export default ButtonFilter;
