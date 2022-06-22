import React, { useContext } from 'react';
import Footer from './components/Footer';
import '../App.css';
import Header from './components/Header';
import Context from '../Context/Context';
import RecipeCard from './components/RecipeCard';

function Foods() {
  const { data } = useContext(Context);

  return (
    <div>
      <Header />

      {
        data.meals !== null && data.meals !== undefined && data.meals.map((e, i) => (
          <div key={ i }>
            <RecipeCard index={ i } food={ e } />
          </div>
        ))
      }

      <Footer />
    </div>
  );
}

export default Foods;
