import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  
};

export const buttonFilterSlice = createSlice({
  name: 'buttonFilter',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setRadioFilter: (state, action) => {
      state.radioFilter = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {  } = buttonFilterSlice.actions;
export default buttonFilterSlice.reducer;
