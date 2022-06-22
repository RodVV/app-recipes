import React, { useContext } from 'react';
import Footer from './components/Footer';
import '../App.css';
import Header from './components/Header';
import Context from '../Context/Context';
import RecipeCard from './components/RecipeCard';
import { ELEVEN } from './helpers';

function Drinks() {
  const { data } = useContext(Context);
  const { drinks } = data;

  return (
    <div>
      <Header />
      {drinks !== null
        && drinks !== undefined
        && drinks
          .filter((e, i) => i <= ELEVEN)
          .map((e, i) => (
            <div key={ i }>
              <RecipeCard index={ i } drink={ e } />
            </div>
          ))}
      <Footer />
    </div>
  );
}

export default Drinks;
