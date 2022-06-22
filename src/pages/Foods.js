import React, { useContext } from 'react';
import Footer from './components/Footer';
import '../App.css';
import Header from './components/Header';
import Context from '../Context/Context';
import RecipeCard from './components/RecipeCard';

function Foods() {
  const { data } = useContext(Context);
  const { meals } = data;

  return (
    <div>
      <Header />

      {
        meals !== null && meals !== undefined && meals.map((e, i) => (
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
