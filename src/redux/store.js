import { configureStore } from '@reduxjs/toolkit';
import login from './slices/login';
import search from './slices/search';
import buttonFilter from './slices/buttonFilter';

const store = configureStore({
  reducer: {
    login,
    search,
    buttonFilter,
  },
});

export default store;
