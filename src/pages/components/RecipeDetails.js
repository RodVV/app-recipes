import React, { useContext } from 'react';
import Context from '../../Context/Context';
// import { Link } from 'react-router-dom';

function Explore() {
  const { foodDetail, foodIngredients, foodIngredientsMeasurement } = useContext(Context);
  const { meals } = foodDetail;
  console.log(meals);
  // V imagem -> strMealThumb
  // V titulo -> strMeal
  // V categoria (alcoólico) -> strCategory
  // V lista de ingredientes
  // V instruções -> strInstructions
  // V vídeo (somente comida) -> strYoutube
  // recomendações

  return (Object.entries(foodDetail).length > 0 && (
    <div>
      <img
        src={ meals[0].strMealThumb }
        alt="Foto da comida"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{ meals[0].strMeal }</h1>
      <p data-testid="recipe-category">{ meals[0].strCategory }</p>
      <ul>
        { foodIngredients.filter((ingredient) => ingredient !== '')
          .map((ingredientFiltered, index) => (
            <li
              key={ `${ingredientFiltered}-${index}` }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { `${ingredientFiltered} - ${foodIngredientsMeasurement[index]}` }
            </li>
          )) }
      </ul>
      <p data-testid="instructions">{ meals[0].strInstructions }</p>
      <iframe
        src={ meals[0].strYoutube.replace('watch?v=', 'embed/') } // https://stackoverflow.com/questions/25661182/embed-youtube-video-refused-to-display-in-a-frame-because-it-set-x-frame-opti
        title="video"
        data-testid="video"
      />
    </div>
  )
  );
}

export default Explore;
