import React, { useContext } from 'react';
import { ELEVEN } from './helpers/index';
import Header from './components/Header';
import Footer from './components/Footer';
import Context from '../Context/Context';
import RecipeCard from './components/RecipeCard';
import '../App.css';

function Foods() {
  const { data } = useContext(Context);
  const { meals } = data;

  return (
    <div>
      <Header />
      { meals !== null && meals !== undefined && meals.filter((e, i) => i <= ELEVEN)
        .map((e, i) => (
          <div key={ i }>
            <RecipeCard index={ i } food={ e } />
          </div>
        )) }
      <Footer />
    </div>
  );
}

export default Foods;
