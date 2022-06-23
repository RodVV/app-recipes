import React, { useContext } from 'react';
import Context from '../../Context/Context';

const ButtonFilter = ({ context }) => {
  const { listFood, listDrink, handleCategory } = useContext(Context);

  return (context === 'listFood' ? listFood : listDrink)
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
        {category.strCategory}
      </button>
    ));
};

export default ButtonFilter;
