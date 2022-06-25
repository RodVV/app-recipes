import { configureStore } from '@reduxjs/toolkit';
import login from './slices/login';
import search from './slices/search';
import buttonFilter from './slices/buttonFilter';
import foodSlice from './slices/sliceOfFood';
import foodDetail from './slices/foodDetailSlice';
import drinkDetail from './slices/drinkDetailSlice';

const store = configureStore({
  reducer: {
    login,
    search,
    buttonFilter,
    foodSlice,
    foodDetail,
    drinkDetail,
  },
});

export default store;
