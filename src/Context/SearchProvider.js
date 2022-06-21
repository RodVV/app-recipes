import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function SearchProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=garlic');
      const fetchedData = await response.json();
      setData(fetchedData);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const contextValue = {
    data,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
