import React from 'react';
import { Link } from 'react-router-dom';
import { email } from './helpers';
import Footer from './components/Footer';
import '../App.css';

function Profile() {
  return (
    <div>
      <p>Profile Page</p>
      <p data-testid="profile-email">{ email }</p>
      <Link to="/done-recipes">
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
      </Link>
      <Link to="/favorite-recipes">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
      </Link>
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => localStorage.clear() }
        >
          Logout
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default Profile;
