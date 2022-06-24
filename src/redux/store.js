import { configureStore } from '@reduxjs/toolkit';
import login from './slices/login';

const store = configureStore({
  reducer: {
    login,
  },
});

export default store;
