import React, { useContext } from 'react';
import Context from '../Context/Context';
// import { Link } from 'react-router-dom';
import '../App.css';

function Explore() {
  const { foodDetail } = useContext(Context);
  return (Object.entries(foodDetail).length > 0 && (
    <div>
      <p>{foodDetail.meals[0].idMeal}</p>
      <p>Eu existo.</p>
    </div>
  )
  );
}

export default Explore;
