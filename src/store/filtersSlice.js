import { createSlice } from '@reduxjs/toolkit';

const initialState = ['0', '1', '2', '3'];

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleTransfer(state, action) {
      const value = action.payload;

      if (value === 'all') {
        return state.length === 4 ? [] : ['0', '1', '2', '3'];
      }

      const isSelected = state.includes(value);
      const newState = isSelected
        ? state.filter((item) => item !== value)
        : [...state, value];

      if (newState.length === 4) return ['0', '1', '2', '3'];
      return newState;
    },
  },
});

export const { toggleTransfer } = filtersSlice.actions;
export default filtersSlice.reducer;
