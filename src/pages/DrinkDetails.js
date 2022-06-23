import React, { useContext } from 'react';
import Context from '../Context/Context';
// import { Link } from 'react-router-dom';
import '../App.css';

function Explore() {
  const { drinkDetail } = useContext(Context);
  console.log(drinkDetail);
  return (Object.entries(drinkDetail).length > 0 && (
    <div>
      <p>{drinkDetail.drinks[0].idDrink}</p>
      <p>Eu existo.</p>
    </div>
  )
  );
}

export default Explore;
