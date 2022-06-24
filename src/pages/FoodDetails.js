import React, { useContext } from 'react';
import Context from '../Context/Context';
import RecipeDetails from './components/RecipeDetails';
import '../App.css';

function Explore() {
  const { foodDetail } = useContext(Context);

  return (Object.entries(foodDetail).length > 0 && (
    <div>
      <RecipeDetails context="listFoods" />
    </div>
  )
  );
}

export default Explore;
