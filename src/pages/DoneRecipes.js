import React, { useEffect, useState } from 'react';
import '../App.css';
import Header from './components/Header';
import DoneRecipeCard from './components/DoneRecipeCard';
import ButtonFilterDoneRecipes from './components/ButtonFilterDoneRecipes';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([{
    id: '',
    type: '',
    nationality: '',
    category: '',
    alcoholicOrNot: '',
    name: '',
    image: '',
  }]);

  useEffect(() => {
    setDoneRecipes(JSON.parse(localStorage.getItem('FinishedRecipes')) || []);
  }, []);

  return (
    <div>
      <Header />
      <ButtonFilterDoneRecipes setDoneRecipes={ setDoneRecipes } />
      <button
        type="button"
        onClick={ console.log(doneRecipes) }
      >
        teste
      </button>
      {
        doneRecipes.map(({ image,
          name,
          category,
          nationality,
          id,
          type,
          alcoholicOrNot,
        }, index) => (
          <DoneRecipeCard
            key={ id }
            image={ image }
            category={ category }
            nationality={ nationality }
            id={ id }
            name={ name }
            alcoholicOrNot={ alcoholicOrNot }
            type={ type }
            index={ index }
          />))
      }
      <p>DoneRecipes Page</p>
    </div>
  );
}

export default DoneRecipes;
