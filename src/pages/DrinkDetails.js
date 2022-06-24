import React, { useContext } from 'react';
import Context from '../Context/Context';
import RecipeDetails from './components/RecipeDetails';
import '../App.css';

function Explore() {
  const { drinkDetail } = useContext(Context);

  return (Object.entries(drinkDetail).length > 0 && (
    <div>
      <RecipeDetails context="listDrinks" />
    </div>
  )
  );
}

export default Explore;
