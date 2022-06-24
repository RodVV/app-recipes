import { configureStore } from '@reduxjs/toolkit';
import login from './slices/login';
import search from './slices/search';
import buttonFilter from './slices/buttonFilter';
import foodSlice from './slices/sliceOfFood';

const store = configureStore({
  reducer: {
    login,
    search,
    buttonFilter,
    foodSlice,
  },
});

export default store;
