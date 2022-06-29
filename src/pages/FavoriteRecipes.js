import React from 'react';
import Header from './components/Header';
import '../App.css';
import FavoriteCard from './components/FavoritesCard';
import ButtonFilterFavoriteRecipes from './components/ButtonFilterFavoriteRecipes';

function FavoriteRecipes() {
  const storageItems = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  return (
    <div>
      <Header />
      <ButtonFilterFavoriteRecipes />
      {
        storageItems.map(({ image,
          name,
          category,
          nationality,
          id,
          type,
          alcoholicOrNot,
        }, index) => (
          <FavoriteCard
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
    </div>
  );
}

export default FavoriteRecipes;
