import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  initialMeals: [],
};

export const sliceOfFood = createSlice({
  name: 'foodSlice',
  initialState,
  reducers: {
    setInitialMeals: (state, action) => {
      state.initialMeals = action.payload;
    },
  },
});

export const { setInitialMeals, setCards, setCategory } = sliceOfFood.actions;
export default sliceOfFood.reducer;
