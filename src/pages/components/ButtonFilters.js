import React, { useContext } from 'react';
import propTypes from 'prop-types';
import Context from '../../Context/Context';

const ButtonFilter = ({ context }) => {
  const {
    listFood, listDrink, handleCategory, handleAllCategories,
  } = useContext(Context);

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
