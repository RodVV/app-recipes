import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  initialMeals: [],
  initialDrinks: [],
};

export const sliceOfFood = createSlice({
  name: 'foodSlice',
  initialState,
  reducers: {
    setInitialMeals: (state, action) => {
      state.initialMeals = action.payload;
    },
    setInitialDrinks: (state, action) => {
      state.initialDrinks = action.payload;
    },
  },
});

export const { setInitialMeals, setInitialDrinks } = sliceOfFood.actions;
export default sliceOfFood.reducer;
