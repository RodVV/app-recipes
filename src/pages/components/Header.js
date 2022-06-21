import React from 'react';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header() {
  return (
    <div
      style={ { display: 'flex',
        width: '100vh',
        justifyContent: 'space-between',
        alignItems: 'center',
      } }
    >
      <input
        data-testid="profile-top-btn"
        type="image"
        src={ profileIcon }
        alt="Profile icon"
      />
      <p
        data-testid="page-title"
      >
        Foods
      </p>
      <input
        data-testid="search-top-btn"
        type="image"
        src={ searchIcon }
        alt="Search icon"
      />
    </div>
  );
}

export default Header;
