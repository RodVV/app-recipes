import React, { useContext } from 'react';
import Context from '../../Context/Context';

const ButtonFilter = ({ context }) => {
  const { listFood, listDrink } = useContext(Context);

  return (context === 'listFood' ? listFood : listDrink)
    .map((category, index) => (
      <button
        type="button"
        key={ index }
        data-testid={ `${category.strCategory}-category-filter` }
      >
        {category.strCategory}
      </button>
    ));
};

export default ButtonFilter;
